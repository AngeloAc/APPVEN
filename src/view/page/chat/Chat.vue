<template>
    <div class="chat-home">


        <ChatComponent />
        <div class="chat-container shadow-lg">
            <!-- START Side bar contendo todos os chats do usuario...  -->
            <div class="side-chat shadow-lg">
                <!-- <div>
                    <div class="card shadow-lg"
                        style="margin-right: 10px; padding: 7px; background: var(--background-color-secondary);">

                        <div style="display: flex; justify-content: space-between;">
                            <img src="../../../assets/img/logo.png" alt="" style="width: 25px; height: 25px; margin: 5px;">
                            <p style="font-size: 10px; font-weight: bold;">
                                Obtém a app Messager para experimentar formas ainda mais divertidas de estar em contacto com
                                outras pessoas
                            </p>
                        </div>
                        <button class="btn" style="font-size: 12px; ">Obter Startic</button>
                    </div>
                </div> -->
                <div class="header">

                    <h3 style="padding: 10px;">Chat.ai</h3>
                    <!-- <div class="avatar-list">
                        <div v-for="(conversation, index) in conversations" :key="index" class="avatar-item">

                            <img class="avatar-image" src="../../../assets/img/man3.jpg" alt="">
                            <p style="font-size: 8px;">Euclides de carvalho</p>
                        </div>
                    </div> -->
                    <button class="float-button" @click="callCreateNewChat"><i class="bi bi-pencil"></i></button>
                </div>
                <div v-if="loading" class="loading-container">
                    <div class="loading-indicator"></div>
                </div>
                <div class="conversation-list">
                    <!-- Verifica se o array conversations está vazio -->
                    <div v-if="conversations.length === 0" class="empty-conversations">
                        <p>Toque no lápis para iniciar um novo chat</p>
                        <!-- <img src="../../../assets/img/codemaker.png" alt="" class="chat-phone"> -->
                        <p>{{ displayLogoName }}</p>
                        <p style="font-size: 8px;">Versão: 0.0.1-beta</p>
                    </div>

                    <!-- Lista de conversas -->
                    <div>
                        <div class="conversation" v-for="(conversation, index) in conversations" :key="index">
                            <div style="display: flex; width: 100%;">
                                <img class="avatar" :src="conversation.avatar" alt="" @click="profileAvatarPicture">
                                <div style="display: flex; width: 100%; justify-content: space-between;">
                                    <div class="info" @click="selectConversation(index)" >
                                        <div>
                                            <h5>{{ conversation.name }}</h5>

                                            <p>

                                                {{ conversation.messages.length > 0
                                                    ? limitarTexto(conversation.messages[conversation.messages.length - 1].text,
                                                        30)
                                                    : 'Nenhuma conversa iniciada....' }}
                                                <!-- <i class="bi bi-file-earmark-image" style="color: gray"></i> -->
                                            </p>

                                        </div>
                                        <div>
                                            <div style="font-size: 8px; color: gray;">{{ conversation.messages.length > 0
                                                ? conversation.messages[conversation.messages.length - 1].time
                                                : '' }}</div>
                                        </div>
                                    </div>
                                    <div @click="deleteConversation(index, conversation._id)">
                                        <i class="bi bi-trash"
                                            style="color: var(--text-primary-color); font-size: 20px;"></i>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Exibe a animação de carregamento quando loading for verdadeiro -->
                </div>

            </div>
            <!-- END Side bar contendo todos os chats do usuario...  -->

            <!--START Modal para a criação de chat -->
            <div class="modal modal-overlay" tabindex="-1" role="dialog"
                :class="{ 'show': showModal, 'd-block': showModal }">
                <div class="modal-dialog" role="document">
                    <div class="modal-content shadow-lg">
                        <div class="modal-header">
                            <h6 class="modal-title">Novo Chat</h6>
                            <button class="btn-close" @click="showModal = false"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="createChat">
                                <div class="form-group">
                                    <label for="chatTitle">Título:</label>
                                    <input type="text" id="chatTitle" class="form-control"
                                        placeholder="Escreva um título amigável" v-model="newChat.name" required />
                                        <p style="padding: 5px; font-size: 10px; color: green;">* {{ displayText }}</p>
                                </div>

                                
                                <div class="modal-footer" style="border: none;">
                                    <button type="submit" class="btn"> Criar</button>
                                    <button type="button" class="btn" @click="showModal = false">Fechar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!--END Modal para a criação de chat -->

            <!--START Modal para a image profile -->
            <!-- <div class="modal modal-overlay" tabindex="-1" role="dialog" @click="showModalProfile = false"
                :class="{ 'show': showModalProfile, 'd-block': showModalProfile }">
                <div class="modal-dialog" role="document">

                    <div class="card">
                        <img src="../../../assets/img/lady1.jpg" alt="" class="card-img-top modal-image">
                        <div class="card-footer"
                            style="display: flex; color: green; padding-top: 7px; padding-bottom: 7px; justify-content: space-around;">
                         
                            <i class="bi bi-exclamation-circle icon"></i>
                        </div>


                    </div>
              

                </div>
            </div> -->
            <!--END Modal para a image profile -->
        </div>



        <div class="container-center flex flex-col text-sm h-full" style="margin-left: 180px;">

            <div class="text-center">
                <img src="../../../assets/img/codemaker.png" alt="" style="width: 400px; height: 300px;">
                <h6>Seja bem-vindo ao CHAT da Startic</h6>
                <p>Use esta ferramenta para pesquisas.</p>
                <p style="font-size: 10px;">Desenvolvido pela Startic, lda</p>
                <p style="font-size: 10px;">Versão: 0.0.1-beta, ultima actualização: 08-2023</p>
            </div>
        </div>
    </div>

    <div ref="canvas"></div>
