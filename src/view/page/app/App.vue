<template>
  <WhatsaapApp />
  <navBarApp/>

  <div class="body-container">
    <div>
      <img src="../../../assets/img/ai_man.png" alt="" style="width: 400px;">
    <p class="text-center">Automatize o seu whatsapp</p>
    <p style="font-size: 12px;" class="text-center">Gerencie e torna o seu whatsapp mais inteligente e impressione os seus clientes.</p>
    <p style="font-size: 10px;" class="text-center">Desenvolvido pela Startic, lda</p>  
    <p style="font-size: 10px;" class="text-center">Versão: 0.0.1-beta, ultima actualização: 08-2023</p>  
  </div>
    
  </div>



     
</template>

<script>
import gerirWhatsappService from '../../../services/gerirWhatsappService';
import WhatsaapApp from '../../../components/whatsappApp/WhatsappApp.vue';
import navBarApp from '../../../components/widgets/navBarApp/navbarApp.vue';
import vuejwtdecode from 'vue-jwt-decode';
 
export default {
  data() {
    return {
      dataQrcode: {},
      showModal: false,
    };
  },
  components: {
    WhatsaapApp,
    navBarApp,
  },
  methods: {
 
  },
  created() {
   

  },
}
</script>

<style scoped>

.body-container{
  /* background: green; */
    position: fixed;
    left: 120px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.body-container h1{
  font-size: 2.5rem;
   
}

</style>