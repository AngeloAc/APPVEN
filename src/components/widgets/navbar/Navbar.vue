 <!--
  @utor: Euclides de Carvalho
  Data: 15/08/2023
  Component: NAVBAR
  Abordagem: 
   -->
<template>
  <!-- Sidebar -->
  <div class="sidebar-min shadow-lg" :class="{ 'sidebar-hidden': sidebarHidden }">
    <div class="logo">
      <img src="../../../assets/img/logo.png" style="width: 30px; height: 30px; margin-bottom: 30px;">
    </div>
    
    <ul>
      <li>
        <router-link to="/home" class="sidebar-link" :class="{ 'active': isActive('/home') }">
          <i class="bi bi-speedometer2" style="color: green; font-size: 18px;"></i> <span style=" font-size: 12px; font-weight: normal;">Home</span>
          <!-- <span>Dashboard</span> -->
        </router-link>
      </li>
      <li>
        <router-link to="/chat" class="sidebar-link" :class="{ 'active': isActive('/chat') }">
          <i class="bi bi-chat-left-dots" style="color: green; font-size: 18px;"></i> <span style=" font-size: 12px; font-weight: normal;">Chat RPRO</span>
          <!-- <span>Settings</span> -->
        </router-link>
      </li>

      <!-- <li>
        <router-link to="/app" class="sidebar-link" :class="{ 'active': isActive('/app') }">
          <i class="bi bi-whatsapp" style="margin-left: 12px;"></i> <span style="margin-left: 16px;">WhatsApp</span>
        
        </router-link>
      </li> -->

      <li>
        <router-link to="/codejava" class="sidebar-link" :class="{ 'active': isActive('/codejava') }">
          <i class="bi bi-terminal" style="color: green; font-size: 18px;"></i> <span style=" font-size: 12px; font-weight: normal;">Chat Code</span>
          <!-- <span>Hosts</span> -->
        </router-link>
      </li>
      <li>
        <router-link to="/settings" class="sidebar-link" :class="{ 'active': isActive('/settings') }">
          <i class="bi bi-gear" style="color: green; font-size: 18px;"></i> <span style=" font-size: 12px; font-weight: normal;">Definições</span>
          <!-- <span>Settings</span> -->
        </router-link>
      </li>

      <hr style="color: black;">
      <li>
        <router-link to="/invite" class="sidebar-link" :class="{ 'active': isActive('/invite') }">
          <i class="bi bi-people" style="color: green; font-size: 18px;"></i> <span style=" font-size: 12px; font-weight: normal;">Convidar Amigos</span>
          <!-- <span>Settings</span> -->
        </router-link>
      </li>
      <!-- <li>
        <router-link to="/learn" class="sidebar-link" :class="{ 'active': isActive('/learn') }">
          <i class="bi bi-question-circle"  style="margin-left: 12px; color: gray; font-size: 20px;"></i><span style="margin-left: 16px;  font-size: 12px; font-weight: bold;">Recursos AI</span>
          
        </router-link>
      </li> -->
  
      <!-- Adicione mais itens do sidebar conforme necessário -->
      <!-- Botão de Logout no Sidebar -->
      <li class="sidebar-link" :class="{ 'active': isActive('/out') }" @click="logoutUser">
        <!-- <button class="btn logout h-100" @click="logoutUser">Logout</button> -->
        <i class="bi bi-box-arrow-left" style="color: rgb(223, 101, 101);; font-size: 18px;"></i> <span style=" font-size: 12px; color: rgb(223, 101, 101);">Sair</span>
      </li>
    </ul>
  </div>
  <div class="sidebar-max shadow-lg" >
    <div class="logo">
      <img src="../../../assets/img/logo.png" style="width: 30px; height: 30px; margin-bottom: 30px;">
    </div>

    <ul>
      <li>
        <router-link to="/home" class="sidebar-link" :class="{ 'active': isActive('/home') }">
          <i class="bi bi-speedometer2" ></i>
        </router-link>
      </li>
      <li>
        <router-link to="/chat" class="sidebar-link" :class="{ 'active': isActive('/chat') }">
          <i class="bi bi-chat-left-dots" ></i>
        </router-link>
      </li>

      <!-- <li>
        <router-link to="/app" class="sidebar-link" :class="{ 'active': isActive('/app') }">
          <i class="bi bi-whatsapp" style="margin-left: 12px;"></i> <span style="margin-left: 16px;">WhatsApp</span>
        </router-link>
      </li> -->

      <li>
        <router-link to="/codejava" class="sidebar-link" :class="{ 'active': isActive('/codejava') }">
          <i class="bi bi-terminal" ></i>
          
        </router-link>
      </li>
      <li>
        <router-link to="/settings" class="sidebar-link" :class="{ 'active': isActive('/settings') }">
          <i class="bi bi-gear" ></i>
         
        </router-link>
      </li>
      <li>
        <router-link to="/invite" class="sidebar-link" :class="{ 'active': isActive('/invite') }">
          <i class="bi bi-people" ></i>
          
        </router-link>
      </li>
      <!-- <li>
        <router-link to="/learn" class="sidebar-link" :class="{ 'active': isActive('/learn') }">
          <i class="bi bi-question-circle"  ></i>
          
        </router-link>
      </li> -->
      <p></p>
      <p></p>
      <p></p>
      <!-- Adicione mais itens do sidebar conforme necessário -->
      <!-- Botão de Logout no Sidebar -->
      <li class="sidebar-link" :class="{ 'active': isActive('/out') }" @click="logoutUser">
        <!-- <button class="btn logout h-100" @click="logoutUser">Logout</button> -->
        <i class="bi bi-box-arrow-left" ></i>
      </li>
    </ul>
  </div>

  <!-- App Bar -->
  <div class="app-bar">
    <div class="menu-toggle" @click="toggleSidebar">
      <i class="bi bi-list"></i>
    </div>
    <div class="app-title">STARTIC.ao</div>
    <div class="search-button">

   
    </div>
  </div>
  <!-- END APPBAR  -->

