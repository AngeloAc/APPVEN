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

    <!-- <p>CEO: Euclides A. G. de Carvalho</p> -->

    <div class="input-button-container">
      <div class="telefone-index-container">
          <select id="indicativo" class="form-input" style="max-width: 100PX;" v-model="indicativo">
            <option value="244" selected>+244 (AO)</option>
            <option value="351">+351(PT)</option>
            <option value="55">+55 (BR)</option>
            <option value="238">+238 (CV)</option>
            <option value="258">+258 (MO)</option>
            <!-- Adicione mais opções conforme necessário -->
        </select>
        <input class="form-input telefone-input " type="tel" placeholder="Whatsapp à convidar." v-model="telefone">
      </div>
      
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
      indicativo: '244',
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
   async sendMessage(){
      try {
        const token = localStorage.getItem('jwt');
        const dadosPessoal = vue_jwt_decode.decode(token);
        this.telefone = this.formatPhoneNumber(this.telefone);
        const info = {
          index: this.indicativo,
          sender: dadosPessoal.name,
          phone_invite: this.telefone,

  
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
  margin: 90px auto;
  padding: 20px;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  max-width: 350px;
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

.form-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: .1px solid greenyellow;
  border-radius: 3px;
  font-size: 12px;
  background: var(--background-color-primary);
  color: var(--text-primary-color);
}

.input-button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.telefone-index-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.telefone-input {
  flex: 1;
  margin-left: 10px;
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


