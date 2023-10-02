<template>
  <SettingsComponent />
  <div class="container">
    <h2 class="title">Convite para aderir ao Startic</h2>
    <p>Olá,</p>
    <p>Você é convidado a fazer parte da Startic - a nova aplicação revolucionária para gerenciamento de projetos usando inteligência artificial.</p>
    
    <p>Para se juntar a nós, basta clicar no botão abaixo e criar sua conta gratuita:</p>

    <p>Estamos ansiosos para te receber na nossa comunidade de usuários do Startic!</p>
    <p>Atenciosamente,</p>
    <p>A equipe Startic</p>

    <p>CEO: Euclides A. G. de Carvalho</p>

    <div class="input-button-container">
      <input type="tel" placeholder="Digite o número do Whatsapp à convidar." v-model="telefone">
      <button class="invite-button" @click="sendMessage">Convidar</button>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert";
import SettingsComponent from "../../../components/settngs/SettingsComponent.vue";
import whatsapp from "../../../services/sendMessageWhatsapp";
import vue_jwt_decode from 'vue-jwt-decode'
export default {
  name: 'ConviteStartic',
  data() {
    return {
      telefone: null,
    };
  },
  methods: {
    voltar() {
      this.$router.go(-1);
    },
    formatPhoneNumber(number) {
  // Remove espaços em branco do número
  const cleanedNumber = number.replace(/\s/g, '');

  // Verifica se o número começa com '+244' ou '244'
  const regex = /^(?:\+?244|244)?(.*)$/;
  const match = cleanedNumber.match(regex);

  // Se houver correspondência, retorna o restante do número sem espaços
  if (match && match[1]) {
    return match[1];
  } else {
    // Se não houver correspondência, retorna null ou uma mensagem de erro, dependendo do requisito
    return null;
  }
},
   async sendMessage(){
      try {
        const token = localStorage.getItem('jwt');
        const dadosPessoal = vue_jwt_decode.decode(token);
        this.telefone = this.formatPhoneNumber(this.telefone);
        const info = {
          sender: dadosPessoal.name,
          phone_invite: this.telefone
  
        };

        const invite = await whatsapp.sendemessage(info)
        .then(()=>{
          this.telefone = '';
          swal({
            title: 'Convite',
            text: '🎊🎉 O seu convite foi enviado para o seu amigo. Obrigado por ajudar a comunidade.',
            icon: 'success'
          });
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
  components:{
    SettingsComponent
  },
}
</script>

<style scoped>
.container {
  margin: 120px 10px 10px 10px;
  padding: 20px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.2);
  /* background: var(--background-color-primary); */
  border-radius: 10px;
  max-width: 350px;
  margin: 90px auto;
  /* text-align: center; */
}

.title {
  color: var(--text-primary-color);
  font-size: 24px;
  margin-bottom: 20px;
}

p {
  font-size: 12px;
  margin-bottom: 10px;
  color: var(--text-primary-color);
}

.button {
  background-color: green;
  color: white;
  padding: 10px 20px;
  margin: 20px 0;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button:hover {
  background-color: darkgreen;
}

.input-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

input[type="tel"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  width: 100%;
  margin-top: 40PX;
  max-width: 300px;
}

.invite-button {
  background-color: green;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.invite-button:hover {
  background-color: darkgreen;
}
</style>


