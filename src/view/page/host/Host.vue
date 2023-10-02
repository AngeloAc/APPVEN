<template>
 
        <Hosts />
        <!-- <navBarApp /> -->
        <div class="main-content">
            <div class="container">
                <!-- Conteúdo do Dashboard "script" -->

                <router-link to="/script">
                    <a class="btn link-add">+ Adicionar novo script</a>
                </router-link>
                <div>
                    <h3>Scripts AI</h3>
                    <p style="font-size: 14px;">Exclusivo para o seu whatsapp, crie um bot que possui inteligencia artificial. Para funcionar tens de conectar o seu whatsapp.</p>
                </div>



                <div class="row" style="display: flex; align-items: center; justify-content: center;">
                    <div class="text-center" v-if="showCard === false">
                        <img src="../../../assets/img/list.png" alt="" style=" width: 200px; height: 150px;">
                        <div>
                            <p class="text-center" style="font-size: 12px;">Não tens nenhum script criado, crie e permita que os seus clientes sejam respondidos no tempo certo por uma inteligencia artificial.</p>
                        </div>
                    </div>

                    <!-- CARD 1  -->
                    <div class="col-md-6 mt-5 " v-if="showCard === true">
                        <div class="card" style="border: 1px solid gray; border-radius: 20px;">
                            <div class="card-header">
                                <p class="card-title" style="font-size: 12px;">Script AI</p>
                            </div>
                            <div class="card-body text-center">
                                <div class="row">
                                    <div class="col-2">
                                        <img src="../../../assets/img/bot.png"
                                            style="background: white; padding: 5px; width: 50px; height: 50px; border-radius: 50%; border: .1px solid gray; object-fit: contain;"
                                            alt="">

                                    </div>
                                    <div class="col-10 text-start">
                                        <h6>{{ this.cardData.title }}</h6>
                                        <p style="font-size: 12px;">App ID: 9990</p>
                                    </div>
                                </div>
                                <div class="row pt-4">
                                    <div class="col-6 text-start" style="font-size: 12px;">0% of limit used</div>
                                    <div class="col-6 text-end">
                                        <button class="btn link-aboutScript" style="font-size: 12px;" @click="aboutScript">Saber mais</button></div>
                                </div>
                                <div class="text-start mt-2">
                                    <div class="d-flex align-items-center" style="">
                                        <input type="range" name="" id="" value="0" maxlength="100">
                                        <span class="p-lg-2" style="font-size: 12px;"> 100% Remaining</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!--START Modal para a criação de chat -->
                
           <div class="modal modal-overlay" tabindex="-1" role="dialog" :class="{ 'show': showModal, 'd-block': showModal }">
            <div class="modal-dialog" role="document">
                <div class="modal-content shadow-lg">
                    <div class="modal-header">
                        <h6 class="modal-title">Seu Script </h6>
                        <!-- <i class="bi bi-pencil" style="margin-left: 10x; padding-left: 10px; padding-right: 10px; cursor: pointer;"></i> -->
                        <button class="btn-close bg-white" @click="showModal = false" style=""></button>
                    </div>
                    <div class="modal-body">
                        <h6>{{ this.cardData.title }}</h6>
                        <p>{{ this.cardData.text }}</p>
                    </div>
                </div>
            </div>
           </div>
            <!--END Modal para a criação de chat -->
            </div>
        </div>
  
</template>

<script>
import Hosts from '../../../components/widgets/host/Host.vue'
import getInfo from '../../../services/getInfo';
import vuejwtdecode from 'vue-jwt-decode';
import navBarApp from '../../../components/widgets/navBarApp/navbarApp.vue';

export default {
    data() {
        return {
            cardData: {
                title: null,
                text: null,
                _id: ''
            },
            showCard: false,
            showModal: false,
        };
    },
    components: {
        Hosts,
        navBarApp,
    },
    methods: {
        async getCard() {
            try {
                const token = localStorage.getItem('jwt');
                const _token = vuejwtdecode.decode(token);
                const data = await getInfo.getScript(token, _token._id)
                    .then(res => {                        
                        if(res.user.script[0] === undefined){
                            return;
                        }else{
                            this.cardData = res.user.script[0];
                            this.showCard = true;
                        }
                    })


            } catch (error) {

            }
        },
        aboutScript(){
            this.showModal = true;
        }
    },
    created() {

        this.getCard();
    },
}
</script>

<style scoped>
/* ...código anterior do estilo da Sidebar... */

.main-content {
    margin-top: 20px;
    padding: 20px;
    margin-left: 55px;
    color: var(--text-primary-color);
}
.container{
    margin: 0px;
}

.link-add {
    border: .1px solid var(--accent-secondary-color);
    color: var(--text-primary-color);
    font-size: 13px;
    margin-bottom: 20px;
}
.link-add:hover{
    background: var(--accent-color);
    color: white;
}

.card {
    margin-bottom: 20px;
    background: var(--background-color-primary);
    color: var(--text-primary-color);
}

.chart {
    height: 400px;
}

.link-aboutScript {
    color: var(--text-primary-color);
    border: .1px solid var(--accent-secondary-color);
}
.link-aboutScript:hover {
    background: var(--accent-color);
}
.modal-content {
    background: var(--background-color-secondary);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Fundo translúcido */
  justify-content: center;
  align-items: center;
  z-index: 9999;
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
.container{
    margin-left: 0px;
}

/* Outros estilos para telas menores (como no código anterior) */
}

@media (min-width: 768px) {


}
</style>