</template>

<script>
import ChatComponent from '../../../components/chat/chatComponent.vue';
import Chat from '../../../services/chat';
import vuejwtdecode from 'vue-jwt-decode';
import conversationService from '../../../services/conversationService';
import swal from 'sweetalert';
// import p5 from 'p5';

export default {
    data() {
        return {
            inputMessage: "",
            message_id: null,
            messages: [],
            showModal: false,
            showModalProfile: false,
            newChat: {
                name: '',
                description: '',
                messages: [],
                avatar: '',
            },
            avatar: [
            'https://startic.ao/image/1.jpg',
                'https://startic.ao/image/2.jpg',
                'https://startic.ao/image/3.jpg',
                'https://startic.ao/image/4.jpg',
                'https://startic.ao/image/5.jpg',
                'https://startic.ao/image/6.jpg',
                'https://startic.ao/image/7.jpg',
                'https://startic.ao/image/8.jpg',
                'https://startic.ao/image/9.jpg',
                'https://startic.ao/image/10.jpg',
                'https://startic.ao/image/11.jpg',
                'https://startic.ao/image/12.jpg',
                'https://startic.ao/image/13.jpg',
                'https://startic.ao/image/14.jpg',
                'https://startic.ao/image/15.jpg',
                'https://startic.ao/image/16.jpg',
                'https://startic.ao/image/17.jpg',
                'https://startic.ao/image/18.jpg',
                'https://startic.ao/image/19.jpg',
            
            ],
            showChatContainer: false,
            data: {
                text: '',
                lastMessage: "",
            },
            chatTitle: "",
            conversations: [


                // Adicione mais conversas conforme necessário
            ],
            loading: false,
            selectedConversationIndex: null,
            textArray: [
            'Sujestão: Explorando a Mente Humana',
                'Sujestão: Diálogos com a Inteligência Artificial',
                'Sujestão: Conversas Fascinantes: Responde às Suas Perguntas',
                'Sujestão: Uma Odisseia Intelectual no Mundo da Inteligência Artificial',
                'Sujestão: Mecânica quântica',
                'Sujestão: Explorando a Geometria Euclidiana',
                'Sujestão: Explorando o Universo',
            ],
            fullText: '',
            displayText: '',
            currentIndex: 0,

            fullTextLogo: 'Startic.ao',
            displayLogoName: '',
            currentIndexLogo: 0,
            

        };
    },
    components: {
        ChatComponent,
    },
    methods: {

        // sketch(p){
        //     p.setup= ()=>{
        //        p.noCanvas()
        //        p.background(255,0,0);
        //     };
        //     p.mousePressed=()=>{
        //         console.log('clicado')
        //     };
        //     p.mouseDragged=()=>{

        //     }
        // },

        submitFormMessage() { },
        avatarRandom(avatar) {
            const indiceAleatorio = Math.floor(Math.random() * avatar.length);
            return avatar[indiceAleatorio];
        },
        async createChat() {


            // Lógica para criar o novo chat
            try {
                const token = localStorage.getItem('jwt');
                const _token = vuejwtdecode.decode(token);
                this.newChat.avatar = this.avatarRandom(this.avatar);
                await conversationService.conversations(this.newChat, _token._id, token);

                this.conversations.unshift(this.newChat)
                // Após criar o chat, redefinimos o formulário para o estado original
                this.newChat = {
                    name: '',
                    description: '',
                    avatar: '',
                };
                this.showModal = false;
                window.location.reload();
            } catch (error) {
                console.log("error > " + error)
            }

        },
        callCreateNewChat(){
            this.showModal = true;
            this.fullText = ''
            this.typeANewTextRandom(this.textArray);
            this.typeText();
        },
        // Outros métodos do chat (como enviar mensagem, etc.)

        async sendMessage() {

            try {
                if (this.inputMessage.trim() !== "") {
                    this.messages.push({
                        text: this.inputMessage,
                        isUser: true,
                        isTyping: false
                    });
                    this.data = this.messages;

                    this.messages.push({ text: "", isUser: false, isTyping: true });
                    // this.data.lastMessage = this.data.lastMessage.concat({lastMessage: this.inputMessage});

                    // console.log(this.messages)
                    this.inputMessage = "";
                    // console.log("sending message");
                    const _token = localStorage.getItem('jwt');
                    const token = vuejwtdecode.decode(_token);
                    const _data = await Chat.getReplay(this.data, _token, token._id, this.message_id)
                        .then(res => {
                            this.messages.pop(); // Remova a mensagem de digitação
                            this.messages.push({ text: res.resposta, isUser: false, isTyping: false });
                        });
                }
            } catch (error) {
                console.log(error)
            }
        },
        async selectConversation(index) {

            this.selectedConversationIndex = index;

            await this.getHistoryChat().then(data => {
                // console.log(data[index]);
                this.message_id = data[index]._id;
                this.chatTitle = data[index].name;
                this.$router.push(`/chat/${this.message_id}`);
                // this.showChatContainer = true;
            });
            // Adicione a lógica para exibir a conversa selecionada na área de chat principal aqui
        },

        async deleteConversation(index, conversationID) {

            const token = localStorage.getItem('jwt');
            const _token = vuejwtdecode.decode(token);
            this.selectedConversationIndex = index;
           
            const data = {
                index: index,
                conversationID: conversationID
            };

            await conversationService.delete(_token._id, data).
                then(
                    res => {
                        window.location.reload();
                    }
                ).catch(error => {
                    // console.log(error);
                })

        },
        async getHistoryChat() {
            const token = localStorage.getItem('jwt');
            const _token = vuejwtdecode.decode(token);
            const res = await conversationService.historyChat(_token._id, token)
                .then(result => {
                    this.conversations = result;
                    this.loading = false;
                    
                    return result.reverse();
                });
            return res;
        },


        limitarTexto(texto, limite) {

            if (texto.length <= limite) {
                return texto;
            } else {
                return texto.slice(0, limite - 3) + "...";
            }
        },
        isImage(text) {
            return text.startsWith('https');
        },
        profileAvatarPicture() {
           
            this.showModalProfile = true;
        },

        typeANewTextRandom(textArray) {
            const indiceAleatorio = Math.floor(Math.random() * textArray.length);
            this.fullText = textArray[indiceAleatorio];
            return textArray[indiceAleatorio];
        },

        typeText() {
            
            if (this.currentIndex < this.fullText.length) {
                this.displayText += this.fullText[this.currentIndex];
                this.currentIndex++;
                setTimeout(this.typeText, 200); // Adiciona um atraso de 200ms entre cada letra
            } else {
                
            }
        },

        typeTextLogo() {
            if (this.currentIndexLogo < this.fullTextLogo.length) {
                this.displayLogoName += this.fullTextLogo[this.currentIndexLogo];
                this.currentIndexLogo++;
                setTimeout(this.typeTextLogo, 200); // Adiciona um atraso de 200ms entre cada letra
            } else {
                
            }
        },
        
    },
    created() {
        this.getHistoryChat();

    },
    mounted() {
        this.loading = true; // Iniciar o indicador de carregamento
        this.typeTextLogo();
        // this.p5 = new p5(this.sketch, this.$refs.canvas);
    },
    beforeDestroy() {

    },

    computed: {

    },
}
</script>

