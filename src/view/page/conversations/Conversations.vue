<template>
    <div class="menu-container">
        <!-- START Side bar contendo todos os chats do usuario...  -->
        <div class="side-chat shadow-lg">
            <div class="header">
                <h3>Chat</h3>
                <button class="create-chat-btn" @click="showModal = true">+ Criar chat</button>
            </div>
            <div class="conversation-list">
                <div class="conversation" v-for="(conversation, index) in conversations" :key="index"
                    @click="selectConversation(index)">
                    <img class="avatar" src="../../../assets/img/robo.jpg" alt="">
                    <div class="info">
                        <h5>{{ conversation.name }}</h5>
                        <p>{{ conversation.lastMessage }} Oi como foi o teu dia</p>
                    </div>
                </div>
            </div>
            <!-- <div class="btn mt-3 mb-3" style="position: fixed; bottom: 0px; background: rgb(238, 184, 83); font-size: 12px;">news</div> -->

        </div>
        <!-- END Side bar contendo todos os chats do usuario...  -->

        <!--START Modal para a criação de chat -->
        <div class="modal modal-overlay" tabindex="-1" role="dialog" :class="{ 'show': showModal, 'd-block': showModal }">
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
                            </div>


                            <div class="modal-footer">
                                <button type="submit" class="btn"> Criar</button>
                                <button type="button" class="btn" @click="showModal = false">Fechar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--END Modal para a criação de chat -->

        <div class="flex flex-col text-sm dark:bg-gray-800 h-full">

            <div class="w-full mx-auto md:max-w-2xl lg:max-w-3xl md:flex md:flex-col px-6 dark:text-gray-100">
                <div class="shadow-sm">
                    <!-- <i class="text-center">{{ chatHeaderTitle }}</i> -->
                    <!-- <p class="text-center" >AI powered by STARTIC</p> -->
                </div>

                <div class="chat-container">
                    <div v-for="(message, index) in messages" :key="index" class="chat"
                        :class="{ outgoing: message.isUser, incoming: !message.isUser }">
                        <div class="chat-content">
                            <div class="chat-details">
                                <img src="../../../assets/img/avatar.png" alt="" v-show="message.isUser">
                                <img src="../../../assets/img/robo.jpg" alt="" v-show="!message.isUser">
                                <p v-if="!message.isTyping">{{ message.text }}</p>
                                <div v-else class="typing-animation">
                                    <div class="typing-dot" style="--delay: 0.2s"></div>
                                    <div class="typing-dot" style="--delay: 0.3s"></div>
                                    <div class="typing-dot" style="--delay: 0.4s"></div>
                                </div>
                            </div>
                            <span class="copy"><i class="bi bi-clipboard"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="typing-container" tabindex="-1">
            <div class="typing-content">
                <div class="typing-textarea">
                    <textarea v-model="inputMessage" @keyup.enter="sendMessage" id="chat-input"
                        placeholder="Enter a prompt here" required></textarea>
                    <span @click="sendMessage"><img src="../../../assets/img/send.png" style="height: 10px; height: 25px;"
                            alt=""></span>
                </div>
                <!-- <div class="typing-controls">
                        <span class="bi bi-lightbulb"></span>
                        <span class="bi bi-archive-fill"></span>
                    </div> -->

            </div>
        </div>
    </div>
    <ChatComponent />
</template>

<script>
import ChatComponent from '../../../components/chat/chatComponent.vue';
import Chat from '../../../services/chat';
import vuejwtdecode from 'vue-jwt-decode';
import conversationService from '../../../services/conversationService';
import swal from 'sweetalert';
import getInfoScript from '../../../services/getInfo';

