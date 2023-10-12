<template>
  <SettingsComponent />
  <div class="main-content">
    <div class="container" style="margin-top: 10px; margin-bottom: 30px;">
      <h6>Conta</h6>
      <p>Atualize todas as informações da sua conta</p>

      <!-- Informações do usuário logado -->
      <div class="user-info">
        <div class="avatar-container">
          <img :src="url" alt="" class="avatar" style="border: 1px solid green; cursor: pointer;" @click="callProfilePicture">
        </div>
        <form action="" @submit.prevent="onSubmitForm">
          <div class="user-details">
            <!-- <div class="user-info-row">
              <span class="user-info-label" style="font-weight: bold;">E-mail</span>
              <input class="user-info-input" v-model="user.email">
            </div> -->
            <div class="user-info-row">
              <span class="user-info-label" style="font-weight: bold;">Nome</span>
              <input class="user-info-input" v-model="user.name">
            </div>
            <div class="user-info-row">
              <label class="user-info-label" for="password" style="font-weight: bold;">Senha</label>
              <div class="password-input">
                <input id="password" class="user-info-input" :type="showPassword ? 'text' : 'password'"
                  v-model="newPassword" placeholder="Nova senha">
                <button class="password-toggle-btn" @click="togglePasswordVisibility">
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </button>
              </div>
            </div>
            <div class="user-info-row">
              <span class="user-info-label" style="font-weight: bold;">Tel./Whatsapp</span>
              <input type="tel" class="user-info-input" v-model="user.telefone" placeholder="Numero de telefone" disabled >
            </div>
            <div class="user-info-row">
              <span class="user-info-label" style="font-weight: bold;">País</span>
              <input class="user-info-input" v-model="user.country">
            </div>
            <div class="user-info-row">
              <span class="user-info-label" style="font-weight: bold;">Idioma</span>
              <select id="languageSelect" class="user-info-input" v-model="user.language">
                <option :value="user.language">{{ user.language }}</option>
              </select>
            </div>
          </div>
          <button class="btn edit-profile-btn" @click="editProfile"><i class="bi bi-pencil"></i> Editar o seu
            perfil</button>
        </form>
      </div>

        <!-- START Modal para a image profile -->
  <div class="modal modal-overlay" tabindex="-1" role="dialog" :class="{ 'show': showModalProfile, 'd-block': showModalProfile }">
    <div class="modal-body d-block modal-dialog-centered" role="document">
      <div class="card mx-auto" style="max-width: 400px;"> <!-- Defina o tamanho máximo desejado aqui -->
        <img :src="url" alt="" class="modal-image">
        <div class="card-footer" style="display: flex; color: green; padding-top: 7px; padding-bottom: 7px; justify-content: space-around;">
          <input type="file" ref="fileInput" style="display: none;" @change="handleFileUpload" accept="image/*" />
          <i class="bi bi-camera icon" @click="openGallery"></i>
          <button class="btn btn-sm" style="border: 1px solid green; border-radius: 15px; padding: 0px 20px 0px 20px;" @click="upload">editar</button>
        </div>
      </div>
      <div style=" display: flex; width: 100%; height: 50vh; align-items: center; justify-content: center;" @click="showModalProfile = false">
        <button class="btn-close"></button>
      </div>
    </div>
  </div>
  <!--END Modal para a image profile -->

      <div class="billing-section">
        <h6 class="section-title">Saldo</h6>
        <div class="billing-info">
          <div class="billing-card">
            <div class="billing-card-header">
              <h5>{{ user.saldo }} Kz</h5>
            </div>
            <div class="billing-card-body">
              <p class="billing-text">Plano Atual: {{ user.plano }}</p>
              <p class="billing-text">Validade: {{ user.expire }}</p>
              <p class="billing-text">Cartão de Credito: **** **** **** 1234</p>
            </div>
          </div>
        </div>
        <!-- <button class="btn change-plan-btn" @click="alterarPlano">Alterar Plano</button> -->
        <button class="btn update-payment-btn" @click="updatePlano">Atualizar Pagamento</button>
      </div>

      <button class="btn delete-account-btn" @click="deletarConta"><i class="bi bi-trash"></i> Deletar sua conta</button>
    </div>
  </div>
