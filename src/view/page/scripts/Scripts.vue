<template>
    <div>
        <ScriptsComponents />
        <!-- <navBarApp /> -->
        <div class="main-content p-5">

            <div class="container p-4 shadow-lg" style="border: 1px solid gray; border-radius: 20px;">
                <!-- Conteúdo do Dashboard "script" -->
                <div class="d-flex" style="justify-content: space-between;">
                    <h5>Criar base de conhecimento</h5>
                    <span class="btn-close bg-white" @click="fechar" style="cursor: pointer;"></span>
                </div>
                <div>
                    <form action="" @submit.prevent="submitFormSript">
                        <h6 style="padding-top: 5px;">Titulo</h6>
                        <p style="font-size: 10px;">Este é o nome do aplicativo que será exibido na página Meus aplicativos e associado ao ID do seu aplicativo. Você pode alterar o nome posteriormente em Configurações.</p>
                        <input required name="title" id="title" placeholder="Escreva um titulo..." v-model="submitFormSriptData.script.title" type="text" class="form-control">
                        <h6 style="padding-top: 5px;">Descrição</h6>
                        <p style="font-size: 10px;">Seja especifico e cuidadoso na descrição, porque o seu bot usará para responder os seus clientes por meio dela. </p>
                        <textarea required name="text" id="text" placeholder="Escreva o guia para o seu bot..." v-model="submitFormSriptData.script.text" class="form-control " >
                    </textarea>
                        <!-- <div>upload .pdf .txt</div> -->
                        <div class="pt-4">
                            <button class="btn" @click="submitScript()"> <i class="bi bi-plus"></i>
                                Criar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ScriptsComponents from '../../../components/scripts/ScriptsComponents.vue';
import navBarApp from '../../../components/widgets/navBarApp/navbarApp.vue';
import addScript from '../../../services/addScript';
import vuejwtdecode from 'vue-jwt-decode';
import swal from 'sweetalert';

export default {
    data() {
        return {
            submitFormSriptData: {
                script: {
                    title: null,
                    text: null
                }
            }
        }
    },
    components: {
        ScriptsComponents,
        navBarApp,
    },
    methods: {
        submitFormScript() {

        },
        async submitScript() {
            try {
                const token = localStorage.getItem('jwt');
                const _token = vuejwtdecode.decode(token);
                await addScript.script(token, _token._id, this.submitFormSriptData);
                // todo: err em campos vazios.
                this.$router.push('/hosts');
                
            } catch (error) {
                swal({
                    title: "Ooops!",
                    text: "Erro processar o teu token.",
                    icon: 'error'
                })
            }

        },
        fechar(){
            console.log('fechar')
            this.$router.push('/hosts');
        }

    },
}
</script>

<style scoped>
/* ...código anterior do estilo da Sidebar... */

.main-content {
    margin-top: 0px;
    margin-left: 60px;

}

.card {
    margin-bottom: 20px;
    background: var(--background-color-primary);
    color: var(--text-primary-color);
}
.container {
    background: var(--background-color-primary); 
    width: 550px;
}
.form-control {
background: var(--background-color-secondary);
                    border: .5px solid var(--accent-secondary-color); 
                    color: var(--text-primary-color); 
                    padding: 7px;
}
.btn {
    color: var(--text-primary-color);
    border: 1px solid var(--accent-secondary-color)
}
.btn:hover {
    background: var(--accent-color);
    
}

@media (max-width: 768px) {

/* Estilos para a App Bar em telas menores */
.main-content {
    /* margin-top: 20px; */
    padding: 20px;
    margin-left: 0px;
    margin-top: 50px;
    color: var(--text-primary-color);
}
.container {
    background: var(--background-color-primary); 
    width: 100%
}

/* Outros estilos para telas menores (como no código anterior) */
}

@media (min-width: 768px) {


}
</style>