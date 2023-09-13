<template>
    <WhatsaapApp />
    <navBarApp />

    <div class="body-container">
      <div class="profile">
    <div class="avatar">
      <img src="../../../../assets/img/avatar.png" alt="Avatar">
    </div>
    <div class="info">
      <h2 class="name">Nome do Usuário</h2>
      <p class="bio">Biografia</p>
      <p>Olá! Já estou no Whatsapp.</p>
      <p class="phone">Número de Telefone: {{ userNumber }}</p>
      <div class="links">
        <a href="#">Centro de Ajuda</a>
        <a href="#">Contacte-nos</a>
        <a href="#">Política de Privacidade</a>
      </div>
    </div>
  </div>

    </div>
</template>
  
<script>

import WhatsaapApp from '../../../../components/whatsappApp/WhatsappApp.vue';
import navBarApp from '../../../../components/widgets/navBarApp/navbarApp.vue';
import getInfo from '../../../../services/getInfo';
import vuejwtdecode from 'vue-jwt-decode';

export default{
  data(){
    return {
      userNumber: null
    }; 
   },
    components: {
    WhatsaapApp,
    navBarApp,
  },
  methods: {
    async getInfoProfile(){
      const token = localStorage.getItem('jwt');
      const myInfo = vuejwtdecode.decode(token);
      const profile = await getInfo.getUser(myInfo._id);
      this.userNumber = profile.addons[0].userNumber;
      
    },
  },
  created(){
    this.getInfoProfile();
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
    /* align-items: center; */
    /* justify-content: center; */
}
.body-container h1{
  font-size: 2.5rem;
   
}
.profile {
  display: flex;
  /* align-items: center; */
  padding: 20px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  flex: 1;
}

.name {
  margin: 0;
  font-size: 1.5rem;
}

.bio {
  margin: 5px 0;
  font-size: 1rem;
}

.phone {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}

.links {
  margin-top: 10px;
}

.links a {
  text-decoration: none;
  color: #007bff;
  margin-right: 10px;
  font-size: 0.8rem;
}

.links a:last-child {
  margin-right: 0;
}
</style>