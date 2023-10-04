<template>
    <div class="recovery-container">

        <div class="recovery-form">
            <div class="logo">
                <img src="../../../assets/img/logo.png" alt="Logo" style="width: 50px; height: 50px;" />
            </div>
            <h2 class="form-title">Recuperar Senha</h2>
            <p class="form-description">
                Insira o seu o número de telefone associado à sua conta para receber
                instruções sobre como recuperar sua senha.
            </p>
            <div class="form-group">
                <label for="email" class="form-label">Telefone</label>
                <div style="display: flex; ">
                    <select id="indicativo" class="form-input" style="max-width: 100px; font-size: 12px; margin-right: 5px;"
                        v-model="recoverForm.index">
                        <option value="244" selected>+244 (AO)</option>
                        <option value="351">+351(PT)</option>
                        <option value="55">+55 (BR)</option>
                        <option value="238">+238 (CV)</option>
                        <option value="258">+258 (MO)</option>
                        <!-- Adicione mais opções conforme necessário -->
                    </select>
                    <input :disabled="isValidationCodeValid" type="tel" id="telefone" class="form-input" placeholder="Seu Telefone"
                        v-model="recoverForm.telefone" />
                </div>
                <div style="display: flex;">

                    <input  :disabled="!isValidationCodeValid" required :class="{ 'correct': isCodeCorrect, 'incorrect': isCodeIncorrect }" type="Number" id="validationCode" name="validationCode"
                        class="form-input validation-code-input" placeholder="ST-" v-model="recoverForm.validationCode"/>
                        <span v-if="!isValidationCodeValid" class="validation-code-button" @click="requestValidationCode" style="font-size: 10px;">Solicitar código pelo WhatsApp</span>
                     <span v-else class="validation-code-button" @click="requestConfirmation">Confirmar</span>                </div>
                <label for="email" class="form-label">Senha</label>
              
                <div class="password-input">
                <input  required
              
                id="password"
                name="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Nova Senha" 
            class="user-info-input" 
            :disabled="!isSenhaValidation"
            v-model="newSenha"
                  >
                <span class="password-toggle-btn btn" @click="togglePasswordVisibility">
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </span>
              </div>
            </div>
            <button class="form-button" @click="submitForm" :disabled="!isSenhaValidation">Recuperar Senha</button>
        </div>
    </div>
</template>
  
<script>

import sendMessageWhatsapp from '../../../services/sendMessageWhatsapp';
import getInfo from '../../../services/getInfo';
import vuejwtDecoded from 'vue-jwt-decode';
import swal from 'sweetalert';

export default {
    data() {
        return {
            recoverForm: {
                telefone: null,
                index: '244',
                randomNumber: null,
                validationCode: null,
                id: null,
                
            },
            randomCodeSend: null,
            isValidationCodeValid: false,
            isCodeCorrect: false,
            isCodeIncorrect: false,
            isSenhaValidation: false,
            showPassword: false,
            newSenha: ""

        };
    },
    methods: {

        gerarNumero() {
            var numero = Math.floor(Math.random() * 90000) + 10000;
            return numero;
        },


        formatPhoneNumber(number) {
            // Remove espaços em branco do número
         const cleanedNumber = number.replace(/\s/g, '');
       
         // Verifica se o número começa com '+244' ou '244'
         const regex = /^(?:\+?244|351|55|238|258)?(.*)$/;
       //   const regex = /^(?:(\+?351|55|238|258)|351|55|238|258)?(.*)$/;
       // const regex = /^(?:(\+?244|244))?(.*)$/;
       
       
         const match = cleanedNumber.match(regex);
       
         // Se houver correspondência, retorna o restante do número sem espaços
         if (match && match[1]) {
           return match[1];
         } else {
           // Se não houver correspondência, retorna null ou uma mensagem de erro, dependendo do requisito
           return null;
         }
        },

        async requestValidationCode() {
            if (this.recoverForm.telefone > 1) {
                
                this.recoverForm.randomNumber = this.gerarNumero();
                this.recoverForm.telefone = this.formatPhoneNumber(this.recoverForm.telefone)
                
                const res = await sendMessageWhatsapp.verificationCode(this.recoverForm)
                .then(
                    result =>{
                        this.randomCodeSend = result.data.randomNumber
                        this.isValidationCodeValid = true;
                    }
                )
            }
        },
        requestConfirmation() {
            const r = this.recoverForm.validationCode

            if (r == this.randomCodeSend) {
                this.isCodeCorrect = true;
                this.isCodeIncorrect = false;
                this.isSenhaValidation = true
               
            } else {
                this.isCodeCorrect = false;
                this.isCodeIncorrect = true;
              
            }
        },
        async submitForm() {

            const userData = {
                telefone: this.recoverForm.telefone,
                password: this.newSenha,
            }
            console.log(userData)
              const res = await getInfo.PasswordReset(userData)
              .then(
                result => {
                    swal({
                        title: "Recuperar Senha",
                        text: "A sua senha foi alterada com sucesso.",
                        icon: 'success'
                    }).then( ()=> this.$router.push('/'));

                }
              )
              .catch(
                error =>{
                    swal({
                        title: "Recuperar Senha",
                        text: "Usuario não encontrado na nossa base de dados.",
                        icon: 'error'
                    })
                } 
              )

        },
        togglePasswordVisibility() {
         
         this.showPassword = !this.showPassword;
        
       },




    },
};
</script>
  
<style scoped>
.recovery-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.recovery-form {
    max-width: 400px;
    width: 100%;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #fff;
    text-align: center;
}

.form-title {
    font-size: 24px;
    margin-bottom: 20px;
}

.form-description {
    font-size: 14px;
    margin-bottom: 20px;
    color: #666;
}

.form-label {
    display: block;
    margin-bottom: 10px;
    font-size: 14px;
    text-align: left;
    color: #333;
}

.form-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.form-button {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.form-button:hover {
    background-color: #45a049;
}

.logo {
    margin-bottom: 20px;
}

.validation-code-button {
    background-color: #63e5af;
    color: var(--button-primary-color);
    border: none;
    padding: 10px 20px;
    margin-left: 10px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 12px;
    max-height: 43px;
    transition: background-color 0.3s;
}

.validation-code-input {
    max-width: 150px;
}

.correct {
    color: green;
    animation: fadeIn 0.5s ease-in-out;
}

.incorrect {
    color: red;
    animation: fadeIn 0.5s ease-in-out;
}
  
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}
.password-input {
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 15px;
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
.user-info-input {
  font-size: 14px;
  padding: 8px;
  border: 1px solid green;
  border-radius: 3px;
  width: 100%;
  background: var(--background-color-primary);
  color: var(--text-primary-color);
}
</style>
  