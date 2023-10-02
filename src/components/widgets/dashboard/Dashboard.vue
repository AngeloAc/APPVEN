<template>


<div class="main-content">
        <div class="row">

            <h6 style="padding-left: 25px;">Bem-vindo a STARTIC <i class="bi bi-star"></i></h6>
            <p style="font-size: 14px; padding-left: 25px;">Conecte suas páginas de negócios do WhatsApp, faça seus codigos com ajuda de
                inteligência artificial e melhore seus conhecimentos com o nosso chat STARTIC.</p>


            <!-- whatsapp code ...  -->
            <div class="col-md-4">
                <AppCard myIcon="bi bi-whatsapp" title="WhatsApp" :status="code_status"
                    headerDescription="WhatsApp Web QR (integração não oficial)"
                    bodyDescription="Conecte o seu WhatsApp usando seu código QR da Web." :buttonText="buttonText"
                    @buttonAction="callInstallWhatsapp" @href_Action="callScript" />
            </div>
            <!-- end whatsapp code ..  -->



            <!-- CHAT RPRO MAX ...  -->
            <div class="col-md-4">
                <AppCard myIcon="bi bi-chat-left-dots" title="Chat RPRO-MAX" status="free" headerDescription="RPRO - I4"
                    bodyDescription="Diverte-te com o chat RPRO baseado no chatGPT" buttonText="Abrir"
                    @buttonAction="callChat" />
            </div>
            <!-- end CHAT RPRO MAX ...  -->

            <!-- programmer code ...  -->
            <div class="col-md-4">
                <AppCard myIcon="bi bi-terminal" title="AI Programador" status="free" headerDescription="stark - K9"
                    bodyDescription="Comece gerando codigos de computador com a Stark - k9" buttonText="Abir"
                    @buttonAction="callStartK9" />
            </div>
            <!-- end programmer code ..  -->

            <!-- CHAT RPRO MAX ...  -->
            <!-- <div class="col-md-4">
                <AppCard myIcon="bi bi-calculator" title="Calculadora AI" status="free" headerDescription="CENTI - A7"
                    bodyDescription="CENTI - A7, ideal para os seus cálculos matemáticos." buttonText="Abrir" />
            </div> -->
            <!-- end CHAT RPRO MAX ...  -->

        </div>
    </div>


<div class="app-dash">

    <div class="avatar-list">
        
        <AppCard myIcon="bi bi-chat-left-dots" title="Chat"
            buttonText="Abir"
            @buttonAction="callChat" />

            <AppCard myIcon="bi bi-terminal" title="AI Programador"
            buttonText="Abir"
            @buttonAction="callStartK9" />

            <AppCard myIcon="bi bi-whatsapp"  title="Whatsapp"
            :buttonText="buttonText"
            @buttonAction="callInstallWhatsapp" />
        
            <!-- <AppCard myIcon="bi bi-calculator"  title="AI Calculadora"
            buttonText="Brevemente"
            />
     -->
     </div>
</div>

<!-- <div class="app-dash">
<div class="avatar-list">
    <div v-for="(user, index) in arrayUsers" :key="index">
        <CardUserFriends userImage="src/assets/img/lady1.jpg" :username="user"/>
    </div>
    
   
  


 </div>
</div> -->




    <!--START Modal para a criação de chat -->
    <div class="modal modal-overlay" tabindex="-1" role="dialog" :class="{ 'show': showModal, 'd-block': showModal }">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content shadow-lg" style="background: gray; color: #fff;">
                <div class="modal-header">
                    <h6 class="modal-title">WhatsApp Web QR (integração não oficial)</h6>
                    <button class="btn-close text-white" @click="showModal = false"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center p-4">
                        <div class="d-flex align-items-center justify-content-center rounded-lg p-4"
                            style="background-color: rgba(255, 255, 255, 0.05); box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);">
                            <img v-if="dataQrcode.qrCode !== null" id="qrcode" :src="dataQrcode.qrCode" alt="QR Code"
                                class="qrcodeImg img-fluid">
                            <div v-else style="font-size: 12px;">
                                <p class="m-0">Aponte a camera do seu telefone no codigo QR... Aqui!</p>
                                <p class="m-0">1. Caso não tem dinheiro da sua conta, vai em <a href="/pagamento" style="text-decoration: none; color: black;">Pagamentos</a></p>
                                <p  class="m-0">2. Em caso, de levar muito tempo para obter o QR code, <a href="" style="text-decoration: none; color: black;">informe ao suporte.</a></p>
                            
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!--END Modal para a criação de chat -->
    </div>
</template>

<script>
import getInfo from '../../../services/getInfo';
import vuejwtdecode from 'vue-jwt-decode';
import whatsappweb from '../../../services/whatsappwebService';
import gerirWhatsappService from '../../../services/gerirWhatsappService';
import swal from 'sweetalert';
import AppCard from '../card/AppCard.vue'
import CardUserFriends from '../card/CardUserFriends.vue';

