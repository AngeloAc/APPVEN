<template>
    <div class="menu-container">
        <!-- START Side bar contendo todos os chats do usuario...  -->
        <div class="side-chat shadow-lg">
            <div class="header">
                <h3 style="padding: 10px;">Chat.ai</h3>
                <button class="create-chat-btn" @click="showModal = true">+ Criar chat</button>
            </div>
            <div v-if="loading" class="loading-container">
                <div class="loading-indicator"></div>
            </div>
            <div class="conversation-list">
                <!-- Verifica se o array conversations está vazio -->
                <div v-if="conversations.length === 0" class="empty-conversations">
                    <!-- Exibe a mensagem "Nenhuma conversa iniciada..." -->
                    <p>Toque no lápis para iniciar um novo chat</p>
                    <img src="../../../assets/img/codemaker.png" alt="" class="chat-phone">
                </div>

                <!-- Lista de conversas -->
                <div v-else>
                        <div class="conversation" v-for="(conversation, index) in conversations" :key="index">
                            <div style="display: flex; width: 100%;">
                                <img class="avatar" :src="conversation.avatar" alt="" @click="profileAvatarPicture">
                                <div style="display: flex; width: 100%; justify-content: space-between;">
                                    <div class="info" @click="selectConversation(index)">
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
                                        <i class="bi bi-trash" style="color: black; font-size: 20px;"></i>

                                    </div>
                                </div>
                            </div>

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



        <div class="w-full mx-auto md:max-w-2xl lg:max-w-3xl md:flex md:flex-col px-6">



            <div class="chat-container" ref="chatContainer">
                <div class="text-salute"><i class="bi bi-chat"></i> Seja bem vindo ao novo chat, use palavras claras e
                    simples. Powered by startic</div>

                <div v-if="loading" class="loading-container">
                    <div class="loading-indicator"></div>
                </div>
                <!-- Verifica se o array conversations está vazio -->
                <div v-if="messages.length === 0" class="empty-conversations">
                    <!-- Exibe a mensagem "Nenhuma conversa iniciada..." -->
                    <p class="badge bg-white m-2" style="color: black; font-weight: normal;">Dê-me dicas sobre receita de
                        bolo <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                            viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                            <path
                                d="M86.4 5.5L61.8 47.6C58 54.1 56 61.6 56 69.2V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L105.6 5.5C103.6 2.1 100 0 96 0s-7.6 2.1-9.6 5.5zm128 0L189.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L233.6 5.5C231.6 2.1 228 0 224 0s-7.6 2.1-9.6 5.5zM317.8 47.6c-3.8 6.5-5.8 14-5.8 21.6V72c0 22.1 17.9 40 40 40s40-17.9 40-40V69.2c0-7.6-2-15-5.8-21.6L361.6 5.5C359.6 2.1 356 0 352 0s-7.6 2.1-9.6 5.5L317.8 47.6zM128 176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c-35.3 0-64 28.7-64 64v71c8.3 5.2 18.1 9 28.8 9c13.5 0 27.2-6.1 38.4-13.4c5.4-3.5 9.9-7.1 13-9.7c1.5-1.3 2.7-2.4 3.5-3.1c.4-.4 .7-.6 .8-.8l.1-.1 0 0 0 0s0 0 0 0s0 0 0 0c3.1-3.2 7.4-4.9 11.9-4.8s8.6 2.1 11.6 5.4l0 0 0 0 .1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c3-3.5 7.4-5.4 12-5.4s9 2 12 5.4l.1 .1c.1 .1 .4 .4 .7 .7c.7 .7 1.7 1.7 3.1 3c2.8 2.6 6.8 6.1 11.8 9.5c10.2 7.1 23 13.1 36.3 13.1s26.1-6 36.3-13.1c5-3.5 9-6.9 11.8-9.5c1.4-1.3 2.4-2.3 3.1-3c.3-.3 .6-.6 .7-.7l.1-.1c2.9-3.4 7.1-5.3 11.6-5.4s8.7 1.6 11.9 4.8l0 0 0 0 0 0 .1 .1c.2 .2 .4 .4 .8 .8c.8 .7 1.9 1.8 3.5 3.1c3.1 2.6 7.5 6.2 13 9.7c11.2 7.3 24.9 13.4 38.4 13.4c10.7 0 20.5-3.9 28.8-9V288c0-35.3-28.7-64-64-64V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H256V176c0-17.7-14.3-32-32-32s-32 14.3-32 32v48H128V176zM448 394.6c-8.5 3.3-18.2 5.4-28.8 5.4c-22.5 0-42.4-9.9-55.8-18.6c-4.1-2.7-7.8-5.4-10.9-7.8c-2.8 2.4-6.1 5-9.8 7.5C329.8 390 310.6 400 288 400s-41.8-10-54.6-18.9c-3.5-2.4-6.7-4.9-9.4-7.2c-2.7 2.3-5.9 4.7-9.4 7.2C201.8 390 182.6 400 160 400s-41.8-10-54.6-18.9c-3.7-2.6-7-5.2-9.8-7.5c-3.1 2.4-6.8 5.1-10.9 7.8C71.2 390.1 51.3 400 28.8 400c-10.6 0-20.3-2.2-28.8-5.4V480c0 17.7 14.3 32 32 32H416c17.7 0 32-14.3 32-32V394.6z" />
                        </svg></p>
                    <p class="badge bg-white m-2" style="color: black; font-weight: normal;">Escreva uma mensagem para o meu
                        namorado <i class="bi bi-heart"></i></p>
                    <p class="badge bg-white m-2" style="color: black; font-weight: normal;">/gera uma imagem de um ovo
                        amarelo <i class="bi bi-egg"></i></p>
                    <p class="badge bg-white m-2" style="color: black; font-weight: normal;">/gera uma ilustração de um gato
                        no espaco <svg xmlns="http://www.w3.org/2000/svg" height="1em"
                            viewBox="0 0 576 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                            <path
                                d="M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5v0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32h0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128v0V32 12 10.7C352 4.8 356.7 .1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2l0 .1L384 21.3l27.2 36.3L416 64h64l4.8-6.4L512 21.3 524.8 4.3l0-.1c2-2.6 5.1-4.2 8.4-4.2h.2C539.3 .1 544 4.8 544 10.7V12 32v96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" />
                        </svg></p>

                </div>
                <div>
                    <div v-for="(message, index) in messages" :key="index" class="chat">
                        <!-- Conteúdo da mensagem -->

                        <div class="chat-content">
                            <div class="chat-details">
                                <img :src="url" alt="" v-show="message.isUser">
                                
                                    <img :src="avatar_selected" alt="" v-show="!message.isUser">
                           
                                <!-- Verifique se a mensagem começa com 'https' para exibi-la como imagem -->
                                
                                <div v-if="isImage(message.text)" style="background: transparent;">
                                    <img :src="message.text" alt=""
                                    style="padding: 1px; border-radius: 10px; width: 300px; height: 300px;">
                                    <div style="text-align: end; ">
                                            <i style="color: black; font-size: 8px; margin: 8px;"> {{ message.time }}</i>
                                        </div>
                                </div>

                                <!-- Caso contrário, exiba a mensagem como texto -->
                                <div v-else>
                                    <div v-if="!message.isTyping">
                                        <p>
                                        <div>
                                            {{ message.text }}
                                        </div>
                                        <div style="text-align: end; ">
                                            <i style="color: white; font-size: 8px;"> {{ message.time }}</i>
                                        </div>
                                        </p>

                                    </div>

                                    <div v-else class="typing-animation">
                                        <div class="typing-dot" style="--delay: 0.2s"></div>
                                        <div class="typing-dot" style="--delay: 0.3s"></div>
                                        <div class="typing-dot" style="--delay: 0.4s"></div>
                                    </div>
                                </div>



                            </div>
                           
                            <div >
                                <span class="copy" style="font-size: 20px;" v-show="!message.isUser" @click="copyCode(message.text)"
                                    :class="{ 'checkmark-icon': copied }">
                                    <i :class="iconCopy"></i>
                                </span>
                         
                            
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    
        <div class="typing-container" tabindex="-1">
            <div style="margin-left: 15px; text-align: end; margin-right: 10px;">
                <img v-if="isImageSelected" :src="selectedImageUrl" alt="Imagem selecionada" style="max-width: 100px; max-height: 100px; margin-left: 15px; border-radius: 7px;">
            </div>
            
            <div class="typing-content">
               
                <div class="typing-textarea">
                    <textarea v-model="inputMessage" @keyup.enter="sendMessage" id="chat-input"
                        placeholder="Mensagem" required></textarea>
       
                        
                    <span @click="sendMessage"><img src="../../../assets/img/send.png" style="height: 20px;" alt=""></span>
         
                  
                </div>
                <div class="typing-controls">
    <input type="file" ref="fileInput" style="display: none;" accept="image/*" @change="handleFileUpload">
    <span
      class="bi"
      :class="{'bi-camera': !isImageSelected, 'bi-upload': isImageSelected}"
      style="cursor: pointer; background: green; color: white; margin-left: 3px;"
      @click="isImageSelected ? uploadImage() : openGallery()"
    ></span>
   
  </div>

            </div>
        </div>
    </div>
    <ChatComponent />