export default {
    props: {
        id: 'id'
    },
    data() {
        return {
            user: {},
            inputMessage: "",
            message_id: null,
            messages: [],
            showModal: false,
            chatHeaderTitle: "",
            myscript: {
                title: null,
                text: null,
            },
            newChat: {
                name: '',
                description: '',
                script_Title: '',
                script_Text: '',
            },

            showChatContainer: false,
            data: {
                text: '',
                lastMessage: "",
            },
            chatTitle: "",
            conversations: [
                // { title: "Conversa 1", lastMessage: "Olá, como vai?" },

                // Adicione mais conversas conforme necessário
            ],
            selectedConversationIndex: null

        };
    },
    components: {
        ChatComponent,
    },
    methods: {
        submitFormMessage() { },
        async createChat() {
            // Lógica para criar o novo chat
            try {
                const token = localStorage.getItem('jwt');
                const _token = vuejwtdecode.decode(token);
                console.log("new Chat:", this.newChat);
                await conversationService.conversations(this.newChat, _token._id, token);
                this.conversations.unshift(this.newChat)
                // Após criar o chat, redefinimos o formulário para o estado original
                this.newChat = {
                    name: '',
                    description: '',
                };
                this.showModal = false;
            } catch (error) {
                console.log("error > " + error)
            }

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
                    this.inputMessage = "";
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
        async getId() {
            this.messages.splice(0, this.messages.length);
            await this.getHistoryChat().then(data => {
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];

                    if (this.id === element._id) {
                        this.chatHeaderTitle = element.name;
                        for (let i = 0; i < element.messages.length; i++) {
                            this.messages.push(element.messages[i])
                        }
                        break;
                    }

                }

            });
        },
        async selectConversation(index) {
            this.messages.splice(0, this.messages.length);
            this.selectedConversationIndex = index;

            // Remova a classe "active-conversation" de todas as conversas
            const conversations = document.querySelectorAll('.conversation');
            conversations.forEach((conversation) => {
                conversation.classList.remove('active-conversation');
            });

            // Adicione a classe "active-conversation" à conversa selecionada
            const selectedConversation = conversations[index];
            if (selectedConversation) {
                selectedConversation.classList.add('active-conversation');
            }

            await this.getHistoryChat().then(data => {
                this.chatHeaderTitle = data[index].name;
                this.message_id = data[index]._id;
                for (let i = 0; i < data[index].messages.length; i++) {
                    this.messages.push(data[index].messages[i])
                }
                this.$router.push(`/chat/${this.message_id}`);

                // this.showChatContainer = true;
            });
            // Adicione a lógica para exibir a conversa selecionada na área de chat principal aqui
        },

        async initWithId() {

            this.message_id = this.id;



        },

        async getHistoryChat() {
            const token = localStorage.getItem('jwt');
            const _token = vuejwtdecode.decode(token);
            const res = await conversationService.historyChat(_token._id, token)
                .then(result => {
                    this.conversations = result;
                    return result.reverse();
                });
            return res;
        },

    },
    created() {
        this.initWithId();
        this.getId();
        this.getHistoryChat();
    },
}
</script>

<style scoped>
.menu-container {
    background: var(--background-color-secondary);
    color: var(--text-primary-color);
    font-size: 10px;
    height: 100vh;

}

.chat-container .chat {
    /* margin-top: 60px; */
    /* margin-left: 50px; */
    padding: 15px 10px;
    display: flex;
    justify-content: center;
    color: white;
}

.chat-container {
    position: fixed;
    left: 360px;
    top: 0;
    /* Defina o início do chat no topo */
    bottom: 120px;
    /* Deixe espaço para a caixa de entrada */
    width: calc(100% - 360px);
    overflow-y: auto;
    padding: 20px;
    /* Adicione um espaço de preenchimento */
}

:where(.chat-container, textarea)::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

:where(.chat-container, textarea)::-webkit-scrollbar-track {
    background: white;
    border-radius: 25px;
}

:where(.chat-container, textarea)::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 25px;
}

.chat-container .chat.outgoing {
    /* background: gray; */
    /* border: 1px solid green; */
}