<style scoped>
/* side-chat */
.chat-home {
    background: var(--background-color-secondary);
    height: 100vh;
    color: var(--text-primary-color);

}

.chat-container {
    margin: 0px 0px 0px 60px;
    /* background: red; */


}

.side-chat {
    width: 240px;
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    position: fixed;
    top: 0px;
    background: var(--background-color-primary);
    color: var(--text-primary-color);
    /* Adicionando a propriedade position: fixed */
    /* Definindo a posição da esquerda */
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    /* margin-bottom: 20px; */
}

.header h3 {
    font-size: 16px;
    font-weight: bold;

    color: var(--text-primary-color);
}


.create-chat-btn {
    padding: 8px 15px;
    background-color: transparent;
    color: var(--text-primary-color);
    border: .1px solid rgb(213, 193, 193);
    border-radius: 7px;
    cursor: pointer;
    font-size: 12px;
}

.create-chat-btn:hover {
    background-color: var(--accent-color);
}

.conversation-list {
    max-height: 600px;
    overflow-y: auto;
}

:where(.side-chat, .conversation-list)::-webkit-scrollbar {
    width: 0px;
}

:where(.side-chat, .conversation-list)::-webkit-scrollbar-track {
    background: var(--background-color-primary);
    border-radius: 25px;
}

