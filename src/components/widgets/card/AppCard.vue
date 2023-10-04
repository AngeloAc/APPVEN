<!-- APPCARD  -->

<template>
    <div class="app-card">
        <div class="card shadow">
            <div class="card-body text-center">
                <div class="py-3">
                    <i :class="myIcon" style="font-size: 25px;"></i>
                </div>
                <h6 class="card-title">{{ title }}</h6>
                <p class="badge bg-black">{{ status }}</p>
                <p class="card-text">{{ headerDescription }}</p>
                <p class="card-text">{{ bodyDescription }}</p>
                <!-- <p class="description" @click="href_Action"> {{ description }}</p> -->
          

            </div>

            <div class="card-footer" style="border: none;">
                <button class="btn btn-outline-secondary btn-sm" @click="buttonAction" >
                    <span><i class="bi bi-power" ></i> {{ buttonText }}</span>
                </button>
            </div>
        </div>
    </div>


</template>

  
  
<script>
export default {
    props: {
        myIcon: String,
        title: String,
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
  
<style scoped>
.app-card {
    /* margin-bottom: 20px; */
    margin: 10px;
    min-width: 150px;
}

.card {
    /* margin-bottom: 20px; */
    background: var(--background-color-primary);
    color: var(--text-primary-color);
    border-radius: 20px;
    border: 1px solid gray;
}

.card-title {
    font-size: 13px;
    font-weight: bold;
    color: var(--text-primary-color);
}

.card-text {
    font-size: 12px;
    color: var(--text-primary-color);
}

.progress {
    margin-top: 10px;
}

.badge {
    font-size: 12px;
}

.card-body .description {
    cursor: pointer;
    color: var(--text-primary-color);
    font-size: 12px;
}
.btn{
    border-radius: 20px;
    color: var(--text-primary-color);
    border: 1px solid var(--accent-color);
    font-size: 12px;
    width: 100%;
}
</style>
  