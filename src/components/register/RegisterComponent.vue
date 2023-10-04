<!-- 
    @utor: Euclides de Carvalho
    data: 15/08/2023
    Component: REGISTER
    Abordagem: Este componente renderiza a pagina de Registro. 
 -->

<template>
    <div class="main-container">
    
    <div class="form-container">
      <div class="logo"><img src="../../assets/img/logo.png" alt="" style="width: 50px; height: 50px; margin-bottom: 20px;"></div>
      <form class="form" @submit.prevent="registerSubmitUserForm">
        <h6 class="form-title">Criar uma conta gratuita</h6>
        <div class="form-group">
          <label for="name" class="form-label">Nome Completo</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            class="form-input"
            placeholder="Joel Modelo"
            v-model="registerForm.name"
          />
          <!-- <label for="name" class="form-label">E-mail</label>
           <input
          required 
          type="email"
          id="email"
          name="email"
          class="form-input"
          placeholder="Digite o seu email válido"
          v-model="registerForm.email"
        /> -->
        <label for="telefone" class="form-label">Whatsapp</label>
        <div class="telefone-index-container">
          <select id="indicativo" class="form-input" style="max-width: 100px; font-size: 11px;" v-model="registerForm.indicativo">
            <option value="244" selected>+244 (AO)</option>
            <option value="351">+351(PT)</option>
            <option value="55">+55 (BR)</option>
            <option value="238">+238 (CV)</option>
            <option value="258">+258 (MO)</option>
            <!-- Adicione mais opções conforme necessário -->
        </select>
           <input
          required 
          type="tel"
          id="telefone"
          name="telefone"
          class="form-input telefone-input "
          placeholder="942 963 892"
          v-model="registerForm.telefone"
        />
        </div>
      
        <label for="validationCode" class="form-label">Código de Validação</label>
        <div class="validation-code-container">
        <input
            required
            type="Number"
            id="validationCode"
            name="validationCode"
            class="form-input validation-code-input"
            placeholder="ST-"
            v-model="registerForm.validationCode"
            :disabled="!isValidationCodeValid"
            :class="{ 'correct': isCodeCorrect, 'incorrect': isCodeIncorrect }"
        />
        <span v-if="!isValidationCodeValid" class="validation-code-button" @click="requestValidationCode" style="font-size: 10px;">Solicitar código pelo WhatsApp</span>
        <span v-else class="validation-code-button" @click="requestConfirmation">Confirmar</span>
    </div>
        <label for="name" class="form-label">Senha</label>
   

        <div class="password-input">
                <input  required
              
                id="password"
                name="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Digite a sua senha"
            class="user-info-input" 
            :disabled="!isSenhaValidation"
            v-model="registerForm.password"
                  >
                <span class="password-toggle-btn btn" @click="togglePasswordVisibility">
                  <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                </span>
              </div>
        <label class="password-hint"> (6 caracteres mínimos)</label>    

        </div>
      
        
        <p class="terms">
          Ao se inscrever, você concorda com os <router-link to="/" class="service-policy">Termos de Serviço</router-link> e a <router-link to="/" class="service-policy">Política de Privacidade</router-link> 
        </p>
        <p class="login-link">
          Já tem uma conta? <router-link to="/" class="cadastre"> Conecte-se</router-link>
        </p>
        <button @click="submitRegisterUser" :disabled="!isSenhaValidation" class="submit-button">Inscrever-se</button>
      </form>
    </div>
  </div>
  </template>
  

<script src="./Register.js">
</script>


<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: 100vh; */
  /* background: var(--background-color-primary); */
  font-family: 'Montserrat', sans-serif;
  padding: 20px;
font-family: 'Open Sans', sans-serif;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

.form-container {
  /* background-color: #fff; */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
 
  /* ... restante do estilo ... */
  max-width: 400px; /* Defina o tamanho máximo do container */
  margin: 0 auto; /* Centralize horizontalmente */
  background: var(--background-color-secondary);
}

.form {
  text-align: center;
}

.form-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
  color: var(--text-primary-color) ;
}

.form-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: .1px solid green;
  border-radius: 3px;
  font-size: 13px;
  background: var(--background-color-primary);
  color: var(--text-primary-color);
}
.form-label {
  display: block;
  text-align: start;
  margin-bottom: 5px; /* Adicione um espaçamento inferior para separar a label */
  font-size: 12px; /* Ajuste o tamanho da fonte da label conforme necessário */
  color: var(--text-primary-color); /* Ajuste a cor da label conforme necessário */
}

.form-group {
  margin-bottom: 20px; /* Adicione um espaçamento inferior entre os campos */
}
.password-hint {
  display: block;
  text-align: start;
  font-style: italic;
  font-size: 10px;
  color: #999;
}

.terms {
  font-size: 12px;
  margin-top: 20px;
  color: var(--text-primary-color);
}

.login-link {
  font-size: 12px;
  margin-top: 15px;
  text-decoration: none;
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
.cadastre{
  text-decoration: none;
  color: var(--accent-secondary-color);
}
.service-policy{
  text-decoration: none;
  color: var(--accent-secondary-color);
}

.validation-code-container {
  display: flex;
  align-items: center;
}

.telefone-index-container {
  display: flex;
  align-items: center;
}

.validation-code-input {
  /* flex: 1; */
  margin-right: 10px;
  max-width: 140px;
}
.telefone-input {
  /* flex: 1; */
  margin-left: 10px;
}
.validation-code-button {
  background-color: #63e5af;
  color: var(--button-primary-color);
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 3px;
  height: 100%;
  font-size: 12px;
  transition: background-color 0.3s;
}

.validation-code-button:hover {
  background-color: #0056b3;
  color: white;
}

.submit-button:disabled {
  background-color: #ccc; /* Altere a cor de fundo para indicar que o botão está desativado */
  cursor: not-allowed; /* Altere o cursor para indicar que o botão está desativado */
}

.correct {
    color: green;
    animation: fadeIn 0.5s ease-in-out;
}

.incorrect {
    color: red;
    animation: fadeIn 0.5s ease-in-out;
}
  
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
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