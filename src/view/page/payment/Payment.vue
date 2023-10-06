<template>
  <SettingsComponent />
  <div class="container">
    <h2 class="title">Atualizar Pagamento</h2>
    <div class="payment-info">
      <p style="color: black; font-weight: bold;">7.500,00 kz</p>
      <p>Transferência Bancária</p>
      <p>Titular: STARTIC, LDA</p>
      <p>Número de Conta: <span style="color: red;">Indisponivel</span> </p>
      <p>IBAN:  <span style="color: red;">Indisponivel</span></p>
    </div>

    <div class="upload-section">
      <label for="fileInput" class="upload-button">
        <i class="bi bi-file-earmark-arrow-up"></i>
        <span>Carregar Imagem</span>
      </label>
      <input type="file" id="fileInput" style="display: none;" @change="infoWait" accept="image/*"  />
      <!-- Adicione um input do tipo file para selecionar a imagem -->

      <p class="upload-instructions">Envie o comprovante de pagamento</p>
      <p style="font-size: 12px; color: orange;">{{ file.name }}</p>
      <button class="pay-button" :disabled="!isImageSelected" @click="uploadImage">Pagar</button>
    </div>
  </div>
</template>

<script>
import SettingsComponent from "../../../components/settngs/SettingsComponent.vue";
import client from '../../../services/sendMessageWhatsapp'
import swal from "sweetalert";

export default {
  name: "PaymentUpdate",
  components: {
    SettingsComponent,
  },
  data() {
    return {
      file: '',
      isImageSelected: false,
    };
  },

  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Verifique se o arquivo selecionado é uma imagem (pode ser necessário validar outros tipos de imagens)
        if (file.type.startsWith("image/")) {
          this.isImageSelected = true;
          this.file = file;

        } else {
          this.isImageSelected = false;
          this.file = { name: "Fomatos válidos .png .jpg" }

        }
      }
    },
    async uploadImage() {

      if (this.file) {
        // Certifique-se de que o arquivo selecionado é uma imagem (opcional)
        if (this.file.type.startsWith("image/")) {
          // Crie um objeto FormData para enviar a imagem como parte de uma solicitação POST
          const formData = new FormData();
          formData.append("file", this.file);


          try {
            // Faça uma solicitação POST para o seu servidor Node.js
            await client.sendImage(formData)
              .then(msg => swal({
                title: "Parabéns!",
                text: "Enviamos o seu comprovante ao nossa area de apoio, será e activada a sua subscrição.",
                icon: "success"
              }) 
              )
              .catch(msg => 
              swal({
                title: "Erro!",
                text: "Erro ao enviar o comprovante.",
                icon: "error"
              })
              )


          } catch (error) {
            console.error("Erro ao enviar a imagem:", error);
          }
        } else {
          console.error("Arquivo selecionado não é uma imagem.");
        }
      }
    },

  },
};
</script>


<style scoped>
.container {
  margin-top: 120px;
  padding: 20px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
  background-color: var(--background-color-secondary);
  color: var(--text-primary-color);
  /* margin: 0 auto; */
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.payment-info {
  margin-bottom: 20px;
}

.payment-info i {
  font-size: 24px;
  vertical-align: middle;
  margin-right: 5px;
}

.payment-info p {
  font-size: 14px;
  margin-bottom: 10px;
}

.upload-section {
  text-align: center;
}

.upload-button {
  display: inline-block;
  border: 1px solid black;
  padding: 7px 50px;
  cursor: pointer;
  border-radius: 5px;
}

.upload-button i {
  font-size: 16px;
  vertical-align: middle;
  margin-right: 5px;
}

.upload-instructions {
  font-size: 10px;
  margin-top: 5px;
}

.pay-button {
  background-color: green;
  color: white;
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pay-button:hover {
  background-color: darkgreen;
}
</style>
