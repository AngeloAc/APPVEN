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
          <i class="bi bi-house" style="font-size: 18px;"></i> <span
            style=" font-size: 12px;">Home</span>
          <!-- <span>Dashboard</span> -->
        </router-link>
      </li>
      <li>
        <router-link to="/chat" class="sidebar-link" :class="{ 'active': isActive('/chat') }">
          <i class="bi bi-chat-left-dots" style="font-size: 18px;"></i> <span
            style=" font-size: 12px;">Chat RPRO</span>
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
          <i class="bi bi-terminal" style="font-size: 18px;"></i> <span style=" font-size: 12px;">AI
            Programador</span>
          <!-- <span>Hosts</span> -->
        </router-link>
      </li>
      <li>
        <router-link to="/settings" class="sidebar-link" :class="{ 'active': isActive('/settings') }">
          <i class="bi bi-gear" style="font-size: 18px;"></i> <span
            style=" font-size: 12px;">Definições</span>
          <!-- <span>Settings</span> -->
        </router-link>
      </li>

      <hr style="color: black;">
      <li>
        <router-link to="/invite" class="sidebar-link" :class="{ 'active': isActive('/invite') }">
          <i class="bi bi-people" style="font-size: 18px;"></i> <span
            style=" font-size: 12px;">Convidar Amigos</span>
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
        <i class="bi bi-power" style="color: rgb(223, 101, 101);; font-size: 18px;"></i> <span
          style=" font-size: 12px; color: rgb(223, 101, 101);">Terminar sessão</span>
      </li>
    </ul>
  </div>
  <div class="sidebar-max shadow-lg">
    <div class="logo">
      <img src="../../../assets/img/logo.png" style="width: 30px; height: 30px; margin-bottom: 30px;">
    </div>

    <ul>
      <li>
        <router-link to="/home" class="sidebar-link" :class="{ 'active': isActive('/home') }">
          <i class="bi bi-house"></i>
        </router-link>
      </li>
      <li>
        <router-link to="/chat" class="sidebar-link" :class="{ 'active': isActive('/chat') }">
          <i class="bi bi-chat-left-dots"></i>
        </router-link>
      </li>

      <!-- <li>
        <router-link to="/app" class="sidebar-link" :class="{ 'active': isActive('/app') }">
          <i class="bi bi-whatsapp" style="margin-left: 12px;"></i> <span style="margin-left: 16px;">WhatsApp</span>
        </router-link>
      </li> -->

      <li>
        <router-link to="/codejava" class="sidebar-link" :class="{ 'active': isActive('/codejava') }">
          <i class="bi bi-terminal"></i>

        </router-link>
      </li>
      <li>
        <router-link to="/settings" class="sidebar-link" :class="{ 'active': isActive('/settings') }">
          <i class="bi bi-gear"></i>

        </router-link>
      </li>
      <li>
        <router-link to="/invite" class="sidebar-link" :class="{ 'active': isActive('/invite') }">
          <i class="bi bi-people"></i>

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

      <!-- <img :src="url" alt="" class="avatar" style="border: 1px solid green;" @click="callProfilePicture"> -->
      <!-- Adicione mais itens do sidebar conforme necessário -->
      <!-- Botão de Logout no Sidebar -->
      <li class="sidebar-link" :class="{ 'active': isActive('/out') }" @click="logoutUser">
        <!-- <button class="btn logout h-100" @click="logoutUser">Logout</button> -->
        <i class="bi bi-power" style="color: rgb(223, 101, 101);"></i>
      </li>
    </ul>
  </div>

  <!-- App Bar -->
  <div class="app-bar">
    <div class="menu-toggle" @click="toggleSidebar">
      <i class="bi bi-list"></i>
    </div>
    <div class="app-title">STARTIC.ai</div>
    <div class="search-button">
      
      <router-link to="/home" :class="{ 'active': isActive('/home') }" style="margin: 0px 25px 0px 25px;">
        <i class="bi bi-house"></i>
          <!-- <span>Dashboard</span> -->
        </router-link>
      <!-- <i class="bi bi-bell"></i> -->
      <div v-if="url === null">
        ola
      </div>
      <img :src="url" alt="" class="avatar" style="border: 1px solid green;" @click="callProfilePicture">
    </div>
  </div>
  <!-- END APPBAR  -->

  <!-- START Modal para a image profile -->
  <div class="modal modal-overlay" tabindex="-1" role="dialog" :class="{ 'show': showModalProfile, 'd-block': showModalProfile }">
    <div class="modal-body d-block modal-dialog-centered" role="document">
      <div class="card mx-auto" style="max-width: 400px;"> <!-- Defina o tamanho máximo desejado aqui -->
        <img v-if="isImageSelected" :src="selectedImageUrl" alt="Imagem selecionada" class="modal-image">
        <img v-else :src="url" alt="" class="modal-image">
        <div class="card-footer" style="display: flex; color: green; padding-top: 7px; padding-bottom: 7px; justify-content: space-around;">
          <input type="file" ref="fileInput" style="display: none;" @change="handleFileUpload" accept="image/*" />
          <i class="bi bi-camera icon" @click="openGallery"></i>
          <!-- <i class="bi bi-exclamation-circle icon"></i> -->
          <button class="btn btn-sm" :class="{ 'btn-success': isImageSelected, 'btn-secondary': !isImageSelected }" style="border: 1px solid green; border-radius: 15px; padding: 0px 20px 0px 20px;" @click="upload" :disabled="!isImageSelected">editar</button>
        
        </div>
      </div>
      <div style=" display: flex; width: 100%; height: 50vh; align-items: center; justify-content: center;" @click="showModalProfile = false">
        <button class="btn-close"></button>
      </div>
    </div>
  </div>
  <!--END Modal para a image profile -->
</template>

<script>
import vuejwtdecode from 'vue-jwt-decode';
import { storage } from "../../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import swal from 'sweetalert';

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
      codeStatus: false,
      showModalProfile: false,
      path: 'folder/2.jpg',
      url: 'https://placehold.co/400',
      file: '',
            isImageSelected: false,
      selectedFile: null,
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
          this.isImageSelected = true;
          this.file = file;
          this.selectedImageUrl = URL.createObjectURL(file);
        } else {
          this.selectedFile = null;
          this.isImageSelected = false;
          this.selectedImageUrl = null;

        }
      }
    },
    upload(){
      const token = localStorage.getItem('jwt');
    const _token = vuejwtdecode.decode(token);
        const storageRef = ref(storage, `folder/${_token._id}.jpg`);
 
        uploadBytes(storageRef, this.file).then(
          snpashot =>{
            swal({
              title: "Sucesso",
              text: "A sua foto foi actualizada com sucesso.",
              icon: 'success'
            }).then(
            ()=>{window.location.reload();}
            )
            
          }
        )
      },


  },
  created() {
    this.init();

  },
  mounted() {
    const token = localStorage.getItem('jwt');
    const _token = vuejwtdecode.decode(token);
    this.path = `folder/${_token._id}.jpg`;
    
    getDownloadURL(ref(storage, this.path))
    .then((download_url) => { (
      this.url = download_url
      
      )
      console.log(this.url)
    })
    .catch(
      error => {
       console.log(error)
      }
    )
  },

}
</script>

<style scoped>
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
  /* font-size: 8px; */
  /* font-weight: bold; */
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
  /* font-weight: bold; */
  /* font-size: 12px; */
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
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  background: gray;
  object-fit: cover;
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
.search-button i{
  padding: 0px 10px 0px 10px;
  font-size: 22px;
  color: green;
  cursor: pointer;
  /* border-bottom: 1px solid green; */
  
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
}</style>