</template>

<script>
import SettingsComponent from '../../../components/settngs/SettingsComponent.vue';
import getInfo from '../../../services/getInfo';
import vuejwtDecoded from 'vue-jwt-decode';
import { storage } from "../../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import swal from 'sweetalert';

export default {
  data() {
    return {
      user: {},
      newPassword: null,
      showPassword: false,
      showModalProfile: false,
      path: 'folder/2.jpg',
      url: 'https://placehold.co/400',
      file: ''

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
      
    },
    alterarPlano() {
      
    },
    updatePlano() {
      this.$router.push('/pagamento')
    },
    async deletarConta() {
     
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

    callProfilePicture() {
      this.showModalProfile = true
    },
    openGallery() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Verifique se o arquivo selecionado é uma imagem (pode ser necessário validar outros tipos de imagens)
        if (file.type.startsWith("image/")) {
          // this.isImageSelected = true;
          this.file = file;

        } else {
          // this.isImageSelected = false;
          // this.file = { name: "Fomatos válidos .png .jpg" }

        }
      }
    },
    upload() {
      const token = localStorage.getItem('jwt');
      const _token = vuejwtDecoded.decode(token);
      const storageRef = ref(storage, `folder/${_token._id}.jpg`);
      console.log(this.file);
      uploadBytes(storageRef, this.file).then(
        snpashot => {
          swal({
            title: "Sucesso",
            text: "A sua foto foi actualizada com sucesso.",
            icon: 'success'
          })
          window.location.reload();
        }
      )
    },

  },
  components: {
    SettingsComponent,
  },
  created() {
    this.getUser();
  },
  mounted() {
    const token = localStorage.getItem('jwt');
    const _token = vuejwtDecoded.decode(token);
    this.path = `folder/${_token._id}.jpg`;
    getDownloadURL(ref(storage, this.path)).then((download_url) => (this.url = download_url))
  },
}
</script>

<style scoped>
/* Estilos globais */

.main-content {
  
}


.user-info {
  display: block;
  margin-left: auto;
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);
  padding: 20px;
  border-radius: 5px;
  border: .1px solid greenyellow;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 10px;
  background: gray;
  object-fit: cover;
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
  font-size: 14px;
  margin-bottom: 10px;
  color: var(--text-primary-color);
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
  font-size: 16px;
}

.billing-card-body {
  padding: 20px;
}

.billing-text {
  font-size: 12px;
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
  /* justify-content: center; */
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
  width: 400px;
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

@media (max-width: 768px) {

  /* Estilos para telas menores */
  .main-content {
    margin-top: 70px;
    margin-bottom: 30px;
    margin-left: 0;
    font-size: 10px;
    /* padding: 10px; */
    /* Adicionado espaço interno menor */
  }

  .user-info-label {
    display: none;
  }

  .user-info-input {
    width: 100%;
    /* Alterado para ocupar todo o espaço disponível */
  }
  .avatar-container {
  justify-content: center;
}
}

.card-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100px;

}

.modal-body {
  max-width: 100%;


}

.modal-avatar {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.modal-icons {
  display: flex;
  gap: 20px;
  font-size: 24px;
  margin-top: 20px;
}

.icon {
  cursor: pointer;
  color: green;
  font-size: 20px;
  transition: color 0.3s ease;
  cursor: pointer;
}

.icon:hover {
  color: #0056b3;
}

.card {
  width: 210px;
  /* position: fixed; */
  top: 10px; 
  border: .1px solid green;
  border-radius: 0;
 
  /* Ajuste a largura da div conforme necessário */
}

.modal-image {
  object-fit: cover;
  width: 100%;
  height: 200px;
  /* Altura desejada para a imagem */
}

.modal {
  text-align: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* Fundo translúcido */
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.modal-content {
  background: var(--background-color-secondary);
  color: var(--text-primary-color);
}
</style>