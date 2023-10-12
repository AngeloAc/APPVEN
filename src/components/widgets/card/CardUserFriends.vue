<!-- APPCARD  -->



  
  
<script>
export default {
    props: {
        userImage: String,
        username: String,
        status: String,
        progress: Number,
        headerDescription: String,
        bodyDescription: String,
        buttonText: String,
    },
    data() {
        return {
            description: '',
        };
    },
    methods: {
        buttonAction() {
            this.$emit('buttonAction');
        },
        href_Action() {
            this.$emit('href_Action');
        },
        openApp() {
            // Implementar a lógica para abrir o aplicativo
        },
    },
    created() {
        // Definir a descrição com base no título do aplicativo
        this.description = this.title === 'WhatsApp' ? 'Crie sua base de conhecimento.' : 'Aprender mais...';
    },
};
</script>
  
<template>
    <div class="app-card">
        <div class="card shadow">
            <div class="card-body text-center">
                <img :src="userImage" alt="" class="card-image">
                
            </div>
            <span style="font-size: 10px; padding-left: 15px; font-weight: bold;">{{ username }}</span>
            <div class="card-footer" style="border: none;">
                <button class="btn btn-outline-secondary btn-sm" @click="buttonAction">
                    <span style="font-size: 10px;">Dar um toque</span>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.app-card {
    margin: 3px;
    min-width: 150px;
    height: 250px; /* Defina uma altura fixa para o card */
}

.card {
    background: var(--background-color-primary);
    color: var(--text-primary-color);
    border-radius: 12px;
    border: 1px solid green;
    height: 100%; /* Faça o card ocupar 100% da altura do pai (app-card) */
}

.card-image {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    object-fit: cover; /* Garante que a imagem preenche completamente o espaço do card sem distorções */
}

.btn {
    border-radius: 20px;
    color: var(--text-primary-color);
    border: 1px solid var(--accent-color);
}
</style>
  