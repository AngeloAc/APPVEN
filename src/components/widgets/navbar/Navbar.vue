 <!--
  @utor: Euclides de Carvalho
  Data: 15/08/2023
  Component: NAVBAR
  Abordagem: 
   -->
<template>

    
    <!-- Sidebar -->
    <div class="sidebar shadow-lg" :class="{ 'sidebar-hidden': sidebarHidden }">
      <div class="logo">
        <img src="../../../assets/img/logo.png" style="width: 30px; height: 30px; margin-bottom: 30px;">
      </div>
      <ul>
        <li>
          <router-link to="/home" class="sidebar-link" :class="{ 'active': isActive('/home') }">
            <i class="bi bi-speedometer2"></i>
            <!-- <span>Dashboard</span> -->
          </router-link>
        </li>
        <li>
          <router-link to="/chat" class="sidebar-link" :class="{ 'active': isActive('/chat') }">
            <i class="bi bi-chat-left-dots"></i>
            <!-- <span>Settings</span> -->
          </router-link>
        </li>
       
        <li>
          <router-link to="/app" class="sidebar-link" :class="{ 'active': isActive('/app') }">
            <i class="bi bi-whatsapp"></i>
            <!-- <span>Hosts</span> -->
          </router-link>
        </li>
     
        <li>
          <router-link to="/codejava" class="sidebar-link" :class="{ 'active': isActive('/codejava') }">
            <i class="bi bi-terminal"></i>
            <!-- <span>Hosts</span> -->
          </router-link>
        </li>
        <li>
          <router-link to="/settings" class="sidebar-link" :class="{ 'active': isActive('/settings') }">
            <i class="bi bi-gear"></i>
            <!-- <span>Settings</span> -->
          </router-link>
        </li>
        <!-- Adicione mais itens do sidebar conforme necessário -->
         <!-- Botão de Logout no Sidebar -->
         <li class="sidebar-link" :class="{ 'active': isActive('/out') }">
          <!-- <button class="btn logout h-100" @click="logoutUser">Logout</button> -->
          <i class="bi bi-box-arrow-left" @click="logoutUser"></i>
        </li>
      </ul>
    </div>

   

</template>

<script>
import vuejwtdecode from 'vue-jwt-decode';

export default {
  props:{
    message:{},
    logOut:{
      type: Function
    }
  },
  data() {
    return {
      sidebarHidden: false,
      codeStatus: false
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarHidden = !this.sidebarHidden;
    },
    logoutUser(){
      this.logOut();
    },
    isActive(route) {
      return this.$route.path === route;
    },
    init(){
      const token = localStorage.getItem('jwt');
      const _token = vuejwtdecode.decode(token);
      this.codeStatus = _token.codeStatus;
      console.log(this.codeStatus);
    },
  },
  created() {
    
  },
  computed(){
    this.init()
  },
}
</script>

<style>
.logo {
  font-size: 24px;
  font-weight: bold;
  margin-top: 10px;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 5px;
  width: 50px;
  /* border-right: .1px solid gray; */
  transition: width 0.3s ease;
  background: var(--background-color-primary);
}

.sidebar-hidden {
  width: 0;
  overflow: hidden;
}

/* ...código anterior do estilo da Sidebar e do Main content... */

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  color: var(--text-primary-color);
  text-decoration: none;
  padding: 10px;
  cursor: pointer;
}

.sidebar-link i {
  margin-right: 10px;
}


.sidebar li {
  margin-bottom: 10px;
}

.sidebar .logout {
 cursor: pointer;
  /* width: 100%; */
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  background: gray;
}

.username {
  color: #fff;
  font-weight: bold;
}
.active {
  background-color: white; /* Cor de fundo para link ativo */
  color: #007bff; /* Cor do ícone e do texto para link ativo */
  border: .1px solid greenyellow;
  border-radius: 8px;
}
</style>
