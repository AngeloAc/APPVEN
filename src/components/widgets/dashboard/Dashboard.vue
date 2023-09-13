<template>
    <div class="main-content">


        <div class="row mt-4">

            <h5>Bem-vindo a STARTIC <i class="bi bi-star"></i></h5>
            <p style="font-size: 14px;">Conecte suas páginas de negócios do WhatsApp, faça seus codigos com ajuda de
                inteligência artificial e melhore seus conhecimentos com o nosso chat STARTIC.</p>



            <!-- whatsapp code ...  -->
            <div class="col-md-4">
                <div class="card border-0 shadow">
                    <div>

                        <div class="progress-bar">
                            <div class="progress" :style="{ width: progress + '%' }"></div>
                        </div>

                        <!-- <button @click="startInstallation">Start Installation</button> -->
                    </div>
                    <div class="card-body text-center">
                        <div class="py-3">
                            <i class="bi bi-whatsapp" style="font-size: 40px;"></i>
                        </div>
                        <div>
                            <div class="mb-2">
                                <h6 class="h5">WhatsApp</h6>
                                <p v-if="usuario_conectado === true" class="badge bg-success">Conectado</p>
                                <p v-else class="badge bg-black">Offline</p>
                            </div>
                            <p class="small">WhatsApp Web QR (integração não oficial)</p>
                            <p class="small">Conecte sua conta do WhatsApp digitalizando seu código QR da Web. <a
                                    style="color: green; font-weight: bold; cursor: pointer;" @click="callScript"> Crie
                                    sua base de conhecimento.</a></p>
                        </div>
                    </div>
                    <div class="card-footer text-end" style="display: flex; justify-content: space-between;">
                        <p style="font-size: 10px;">{{ progress }}%</p>
                        <button class="btn btn-outline-secondary btn-sm" @click="callInstallWhatsapp">
                            <span v-show="app_status === 'install'"><i class="bi bi-hdd"></i> Instalar</span>
                            <span v-show="app_status === 'connect'"><i class="bi bi-power"></i> Conectar</span>
                            <span v-show="app_status === 'edit'"><i class="bi bi-power"></i> Desconectar</span>
                            <span v-show="app_status === 'refresh'"><i class="bi bi-power"></i> Atualizar</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- end whatsapp code ..  -->

            <!-- programmer code ...  -->
            <div class="col-md-4">
                <div class="card border-0 shadow">
                    <div class="card-body text-center">
                        <div class="py-3">

                            <i class="bi bi-terminal" style="font-size: 40px;"></i>
                        </div>
                        <div>
                            <div class="mb-2">
                                <h6 class="h5">Maker Code</h6>
                                <p class="badge bg-black">Free</p>
                            </div>
                            <p class="small">Programador AI</p>
                            <p class="small">Instale o seu programador e faça codigos simples e rapidos com a nossa AI.
                            </p>
                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-outline-secondary btn-sm" @click="makeCode"
                            style="background: green; color: white">
                            <span><i class="bi bi-power"></i> Começar</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- end programmer code ..  -->

            <!-- facebook code ...  -->
            <div class="col-md-4">
                <div class="card border-0 shadow">
                    <div class="card-body text-center">
                        <div class="py-3">
                            <i class="bi bi-chat" style="font-size: 40px;"></i>
                        </div>
                        <div>
                            <div class="mb-2">
                                <h6 class="h5">Chat </h6>
                                <p class="badge bg-black">Free</p>
                            </div>
                            <p class="small">Messager</p>
                            <p class="small">Conecte sua conta do Messager digitalizando seu código QR da Web.</p>
                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-outline-secondary btn-sm" @click="callChat"
                            style="background: green; color: white">
                            <span><i class="bi bi-power"></i> Começar</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- end whatsapp code ..  -->

            <!-- telegram code ...  -->
            <div class="col-md-4">
                <div class="card border-0 shadow">
                    <div class="card-body text-center">
                        <div class="py-3">
                            <i class="bi bi-camera" style="font-size: 40px;"></i>
                        </div>
                        <div>
                            <div class="mb-2">
                                <h6 class="h5">Image Generator</h6>
                                <p class="badge bg-black">free</p>
                            </div>
                            <p class="small">BOT IMAGE AI</p>
                            <p class="small">Conecte sua conta do Telegram digitalizando seu código QR da Web.</p>
                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-outline-secondary btn-sm" disabled>
                            <!-- <span v-show="app_status === 'install'"><i class="bi bi-hdd"></i> Instalar</span> -->
                            <span><i class="bi bi-power"></i> Começar</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- end telegram code ..  -->

            <!-- Instagram code ...  -->
            <div class="col-md-4">
                <div class="card border-0 shadow">
                    <div class="card-body text-center">
                        <div class="py-3">
                            <i class="bi bi-instagram" style="font-size: 40px;"></i>
                        </div>
                        <div>
                            <div class="mb-2">
                                <h6 class="h5">Instagram</h6>
                                <p class="badge bg-success">Conectado</p>
                            </div>
                            <p class="small">Instagram Messager</p>
                            <p class="small">Conecte sua conta do Instagram digitalizando seu código QR da Web.</p>
                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-outline-secondary btn-sm" @click="callInstallWhatsapp" disabled>
                            <span v-show="app_status === 'install'"><i class="bi bi-hdd"></i> Instalar</span>
                            <span v-show="app_status === 'connect'"><i class="bi bi-power"></i> Conectar</span>
                            <span v-show="app_status === 'edit'"><i class="bi bi-power"></i> Desconectar</span>
                            <span v-show="app_status === 'refresh'"><i class="bi bi-power"></i> Atualizar</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- end instagram code ..  -->

            <!-- x code ...  -->
            <div class="col-md-4">
                <div class="card border-0 shadow">
                    <div class="card-body text-center">
                        <div class="py-3">
                            <i class="bi bi-twitter" style="font-size: 40px;"></i>
                        </div>
                        <div>
                            <div class="mb-2">
                                <h6 class="h5">X</h6>
                                <p class="badge bg-success">Conectado</p>
                            </div>
                            <p class="small">X Messager</p>
                            <p class="small">Conecte sua conta do X Twitter digitalizando seu código QR da Web.</p>
                        </div>
                    </div>
                    <div class="card-footer text-end">
                        <button class="btn btn-outline-secondary btn-sm" @click="callInstallWhatsapp" disabled>
                            <span v-show="app_status === 'install'"><i class="bi bi-hdd"></i> Instalar</span>
                            <span v-show="app_status === 'connect'"><i class="bi bi-power"></i> Conectar</span>
                            <span v-show="app_status === 'edit'"><i class="bi bi-power"></i> Desconectar</span>
                            <span v-show="app_status === 'refresh'"><i class="bi bi-power"></i> Atualizar</span>
                        </button>
                    </div>
                </div>
            </div>
            <!-- end x code ..  -->

            <!-- Outros code ...  -->
            <!-- <div class="col-md-4">
                    <div class="card border-0 shadow">
                        <div class="card-body text-center">
                            <div class="py-3">
                                <i class="bi bi-gear" style="font-size: 40px;"></i>
                            </div>
                            <div>
                                <div class="mb-2">
                                    <h6 class="h5">GEAR</h6>
                                    <p v-if="usuario_conectado === true" class="badge bg-success">Conectado</p>
                                </div>
                                <p class="small">WHATSAPP FOR MIKROTIK</p>
                                <p class="small">Conecte sua conta do WhatsApp digitalizando seu código QR da Web.</p>
                            </div>
                        </div>
                        <div class="card-footer text-end">
                            <button class="btn btn-outline-secondary btn-sm" @click="callInstallWhatsapp">
                                <span v-show="app_status === 'install'"><i class="bi bi-hdd"></i> Instalar</span>
                                <span v-show="app_status === 'connect'"><i class="bi bi-power"></i> Conectar</span>
                                <span v-show="app_status === 'edit'"><i class="bi bi-power"></i> Desconectar</span>
                                <span v-show="app_status === 'refresh'"><i class="bi bi-power"></i> Atualizar</span>
                            </button>
                        </div>
                    </div>
                </div> -->
            <!-- end outros code ..  -->

        </div>
    </div>

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
                            <p v-else class="m-0">Aponte a camera do seu telefone no codigo QR</p>
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
            code_status: 'install',
            usuario_conectado: false,
            progress: 0,
            installationInterval: null,
        };
    },
    methods: {
        async User() {


            const _token = localStorage.getItem('jwt');
            const token = vuejwtdecode.decode(_token);


            const user = await getInfo.getUser(token._id);

            if (user.addons[0].status === "install") {
                this.app_status = "install";
                // console.log("STATE OF THE BUTON " + this.app_status);

            } else if (user.addons[0].status === "connect") {
                this.app_status = "connect";
                // console.log("STATE OF THE BUTON " + this.app_status);
            }
            else if (user.addons[0].status === "edit") {
                this.app_status = "edit";
                this.usuario_conectado = true;
                // console.log("STATE OF THE BUTON " + this.app_status);
            } else {
                this.app_status = "refresh";
            }

        },

        async saaveStatus(auth) {
            const _token = localStorage.getItem('jwt');
            const token = vuejwtdecode.decode(_token);
            if (auth === true) {
                // const user_addons = await getInfo.updateAddons(token._id, { status: 'edit' })
                const connect = await whatsappweb.connect(token);
                this.usuario_conectado = true;
                this.app_status = "edit";
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


        async callInstallWhatsapp() {

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
                    swal({
                        title: "Instalado com sucesso!",
                        text: "instado!",
                        icon: 'success'
                    });
                }, 2000);



            } else if (this.app_status === 'connect') {
                console.log('ws' + token.porta)


                try {

                    const ws = new WebSocket(`ws://localhost:${porta_test}`);
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
                await gerirWhatsappService.desconnect(porta_test);
                await getInfo.updateAddons(token._id, { status: 'connect' })
                this.usuario_conectado = false;
                this.app_status = "connect";

            }
        },
        callScript() {
            this.$router.push('/hosts');
        },
        makeCode() {
            this.$router.push('/codejava');
        },
        callChat() {
            this.$router.push('/chat');
        },
    },
    created() {

        this.User();

    }
}
</script>

<style scoped>
/* ...código anterior do estilo da Sidebar... */

.main-content {
    margin-top: 0px;
    padding: 20px;
    margin-left: 60px;
    margin-right: 10px;
    margin-bottom: 10px;
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
</style>