</template>

<script>
import vuejwtdecode from 'vue-jwt-decode';

export default {
  props: {
    message: {},
    logOut: {
      type: Function
    }
  },
  data() {
    return {
      sidebarHidden: true,
      codeStatus: false
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarHidden = !this.sidebarHidden;
    },
    logoutUser() {
      this.logOut();
    },
    isActive(route) {
      return this.$route.path === route;
    },
    init() {
      const token = localStorage.getItem('jwt');
      const _token = vuejwtdecode.decode(token);
      this.codeStatus = _token.codeStatus;
      
    },

 

  },
  created() {
    this.init();

  },

}
</script>

<style>

.logo {
  font-size: 20px;
  font-weight: bold;
  margin-top: 10px;
}

/* Estilos para a barra lateral */
.sidebar-min {
  width: 250px;
  background: var(--background-color-primary);
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
  transition: transform 0.3s ease, width 0.3s ease;
  /* font-family: 'Montserrat', sans-serif; */
  font-size: 8px;
  letter-spacing: 0.5px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}


.sidebar-max {
  width: 50px;
  /* Largura original do sidebar */
  background: var(--background-color-primary);
  padding: 5px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
  transition: transform 0.3s ease, width 0.3s ease;
  /* Adiciona transição de transformação e largura */
  z-index: 1000;
}

.sidebar-hidden {
  transform: translateX(-250px);
  /* Move o sidebar para a esquerda para ocultá-lo completamente */
  width: 0;
  /* Largura 0 para ocultar completamente */
  overflow: hidden;
}

/* ...código anterior do estilo da Sidebar e do Main content... */
.sidebar-min ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.sidebar-max ul {
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
  font-weight: bold;
  font-size: 12px;
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
  background-color: white;
  /* Cor de fundo para link ativo */
  color: #007bff;
  /* Cor do ícone e do texto para link ativo */
  border: .1px solid greenyellow;
  border-radius: 8px;
}





/* Estilos para a App Bar */
.app-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--background-color-primary);
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.app-title {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-primary-color);
}

.search-button {
  cursor: pointer;
  font-size: 24px;
  color: var(--text-primary-color);
}

/* Estilos para o menu hamburguer (ícone de menu) */
.menu-toggle {
  cursor: pointer;
  font-size: 24px;
  color: var(--text-primary-color);
}

/* Estilos para a barra lateral */
/* ... Seus estilos anteriores aqui ... */

@media (max-width: 768px) {

  /* Estilos para a App Bar em telas menores */

  .sidebar-max {
    display: none;
  }
  .sidebar-link {
  margin: 10px;
  
}
  /* Outros estilos para telas menores (como no código anterior) */
}

@media (min-width: 768px) {
  
  .search-button {
    /* Oculta o botão de pesquisa em telas menores */
  }

  .app-bar {
    display: none;
  }
  .sidebar-min {
    display: none;
  }

  .search-button {}
}

.show {
  display: block;
}
</style>