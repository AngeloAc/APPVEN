<template>

<SplashScreen v-if="showSplashScreen" @splash-screen-loaded="hideSplashScreen" />
   

    <div v-else class="main-container">
   
      <div class="form-container">
        <div class="logo">
        <img src="../../assets/img/logo.png" alt="Logo" style="width: 50px; height: 50px;"/>
      </div>
        <form action="" @submit.prevent="loginSubmitUserForm">
          <h6 class="form-title">Login</h6>
          <div class="form-group">
            <!-- <label for="email" class="form-label">E-mail</label> -->
            <input
              required
              type="tel"
              id="telefone"
              name="telefone"
              class="user-info-input"
              placeholder="942 963 892"
              v-model="loginSubmitForm.telefone"
            />
          </div>
     
          <div class="password-input">
                <input  required
              
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Senha"
              v-model="loginSubmitForm.password" class="user-info-input" 
                  >
                <span class="password-toggle-btn btn" @click="togglePasswordVisibility">
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </span>
              </div>
              <p class="login-link">
         
            <router-link to="/password" class="cadastre"> Esqueceu senha?</router-link>
          </p>

          <p class="login-link">
            Não tem uma conta cadastrada?
            <router-link to="/register" class="cadastre"> Cadastre aqui.</router-link>
          </p>
          <button @click="submitLoginUser" class="submit-button">Entrar</button>
        </form>
      </div>
      <div class="text-center" style="max-width: 350px;font-size: 12px; margin-top: 40px; color: var(--text-primary-color);">
        Sobre a plataforma <a href="" style="text-decoration: none; color: var(--text-primary-color);">Como funciona</a>
        <p>© 2023 Startic Angola - Todos os direitos reservados.</p>
      </div>
    </div>
  </template>

  <script src="./Login.js">
</script>

  <style scoped>
  .main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    /* height: 100vh; */
    /* background-color: var(--background-color-primary); */
  }
  
  .logo {
    margin-bottom: 20px;
  }
  
  .form-container {
    background-color: var(--background-color-secondary);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: 0 auto;
    text-align: center; /* Centralize o texto */
  }
  
  .form-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
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
  
  .form-label {
    display: block;
    text-align: start;
    margin-bottom: 5px;
    font-size: 12px;
    color: var(--text-primary-color);

  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .login-link {
    font-size: 12px;
    margin-top: 15px;
    color: var(--text-primary-color);

  }
  
  .submit-button {
    width: 100%;
    background-color: #63e5af;
    color: var(--button-primary-color);
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 3px;
    font-size: 12px;
    transition: background-color 0.3s;

  }
  
  .submit-button:hover {
    background-color: #0056b3;
    color: white;
  }
  
  .login-link .cadastre {
    text-decoration: none;
    color: var(--accent-secondary-color);
  }
  
  /* Estilos responsivos */
  @media screen and (max-width: 480px) {
    .main-container {
      padding: 20px; /* Adicione algum espaçamento às margens */
    }
    .logo img {
      width: 40px; /* Reduza o tamanho do logotipo */
      height: 40px;
    }
    .form-container {
      max-width: 100%; /* Faça o formulário ocupar a largura total */
    }
    .form-input,
    .form-label,
    .submit-button {
      font-size: 12px; /* Aumente o tamanho da fonte para telas menores */
    }
    .submit-button {
      padding: 12px 20px; /* Aumente o preenchimento do botão */
    }
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
  