.chat-container .chat.incoming {
    /* background: rgb(63, 61, 61); */
    /* border: .1px solid green; */
}

.chat .chat-content {
    display: flex;
    /* max-width: 1200px; */
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
}

.chat .chat-content span {
    font-size: .690rem;
    padding-right: 100px;
    visibility: hidden;
}

.chat:hover .chat-content span {
    visibility: visible;
}

.chat .chat-details {
    display: flex;
    align-items: center;
    padding-left: 150px;
    padding-right: 150px;

}

.chat .chat-details img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    /* border: 1px solid green; */
    align-self: flex-start;
    /* background: brown; */
    border-radius: 2px;
}

.chat .chat-details p {
    margin-left: 10px;
    border-radius: 0 15px 15px 15px;
    background: #65647C;
    white-space: pre-wrap;
    font-size: 13px;
    /* letter-spacing: .5px; */
    font-feature-settings: normal;
    font-family: Söhne, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-variation-settings: normal;
    line-height: 1.5;
    tab-size: 4;
    padding: 10px 20px 10px 25px;
}

span .bi.bi-clipboard {
    user-select: none;
    cursor: pointer;
}

.typing-animation {
    display: inline-flex;
    padding-left: 25px;
}

.typing-animation .typing-dot {
    height: 7px;
    width: 7px;
    opacity: 0.7;
    margin: 0 3px;
    border-radius: 50%;
    background: black;
    animation: animationDots 1.5s var(--delay) ease-in-out infinite;
}

@keyframes animationDots {

    0%,
    44% {
        transform: translateY(0px);
    }

    22% {
        opacity: 0.4;
        transform: translateY(-6px);
    }

    44% {
        opacity: 0.2;
    }
}

/* ==== typing container ===  */

.typing-container {
    position: fixed;
    bottom: 0;
    left: 300px;
    width: 100%;
    /* display: flex; */
    padding: 30px 0px;
    justify-content: center;
    /* background: rgba(41, 42, 56, 0.7); */

}

.typing-container .typing-content {
    max-width: 950px;
    width: 600px;
    display: flex;
    align-items: flex-end;
}

.typing-content .typing-textarea {
    width: 600px;
    display: flex;
    position: relative;
    left: 250px;
}

.typing-textarea textarea {
    width: 100%;
    height: 55px;
    border: none;
    resize: none;
    color: black;
    font-size: 1rem;
    padding: 15px 45px 15px 20px;
    border-radius: 4px;
    background: rgb(234, 234, 234);
    outline: 1px solid greenyellow;
}

.typing-textarea textarea::placeholder {
    color: black
}

.typing-textarea textarea:valid~span {
    visibility: visible;
}

.typing-textarea span {
    position: absolute;
    right: 0;
    bottom: 0;
    visibility: hidden;
}

.typing-content span {
    height: 55px;
    width: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}


/* side-chat */
.side-chat {
    width: 240px;
    height: 100vh;
    padding: 20px;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    position: fixed;
    top: 0px;
    left: 60px;
    background: var(--background-color-primary);
    color: var(--text-primary-color);
    /* Adicionando a propriedade position: fixed */
    /* Definindo a posição da esquerda */
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
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
    width: 3px;
}

:where(.side-chat, .conversation-list)::-webkit-scrollbar-track {
    background: white;
    border-radius: 25px;
}

:where(.side-chat, .conversation-list)::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 25px;
}

.conversation {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    margin-right: 7px;
    transition: background-color 0.3s;
    color: var(--text-primary-color);
    border-radius: 10px;
}

.conversation:hover {
    background-color: var(--background-color-secondary);
    color: var(--text-primary-color);
}

.avatar img {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 10px;
}

.info h5 {
    margin: 0;
    font-size: 14px;
    color: var(--text-primary-color);
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
    background-color: rgb(248, 77, 77);
    /* Cor de destaque quando selecionada */
    color: white;
    /* Cor do texto de destaque quando selecionada */
}
</style>