</template>

<script>
import ChatComponent from '../../../components/chat/chatComponent.vue';
import Chat from '../../../services/chat';
import vuejwtdecode from 'vue-jwt-decode';
import { storage } from "../../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import conversationService from '../../../services/conversationService';
import swal from 'sweetalert';
import getInfoScript from '../../../services/getInfo';
import image from '../../../services/imageupload';



export default {
    props: {
        id: {
      type: String,
      required: true
    },

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
                messages: [],
                avatar: '',
             
            },
            avatar: [
                'https://startic.ao/image/lady1.jpg',
                'https://startic.ao/image/lady2.jpg',
                'https://startic.ao/image/lady3.jpg',
                'https://startic.ao/image/man1.jpg',
                'https://startic.ao/image/man2.jpg',
                'https://startic.ao/image/man3.jpg',
                
            ],
            avatar_selected: '',

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
            loading: false,
            selectedConversationIndex: null,
            isImageSelected: false,
      selectedFile: null,
      selectedImageUrl: null,
      path: 'folder/2.jpg',
      url: 'https://placehold.co/400',
      file: '',
      copied: false,
      iconCopy: 'bi bi-clipboard',

        };
    },
    components: {
        ChatComponent,
    },
    methods: {

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
                };
                this.showModal = false;
                window.location.reload();
            } catch (error) {
                console.log("error > " + error)
            }

        },
        // Outros métodos do chat (como enviar mensagem, etc.)
        async sendMessage() {
            this.scrollChatToBottom();
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
                            console.log(res)
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

                   this.avatar_selected = data[i].avatar
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
                this.avatar_selected = data[index].avatar;
                
                this.message_id = data[index]._id;
                for (let i = 0; i < data[index].messages.length; i++) {
                    this.messages.push(data[index].messages[i])
                }
                this.$router.push(`/chat/${this.message_id}`);

                // this.showChatContainer = true;
            });
            // Adicione a lógica para exibir a conversa selecionada na área de chat principal aqui
        },

        isImage(text) {
            return text.startsWith('https');
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
        scrollChatToBottom() {
            // Role a div de mensagens para o final.
            const chatContainer = this.$refs.chatContainer;
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        },

        openGallery() {
      // Chamar o clique no elemento de input para abrir a galeria
      this.$refs.fileInput.click();
    },

    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        // Verifique se o arquivo selecionado é uma imagem (pode ser necessário validar outros tipos de imagens)
        if (file.type.startsWith("image/")) {
          this.selectedFile = file;
          this.isImageSelected = true;
          
          // Crie uma URL temporária para a imagem selecionada e defina-a como src da imagem
          this.selectedImageUrl = URL.createObjectURL(file);
        } else {
          this.selectedFile = null;
          this.isImageSelected = false;
          this.selectedImageUrl = null;
        //   console.log("Arquivo selecionado não é uma imagem:", file);
        }
      }
    },


    async uploadImage() {
      if (!this.selectedFile) {
        return;
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      
      try {
        this.messages.push({ text: "", isUser: false, isTyping: true });
        await image.sendImageVariation(formData)
        .then(res => {
            this.messages.pop(); // Remova a mensagem de digitação
            this.messages.push({ text: res.image, isUser: false, isTyping: false });
        })
        .catch(error => {
            console.log("error ao pegar a imagem de volta" + error)
        });
        // Limpar a seleção de imagem após o envio bem-sucedido
        this.selectedFile = null;
        this.isImageSelected = false;
        this.selectedImageUrl = null;
      } catch (error) {
        console.error('Erro ao enviar a imagem:', error);
      }
    },

    async deleteConversation(index, conversationID) {
            this.bg = "bg-black"
            const token = localStorage.getItem('jwt');
            const _token = vuejwtdecode.decode(token);
            this.selectedConversationIndex = index;
            console.log(conversationID)
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
                    console.log(error);
                })

        },

        copyCode(code) {
            // Crie um elemento de área de texto temporário para copiar o código
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = code;

            // Adicione o elemento temporário ao DOM
            document.body.appendChild(tempTextArea);

            // Selecione o texto dentro da área de texto
            tempTextArea.select();

            // Tente copiar o texto para a área de transferência
            try {
                document.execCommand('copy');
                // Lidar com a lógica de sucesso da cópia (por exemplo, exibir uma mensagem de sucesso)
                this.copied = true; // Defina a variável copied como true para ativar a animação
                this.iconCopy = 'bi bi-clipboard-check';
                // Use setTimeout para reverter a classe após 2 segundos (ou qualquer valor desejado)
                setTimeout(() => {
                    this.copied = false; // Reverta a classe
                    this.iconCopy = 'bi bi-clipboard';
                }, 2000); // 2 segundos (ajuste conforme necessário)
            } catch (err) {
                // Lidar com erros de cópia (por exemplo, mostrar uma mensagem de erro)
                alert('Erro ao copiar o código.');
            } finally {
                // Remova o elemento temporário
                document.body.removeChild(tempTextArea);
            }
        },

    },
    created() {
        this.initWithId();
        this.getId();
        this.getHistoryChat();
    },
    mounted() {
        this.loading = true; // Iniciar o indicador de carregamento
        const token = localStorage.getItem('jwt');
        const _token = vuejwtdecode.decode(token);
    this.path = `folder/${_token._id}.jpg`;
    
    getDownloadURL(ref(storage, this.path))
    .then((download_url) => (this.url = download_url))
    .catch(
      error => {
       console.log(error)
      }
    )
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
    padding: 5px 10px;
    display: flex;
    justify-content: center;
    color: white;
}

