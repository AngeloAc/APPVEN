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
              type="email"
              id="email"
              name="email"
              class="form-input"
              placeholder="Email do usuario"
              v-model="loginSubmitForm.email"
            />
          </div>
          <div class="form-group">
            <!-- <label for="password" class="form-label">Senha</label> -->
            <input
              required
              type="password"
              id="password"
              name="password"
              class="form-input"
              placeholder="Senha"
              v-model="loginSubmitForm.password"
            />
          </div>
          <p class="login-link">
            Não tem uma conta cadastrada?
            <router-link to="/register" class="cadastre"> Cadastre aqui.</router-link>
          </p>
          <button @click="submitLoginUser" class="submit-button">Entrar</button>
        </form>
      </div>
      <div class="text-center" style="max-width: 350px;font-size: 12px; margin-top: 40px; color: var(--text-primary-color);">
        Sobre a plataforma <a href="" style="text-decoration: none; color: var(--text-primary-color);">Como funciona</a>
        <p>© 2022 - 2023 startic Angola - Todos os direitos reservados.</p>
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
  </style>
  