export default {
    data() {
        return {
            cardData: {
                title: null,
                text: null,
            },
            dataQrcode: {
                qrCode: null,
                auth: false,

            },
            showModal: false,
            app_status: null,
            buttonText: 'Instalar',
            code_status: 'offline',
            usuario_conectado: false,
            progress: 0,
            installationInterval: null,
            arrayUsers: []
        };
    },
    methods: {
        async User() {


            const _token = localStorage.getItem('jwt');
            const token = vuejwtdecode.decode(_token);


            const user = await getInfo.getUser(token._id);

            if (user.addons[0].status === "install") {
                this.app_status = "install";
                this.buttonText = "Instalar"

                // console.log("STATE OF THE BUTON " + this.app_status);

            } else if (user.addons[0].status === "connect") {
                this.app_status = "connect";
                this.buttonText = "Conectar"
                // console.log("STATE OF THE BUTON " + this.app_status);
            }
            else if (user.addons[0].status === "edit") {
                this.app_status = "edit";
                this.buttonText = "Desconectar";
                this.usuario_conectado = true;
                // console.log("STATE OF THE BUTON " + this.app_status);
            } else {
                this.app_status = "Actualizar";
            }

        },

        async getAllUsers(){
           const users = await getInfo.getAllusers();
           this.arrayUsers = users.data;
         
        },

        async saaveStatus(auth) {
            const _token = localStorage.getItem('jwt');
            const token = vuejwtdecode.decode(_token);
            if (auth === true) {
                // const user_addons = await getInfo.updateAddons(token._id, { status: 'edit' })
                const connect = await whatsappweb.connect(token);
                this.usuario_conectado = true;
                this.app_status = "edit";
                this.buttonText = 'Desconectar';
                this.showModal = false;

            }
        },

        startInstallation() {
            // Simulate the installation process
            this.progress = 0;
            this.installationInterval = setInterval(() => {
                if (this.progress < 100) {
                    this.progress += 1; // Increase the progress by 10% (adjust as needed)
                } else {
                    clearInterval(this.installationInterval);
                    // alert('Installation completed!');
                }
            }, 1000); // Update every 1 second (adjust as needed)
        },

        // async callInstallWhatsapp() {
        //     console.log('i am installing 90')
        // },
        async callInstallWhatsapp() {
            console.log('install')
            const _token = localStorage.getItem('jwt');
            const token = vuejwtdecode.decode(_token);
            let porta_test = token.porta;
            // porta_test = 3000;
            // console.log(token.porta)

            if (this.app_status === 'install') {
                console.log('comecei a instalacao')



                const res = await whatsappweb.install(token);
                this.progress = 0;
                this.installationInterval = setInterval(() => {
                    if (this.progress < 100) {
                        this.progress += 1; // Increase the progress by 10% (adjust as needed)
                    } else {
                        clearInterval(this.installationInterval);
                        // alert('Installation completed!');
                    }
                }, 1000); // Update every 1 second (adjust as needed)
                setTimeout(() => {
                    this.app_status = "connect";
                    this.buttonText = "Conectar"
                    swal({
                        title: "Instalado com sucesso!",
                        text: "instado!",
                        icon: 'success'
                    });
                }, 2000);



            } else if (this.app_status === 'connect') {
                console.log('ws' + token.porta)


                try {

                    const ws = new WebSocket(`ws://104.255.216.215:${porta_test}`);
                    // // Lidar com eventos de mensagem recebida do servidor
                    ws.addEventListener('message', async (event) => {
                        const data = JSON.parse(event.data);
                        this.dataQrcode = data;

                        // this.dataQrcode.auth = true; 
                        await this.saaveStatus(data.auth);

                    });




                    this.showModal = true;

                    setTimeout(async () => {
                        const _token = localStorage.getItem('jwt');
                        const token = vuejwtdecode.decode(_token);
                        if (this.dataQrcode.auth === true) {
                            // const user_addons = await getInfo.updateAddons(token._id, { status: 'edit' })
                            const connect = await whatsappweb.connect(token);
                            this.usuario_conectado = true;
                            this.app_status = "edit";
                            this.showModal = false;

                        } else {
                            ws.close();
                            console.log('Event close...');
                            this.showModal = false;
                        }


                    }, 120000);
                    // const res = await gerirWhatsappService.getQRCODE('3000');
                    // this.dataQrcode = res;
                    // console.log(res)
                } catch (error) {
                    console.log(error)
                }


            }

            else if (this.app_status === 'edit') {
                // await gerirWhatsappService.desconnect(porta_test);
                // await getInfo.updateAddons(token._id, { status: 'connect' })
                // this.usuario_conectado = false;
                // this.app_status = "connect";
                this.callScript()
            }
        },

        callScript() {
            this.$router.push('/hosts');
        },
        callStartK9() {
            this.$router.push('/codejava');
        },
        callChat() {
            this.$router.push('/chat');
        },
        callImageAI() {
            this.$router.push('/images');
        },
    },
    mounted() {
        this.getAllUsers();
    },
    created() {
        this.User();
    },
    components: {
        AppCard,
        CardUserFriends
    },
}
</script>

<style scoped>
/* ...código anterior do estilo da Sidebar... */

.app-dash{
    margin-top: 55px;
}

.main-content {
    padding: 20px;
    margin-right: 10px;
    margin-bottom: 10px;
    margin-top: 10px;


    color: var(--text-primary-color);
}

.card {
    margin-bottom: 20px;
    background: var(--background-color-primary);
    color: var(--text-primary-color);
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

.progress-bar {
    /* width: 500px; */
    height: 2px;
    background-color: #ccc;
    border-radius: 10px;
}

.progress {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.5s;
}

@media (max-width: 768px) {

    /* Estilos para a App Bar em telas menores */
    .main-content {
        margin-top: 50px;
    }


    /* Outros estilos para telas menores (como no código anterior) */
}

@media (min-width: 768px) {
    .main-content {
        margin-left: 50px;
    }

}

.avatar-list {
    display: flex;
    overflow-x: auto;
    padding: 10px;
}

.avatar-item {
    margin-right: 10px;
}

.avatar-image {
    width: 50px;
    /* Defina a largura desejada para os avatares */
    height: 50px;
    /* Defina a altura desejada para os avatares */
    border-radius: 50%;
}

:where(.avatar-list)::-webkit-scrollbar {
    width: 0px;
}

@media (max-width: 768px) {
    .main-content{
        display: none;
    }
}

@media (min-width: 768px) {
    .app-dash{
        display: none;
    }
}

</style>