.chat-container {
    position: fixed;
    left: 360px;
    top: 0;
    /* Defina o início do chat no topo */
    bottom: 90px;
    /* Deixe espaço para a caixa de entrada */
    width: calc(100% - 360px);
    overflow-y: auto;
    padding: 20px;
    background: transparent;
}

:where(.chat-container, textarea)::-webkit-scrollbar {
    width: 3px;
    height: 6px;
}

:where(.chat-container, textarea)::-webkit-scrollbar-track {
    background: var(--background-color-primary);
    border-radius: 25px;
}

:where(.chat-container, textarea)::-webkit-scrollbar-thumb {
    background: var(--background-color-primary);
    border-radius: 25px;
}

.chat-container .chat.outgoing {
    background: green;
    /* border: 1px solid green; */
}

.chat-container .chat.incoming {
    background: rgb(63, 61, 61);
    /* border: .1px solid green; */
}

.chat .chat-content {
    display: flex;
    /* max-width: 1200px; */
    /* background: red; */
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
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
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
    background: green;
    white-space: pre-wrap;
    font-size: 13px;
    /* letter-spacing: .5px; */
    font-feature-settings: normal;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
    font-variation-settings: normal;
    line-height: 1.5;
    tab-size: 4;
    padding: 10px 10px 10px 15px;
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
    background: var(--text-primary-color);
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
    left: 380px;
    width: 100%;
    /* display: flex; */
    padding: 30px 0px;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
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

.typing-controls span {
    /* font-size: 25px; */
    /* background: red; */
    margin-right: 0px;
}

/* side-chat */
.side-chat {
    width: 240px;
    height: 100vh;
     padding-top: 10px;
     padding-bottom: 10px;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
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

.info h5 {
    margin: 0;
    font-size: 14px;
    color: var(--text-primary-color);
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
}

.info p {
    margin: 0;
    font-size: 10px;
    color: var(--text-primary-color);
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
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


.text-salute {
    margin: 20px;
    padding: 12px;
    background: rgb(138, 165, 135);
    border: none;
    border-radius: 10px;
    text-align: center;
    color: white;
}

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

.empty-conversations {
    text-align: center;
    padding: 20px;
    font-size: 16px;
    color: gray;
    animation: pulse 1s infinite alternate;
    /* Adiciona a animação "pulse" */
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

.copy {
        color: black;
    }


@media (max-width: 768px) {
    .side-chat {
        display: none;
    }
    .copy {
        display: none;
    }
    .chat-container {
        top: 50px;
        left: 0px;
        width: 100%;
        margin: 0;
        padding: 10px;
        /* background-color: red; */
        overflow-y: auto;
    }

    .chat .chat-details {
        /* background: red; */
        width: 100%;
        padding-left: 0px;
        padding-right: 0px;

    }
    .avatar {
        width: 60px;
        height: 60px;
    }
    .typing-container {
        left: 0px;
        padding: 30px 0px;
    }

    .typing-container .typing-content {
        width: 100%;
        display: flex;
        align-items: flex-end;
        padding: 10px 10px 0px 10px;

    }

    .typing-content .typing-textarea {
        width: 100%;
        display: flex;
        position: relative;
        left: 0px;
    }
}
</style>