:where(.side-chat, .conversation-list)::-webkit-scrollbar-thumb {
    background: var(--background-color-primary);
    border-radius: 25px;
}

.conversation {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    margin-right: 7px;
    transition: background-color 0.3s;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    color: var(--text-primary-color);
    border-radius: 10px;
}

.conversation:hover {
    background-color: var(--background-color-secondary);
    color: var(--text-primary-color);
}

.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}
.info{
    width: 100%;
}

.info h5 {
    margin: 0;
    font-size: 14px;
    color: var(--text-primary-color)
}

.info p {
    margin: 0;
    font-size: 10px;
    color: var(--text-primary-color)
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

.modal-content {
    background: var(--background-color-secondary);
    color: var(--text-primary-color);
}

.form-control {

    border: .1px solid greenyellow;
    resize: none;
    color: var(--text-primary-color);
    font-size: 13px;
    border-radius: 4px;
    background: var(--background-color-secondary);
    ;
    outline: 1px solid rgb(211, 230, 183);
    margin-top: 10px;
}

.btn {

    background: transparent;
    border: .1px solid greenyellow;
    color: var(--text-primary-color);
}

.conversation.active-conversation {
    background-color: greenyellow;
    /* Cor de destaque quando selecionada */
    color: black;
    /* Cor do texto de destaque quando selecionada */
}


.float-button {
    position: fixed;
    bottom: 40px;
    /* Ajuste a distância da parte inferior conforme necessário */
    right: 20px;
    /* Ajuste a distância da direita conforme necessário */
    width: 60px;
    /* Largura do botão */
    height: 60px;
    /* Altura do botão */
    background-color: green;
    /* Cor de fundo do botão */
    color: white;
    /* Cor do ícone ou texto do botão */
    border-radius: 50%;
    /* Para torná-lo circular */
    font-size: 24px;
    /* Tamanho da fonte do ícone */
    text-align: center;
    line-height: 60px;
    /* Para centralizar o ícone verticalmente */
    cursor: pointer;
    z-index: 9999;
    /* Coloca o botão sobre outros elementos */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    /* Sombra suave */
    transition: background-color 0.3s, transform 0.2s;
    /* Transições suaves */
}

.float-button:hover {
    background-color: rgb(17, 142, 17);
    /* Cor de fundo ao passar o mouse */
    transform: scale(1.1);
    /* Efeito de escala ao passar o mouse */
}

/* Estilo do contêiner pai */
.loading-container {
    display: flex;
    justify-content: center;
    /* Centraliza horizontalmente */
    align-items: center;
    /* Centraliza verticalmente */
    height: 100%;
    /* Define a altura do contêiner para ocupar todo o espaço disponível verticalmente */
}

/* Estilo do indicador de carregamento */
.loading-indicator {
    width: 24px;
    height: 24px;
    border: 2px solid #63e5af;
    /* Cor da borda do círculo */
    border-top: 2px solid #0056b3;
    /* Cor da borda do círculo quando está girando */
    border-radius: 50%;
    /* Torna-o circular */
    animation: spin 1s linear infinite;
    /* Aplica a animação de rotação */
}


/* Defina a animação de rotação */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Estilo do indicador de carregamento */
.loading-indicator {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 2px solid #63e5af;
    /* Cor da borda do círculo */
    border-top: 2px solid #0056b3;
    /* Cor da borda do círculo quando está girando */
    border-radius: 50%;
    /* Torna-o circular */
    animation: spin 1s linear infinite;
    /* Aplica a animação de rotação */
}

.empty-conversations {
    text-align: center;
    /* justify-items: center; */
    padding: 20px 0px 0px 0px;
    font-size: 13px;
    color: green;
    animation: pulse 1s infinite alternate;
    /* Adiciona a animação "pulse" */
}

.empty-conversations img {
    margin-left: 50px;
    width: 250px;
    height: 150px;
}

/* Define a animação "pulse" */
@keyframes pulse {
    from {
        opacity: 1;
        /* Começa com opacidade 1 (visível) */
    }

    to {
        opacity: 0.5;
        /* Alterna para opacidade 0.5 (semi-visível) */
    }
}

.chat-phone {
    display: none;
}

@media (max-width: 768px) {
    .chat-phone {
        display: block;
        width: 300px;
        height: 200px;
    }

    .create-chat-btn {
        display: none;
    }

    .chat-container {
        margin: 0px 0px 0px 0px;
        /* background: red; */

    }

    .chat-home {
        display: flex;
        flex-direction: column-reverse;
    }

    .main-content {
        margin-left: 0;
        order: 1;
    }

    .container-center {
        display: none;
    }

    .side-chat {
        width: 100%;
        height: 100%;
        padding: 20px 1px 20px 20px;
        box-sizing: border-box;
        font-family: 'Montserrat', sans-serif;
        font-family: 'Open Sans', sans-serif;
        position: fixed;
        top: 50px;
        background: var(--background-color-primary);
        color: var(--text-primary-color);
    }

    .avatar {
        width: 60px;
        height: 60px;
    }

    .info h5 {

        font-size: 16px;

    }

    .float-button {
        bottom: 10px;
        right: 10px;
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




.modal {
    /* display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  overflow: auto; */
}

.modal-dialog {
    /* background: white;
  border-radius: 10px;
  max-width: 80%;
  margin: 10px;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); */
}

.card-profile {
    display: flex;
    flex-direction: column;
    align-items: center;

}

.modal-avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    margin-bottom: 20px;
}

.modal-icons {
    display: flex;
    gap: 20px;
    font-size: 24px;
    margin-top: 20px;
}

.icon {
    cursor: pointer;
    color: green;
    font-size: 20px;
    transition: color 0.3s ease;
}

.icon:hover {
    color: #0056b3;
}

.card {
    /* width: 200px;  */
    /* Ajuste a largura da div conforme necessário */
}

.modal-image {
    object-fit: cover;
    width: 100%;
    height: 200px;
    /* Altura desejada para a imagem */
}
</style>




