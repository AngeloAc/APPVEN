<template>
        <SettingsComponent />
        <div class="main-content">
                <div class="container p-4">
                        <h6>Administrador</h6>
                        <p>Atualize todas as informações da sua conta</p>

                        <!-- Informações do usuário logado -->
                        <div class="user-info">
                                <div class="avatar-container">
                                        <img class="avatar" src="../../../assets/img/avatar.png" alt="" srcset="">
                                </div>
                                <form action="" @submit.prevent="onSubmitForm">
                                        <div class="user-details">
                                                <div class="user-info-row">
                                                        <span class="user-info-label" style="font-weight: bold;">Endereço de
                                                                e-mail</span>
                                                        <input class="user-info-input" :value="user.email" disabled>
                                                </div>
                                                <div class="user-info-row">
                                                        <span class="user-info-label" style="font-weight: bold;">Seu nome
                                                                completo</span>
                                                        <input class="user-info-input" v-model="user.name">
                                                </div>
                                                <div class="user-info-row">
                                                        <label class="user-info-label" for="password"
                                                                style="font-weight: bold;">Senha</label>
                                                        <div class="password-input">
                                                                <input id="password" class="user-info-input"
                                                                        :type="showPassword ? 'text' : 'password'"
                                                                        v-model="newPassword" placeholder="Nova senha">
                                                                <button class="password-toggle-btn"
                                                                        @click="togglePasswordVisibility">
                                                                        <i
                                                                                :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                                                </button>
                                                        </div>
                                                </div>
                                                <div class="user-info-row">
                                                        <span class="user-info-label"
                                                                style="font-weight: bold;">Telefone/Whatsapp</span>
                                                        <input type="tel" class="user-info-input" v-model="user.telefone"
                                                                placeholder="Numero de telefone">
                                                </div>
                                                <div class="user-info-row">
                                                        <span class="user-info-label" style="font-weight: bold;">País</span>
                                                        <input class="user-info-input" v-model="user.country">
                                                </div>
                                                <div class="user-info-row">
                                                        <span class="user-info-label" style="font-weight: bold;">Idioma</span>
                                                        
                                                        <select id="languageSelect" class="user-info-input" v-model="user.language">
                                                        <option :value="user.language" >{{ user.language }}</option>
                                   
                                    
                                    </select>
                                                </div>


                                        </div>
                                        <button class="btn edit-profile-btn" @click="editProfile"><i class="bi bi-pencil"></i>
                                                Editar o seu perfil</button>
                                </form>





                        </div>

                        <div class="billing-section">
                                <h6 class="section-title">Facturação</h6>
                                <div class="billing-info">
                                        <div class="billing-card">
                                                <div class="billing-card-header">
                                                        <h5>Master Card</h5>
                                                </div>
                                                <div class="billing-card-body">
                                                        <p class="billing-text">Plano Atual: {{ user.plano }}</p>
                                                        <p class="billing-text">Validade: 15 de Abril de 2023
                                                        </p>
                                                        <p class="billing-text">Método de Pagamento: Cartão de Crédito **** ****
                                                                **** 1234</p>
                                                </div>
                                        </div>

                                </div>
                                <button class="btn change-plan-btn" @click="alterarPlano">Alterar Plano</button>
                                <button class="btn update-payment-btn" @click="updatePlano">Atualizar Pagamento</button>
                        </div>

                        <button class="btn delete-account-btn" @click="deletarConta"> <i class="bi bi-trash"></i> Deletar sua
                                conta</button>
                </div>
        </div>
</template>

<script>
import SettingsComponent from '../../../components/settngs/SettingsComponent.vue';
import getInfo from '../../../services/getInfo';
import vuejwtDecoded from 'vue-jwt-decode';
import swal from 'sweetalert';

