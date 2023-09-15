<template>
    <div class="chat-home">


        <ChatComponent />
        <div class="chat-container shadow-lg">
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
                <div class="btn mt-3 mb-3" style="position: fixed; bottom: 0px; background: rgb(238, 184, 83); font-size: 12px;">news</div>

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
        </div>



        <div class="flex flex-col text-sm h-full" style="margin-left: 180px;">

            <div class="text-center">
                <img src="../../../assets/img/codemaker.png" alt="" style="width: 400px; height: 300px;">
                <h6>Seja bem-vindo ao CHAT da Startic</h6>
                <p>Use esta ferramenta para pesquisas.</p>
                <p style="font-size: 10px;">Desenvolvido pela Startic, lda</p>
                <p style="font-size: 10px;">Versão: 0.0.1-beta, ultima actualização: 08-2023</p>
            </div>
        </div>
    </div>
</template>

<script>
import ChatComponent from '../../../components/chat/chatComponent.vue';
import Chat from '../../../services/chat';
import vuejwtdecode from 'vue-jwt-decode';
import conversationService from '../../../services/conversationService';
import swal from 'sweetalert';

export default {
    data() {
        return {
            inputMessage: "",
            message_id: null,
            messages: [],
            showModal: false,
            newChat: {
                name: '',
                description: '',
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
        this.getHistoryChat();
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
    padding: 20px;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
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
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
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
</style>




