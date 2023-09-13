<template>
    <div class="main-container">
        <div class="logo"><img src="../../assets/img/logo.png" alt=""
                style="width: 50px; height: 50px; margin-bottom: 30px;"></div>
        <div class="form-container">
            <form action="" @submit.prevent="loginSubmitUserForm">
                <h6 class="form-title">Login</h6>
                <div class="form-group">
                    
                    <label for="name" class="form-label">E-mail</label>
                    <input required type="email" id="email" name="email" class="form-input"
                        placeholder="Digite o seu email..." v-model="loginSubmitForm.email" />
                </div>

                <label for="name" class="form-label">Senha</label>
                <input required type="password" id="password" name="password" class="form-input"
                    placeholder="Digite a sua senha..." v-model="loginSubmitForm.password" />

                <p class="login-link">
                    Não tem uma conta cadastrada?<router-link to="/register" class="cadastre"> Cadastre aqui.</router-link>
                </p>

                <div><button @click="submitLoginUser" class="submit-button">Entrar</button></div>
            </form>
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
    height: 100vh;
    background-color: var(--text-primary-color);
    background: var(--background-color-primary)
}

.logo {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
}

.form-container {
    background-color: var(--background-color-secondary);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    /* ... restante do estilo ... */
    max-width: 400px;
    /* Defina o tamanho máximo do container */
    margin: 0 auto;
    /* Centralize horizontalmente */

}

.form {
    text-align: center;
}

.form-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
    color: var(--text-primary-color);
    text-align: center;
}

.form-input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: .1px solid greenyellow;
    border-radius: 3px;
    font-size: 13px;
    background: var(--background-color-primary);
    color: var(--text-primary-color);

}

.form-label {
    display: block;
    text-align: start;
    margin-bottom: 5px;
    /* Adicione um espaçamento inferior para separar a label */
    font-size: 12px;
    /* Ajuste o tamanho da fonte da label conforme necessário */
    color: var(--text-primary-color);
    /* Ajuste a cor da label conforme necessário */
}

.form-group {
    margin-bottom: 20px;
    /* Adicione um espaçamento inferior entre os campos */
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
    /* font-weight: bold; */
    color: var(--accent-secondary-color);
}
</style>