export default {
        data() {
                return {
                        user: {},
                        newPassword: null,
                        showPassword: false,

                }
        },
        methods: {
                onSubmitForm() { },
                // Retorna o meu token...
                userData() {
                        const mytoken = localStorage.getItem('jwt');
                        const tokenDecoded = vuejwtDecoded.decode(mytoken);
                        return tokenDecoded;
                },

                getUser() {

                        this.user = this.userData();
                },
                async editProfile() {
                        let userData = {}
                        const mytoken = localStorage.getItem('jwt');

                        if (this.newPassword) {
                                userData = {
                                        id: this.user._id,
                                        name: this.user.name,
                                        password: this.newPassword,
                                        telefone: this.user.telefone,
                                        country: this.user.country,
                                        language: this.user.language
                                }
                        } else {

                                userData = {
                                        id: this.user._id,
                                        name: this.user.name,
                                        telefone: this.user.telefone,
                                        country: this.user.country,
                                        language: this.user.language
                                }
                        }

                        const res = await getInfo.actualizar_usuario(mytoken, userData);
                        if (res) {
                                if (this.newPassword) {
                                        this.$router.push('/');
                                }
                        }

                },
                configAPI() {
                        console.log('CONFIG API...')
                },
                alterarPlano() {
                        console.log('alterar plano...')
                },
                updatePlano() {
                        console.log('actualizar o plano...')
                },
                async deletarConta() {
                        console.log('deletar conta...')
                        try {
                                const token = localStorage.getItem('jwt');
                                const response = await getInfo.deleteConta(token, this.userData());
                                this.$router.push('/');
                                if (response) {
                                        swal({
                                                title: 'Ohhh!!',
                                                text: 'Vamos sentir a sua falta',
                                                icon: 'success'
                                        });
                                }
                        } catch (error) {

                        }
                },

                togglePasswordVisibility() {
                        this.showPassword = !this.showPassword;
                },
                // Restante dos seus métodos...

        },
        components: {
                SettingsComponent,
        },
        created() {
                this.getUser();
        },
}
</script>

<style scoped>
.main-content {
        margin-top: 10px;
        padding: 20px;
        margin-left: 70px;
        margin-right: 20px;
        margin-bottom: 10px;  
        
}

.user-info {
        display: block;
        margin-left: auto;
        background-color: var(--background-color-primary);
        color: var(--text-primary-color);
        padding: 20px;
        border-radius: 5px;
        border: .1px solid greenyellow;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
        margin-bottom: 30px;
        border: 1px solid greenyellow;
}

.user-info-text {
        font-size: 13px;
        margin-top: 5px;
        color: var(--text-primary-color);
}

.edit-profile-btn,
.billing-btn,
.delete-account-btn {
        font-size: 12px;
        padding: 10px 20px;
        margin-left: 0;
        border: 1px solid var(--accent-secondary-color);
        border-radius: none;
        background-color: transparent;
        color: var(--text-primary-color);
        transition: background-color 0.3s, color 0.3s;
}

.edit-profile-btn:hover,
.billing-btn:hover,
.delete-account-btn:hover {
        background-color: #343a40;
        color: white;
}

.billing-btn {

        border: none;
}

.delete-account-btn {
        background-color: rgb(242, 123, 123);
        color: white;
        border: none;
        margin-left: 10px;
        margin-top: 20px;
}

.billing-section {
        margin-top: 20px;
        padding: 20px;
        background-color: var(--background-color-primary);
        border: .1px solid greenyellow;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.section-title {
        font-size: 18px;
        margin-bottom: 10px;
}

.billing-info {
        margin-bottom: 20px;
        display: flex;
        justify-content: start;
}

.billing-card {
        border: 1px solid #ccc;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        max-width: 550px;
        width: 100%;
}

.billing-card-header {
        background-color: #63e5af;
        color: black;
        padding: 15px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
}

.billing-card-header h5 {
        margin: 0;
        font-size: 1.25rem;
}

.billing-card-body {
        padding: 20px;
}

.billing-text {
        font-size: 14px;
        margin-bottom: 5px;
}

.change-plan-btn,
.update-payment-btn {
        font-size: 12px;
        padding: 8px 15px;
        margin-right: 10px;
        background-color: #63e5af;
        color: black;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: background-color 0.3s;
}

.change-plan-btn:hover,
.update-payment-btn:hover {
        background-color: #0056b3;
        color: white;
}

.section-title {
        font-size: 24px;
        color: #343a40;
        margin-bottom: 10px;
}

.section-subtitle {
        font-size: 14px;
        color: #6c757d;
        margin-bottom: 20px;
}

.divider {
        border: none;
        border-top: 1px solid #dee2e6;
        margin: 20px 0;
}

.avatar-container {
        display: flex;
        align-items: center;
}

.user-details {
        margin-top: 20px;
        color: var(--text-primary-color);
}

.user-info-row {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
}

.user-info-label {
        font-size: 14px;
        color: var(--text-primary-color);
        min-width: 150px;
}

.user-info-input {
        font-size: 14px;
        padding: 8px;
        border: 1px solid green;
        border-radius: 3px;
        width: 300px;
        background: var(--background-color-primary);
        color: var(--text-primary-color);
}

.buttons {
        margin-top: 20px;
}

.password-input {
        display: flex;
        align-items: center;
        position: relative;
}

.password-toggle-btn {
        border: none;
        background: transparent;
        cursor: pointer;
        position: absolute;
        right: 10px;
        color: var(--text-primary-color);
}

.password-toggle-btn i {
        font-size: 18px;
}
</style>
