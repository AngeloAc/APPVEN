<template>
    <CodeMakerComponent />
    <!-- <CodeMakerMenu /> -->
    <div class="menu-container">
        <!-- START Side bar contendo todos os chats do usuario...  -->
        <div class="side-chat shadow-lg">
            <div class="header">
                <h3>Code Maker</h3>
                <button class="create-chat-btn" @click="showModal = true">Novo code</button>
            </div>
            <div class="conversation-list">
             
                <div class="conversation" v-for="(javaChat, index) in javaChat" :key="index"
                    @click="selectChat(index)">
                    <svg v-if="javaChat.code === 'java'" class="avatar" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M277.74 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.84 0 242.84 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.19 12.19 0 0 1-2 2.6c128.3-33.7 81.1-118.9 19.8-97.3a17.33 17.33 0 0 0-8.2 6.3 70.45 70.45 0 0 1 11-3c31-6.5 75.5 41.5-20.6 91.4zM348 437.4s14.5 11.9-15.9 21.2c-57.9 17.5-240.8 22.8-291.6.7-18.3-7.9 16-19 26.8-21.3 11.2-2.4 17.7-2 17.7-2-20.3-14.3-131.3 28.1-56.4 40.2C232.84 509.4 401 461.3 348 437.4zM124.44 396c-78.7 22 47.9 67.4 148.1 24.5a185.89 185.89 0 0 1-28.2-13.8c-44.7 8.5-65.4 9.1-106 4.5-33.5-3.8-13.9-15.2-13.9-15.2zm179.8 97.2c-78.7 14.8-175.8 13.1-233.3 3.6 0-.1 11.8 9.7 72.4 13.6 92.2 5.9 233.8-3.3 237.1-46.9 0 0-6.4 16.5-76.2 29.7zM260.64 353c-59.2 11.4-93.5 11.1-136.8 6.6-33.5-3.5-11.6-19.7-11.6-19.7-86.8 28.8 48.2 61.4 169.5 25.9a60.37 60.37 0 0 1-21.1-12.8z"/></svg>
                    <svg v-if="javaChat.code === 'python'" class="avatar"   xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"/></svg>
                    <svg v-if="javaChat.code === 'c'" class="avatar"  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M329.1 142.9c-62.5-62.5-155.8-62.5-218.3 0s-62.5 163.8 0 226.3s155.8 62.5 218.3 0c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3c-87.5 87.5-221.3 87.5-308.8 0s-87.5-229.3 0-316.8s221.3-87.5 308.8 0c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z"/></svg>
                    <svg  v-if="javaChat.code === 'javascript'" class="avatar" xmlns="http://www.w3.org/2000/svg" height="0.75em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/></svg>
                    <svg  v-if="javaChat.code === 'html'" class="avatar"  xmlns="http://www.w3.org/2000/svg" height="0.625em" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg>
                    <svg  v-if="javaChat.code === 'cisco'" class="avatar" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 64H384v64H256V64zM240 0c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h48v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96v32H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H240c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H192V288H448v32H400c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H512V288h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V192h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H240zM96 448V384H224v64H96zm320-64H544v64H416V384z"/></svg>
                    <svg  v-if="javaChat.code === 'huawei'" class="avatar" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 64H384v64H256V64zM240 0c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h48v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96v32H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H240c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H192V288H448v32H400c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H512V288h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V192h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H240zM96 448V384H224v64H96zm320-64H544v64H416V384z"/></svg>
                    <svg  v-if="javaChat.code === 'mikrotik'" class="avatar" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 64H384v64H256V64zM240 0c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h48v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96v32H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H240c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H192V288H448v32H400c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H512V288h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V192h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H240zM96 448V384H224v64H96zm320-64H544v64H416V384z"/></svg>

                    <div class="info">
                        <h5>{{ javaChat.name }}</h5>
                        <p v-if="javaChat.code === 'java'" style="background: green; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">{{ javaChat.code }}</p>
                        <p v-if="javaChat.code === 'python'" style="background: blue; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">{{ javaChat.code }}</p>
                        <p v-if="javaChat.code === 'c'"  style="background: rgba(255, 0, 0, 0.2); padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">{{ javaChat.code }}</p>
                        <p v-if="javaChat.code === 'javascript'"  style="background: purple; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">{{ javaChat.code }}</p>
                        <p v-if="javaChat.code === 'html'"  style="background: yellowgreen; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">{{ javaChat.code }}</p>
                        <p v-if="javaChat.code === 'cisco'"  style="background: yellowgreen; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">{{ javaChat.code }}</p>
                        <p v-if="javaChat.code === 'huawei'"  style="background: yellowgreen; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">{{ javaChat.code }}</p>
                        <p v-if="javaChat.code === 'mikrotik'"  style="background: yellowgreen; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">{{ javaChat.code }}</p>

                    </div>
                </div>
            </div>
        </div>
        <!-- END Side bar contendo todos os chats do usuario...  -->

        <!--START Modal para a criação de chat -->
        <div class="modal modal-overlay" tabindex="-1" role="dialog" :class="{ 'show': showModal, 'd-block': showModal }">
            <div class="modal-dialog" role="document">
                <div class="modal-content shadow-lg">
                    <div class="modal-header">
                        <h6 class="modal-title">Novo Código</h6>
                        <button class="btn-close" @click="showModal = false"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="createChat">
                            <div class="form-group">
                                <label for="chatTitle">Título:</label>
                                <input type="text" id="chatTitle" class="form-control" placeholder="Escreva um título amigável. Ex.: Clone Whatsapp." v-model="newChat.name"
                                    required />
                            </div>
                            <div class="form-group" style="margin: 7px 0px 7px 0px">
                                <label for="languageSelect" style="margin: 5px 0px 5px 0px;">Linguagem:</label>
                                <select id="languageSelect" class="form-control" v-model="newChat.code">
                                    <option value="" disabled selected style="color: rgb(185, 184, 184);">Seleciona a linguaguem do seu gosto</option>
                                    <option value="java">Java</option>
                                    <option value="python">Python</option>
                                    <option value="c">C para Arduino</option>
                                    <option value="javascript">P5.js *JavaScript</option>
                                    <option value="html">HTML</option>
                                    <option value="cisco">Cisco</option>
                                    <option value="huawei">Huawei</option>
                                    <option value="mikrotik">Mikrotik</option>
                                </select>
                            </div>
                            <div class="modal-footer" style="border: none;">
                                <button type="submit" class="btn"> Criar</button>
                                <button type="button" class="btn">Fechar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!--END Modal para a criação de chat -->


        <div class="flex flex-col text-sm dark:bg-gray-800 h-full" style="margin-left: 180px;">

            <div class="text-center">
                <img src="../../../../assets/img/codemaker.png" alt="" style="width: 400px; height: 300px;">
                <h6>Crie os seus códigos com ajuda de inteligência artificial.</h6>
                <!-- <p style="font-size: 10px;">1. Instale o Java Development Kit (JDK) em seu computador.</p>
                <p style="font-size: 10px;">2. Abra um editor de texto ou uma IDE (Integrated Development Environment), como
                    o Eclipse ou o
                    IntelliJ.</p>
                <p style="font-size: 10px;">3. Escreva o código Java no editor de texto ou IDE.</p>
                <p style="font-size: 10px;">4. Salve o arquivo com a extensão .java.</p>
                <p style="font-size: 10px;"> 5. Abra o prompt de comando ou terminal e navegue até o diretório onde o
                    arquivo .java está salvo.</p>
                <p style="font-size: 10px;">6. Compile o código digitando "javac nomeDoArquivo.java" no prompt de comando ou
                    terminal e pressionando
                    Enter.</p>
                <p style="font-size: 10px;">7. Se não houver erros de compilação, será gerado um arquivo .class.</p>
                <p style="font-size: 10px;">8. Execute o arquivo compilado digitando "java nomeDoArquivo" no prompt de
                    comando ou terminal e
                    pressionando Enter.</p>
                <p style="font-size: 10px;">9. O programa Java será executado e você poderá ver a saída no console.</p> -->

                <p style="font-size: 8px;">Desenvolvido pela Startic, lda</p>
                <p style="font-size: 8px;">Versão: 0.0.1-beta, ultima actualização: 08-2023</p>
            </div>
        </div>
    </div>
</template>

<script>
import CodeMakerComponent from '../../../../components/codeMaker/CodeMakerComponet.vue'
import CodeMakerMenu from '../../../../components/codeMaker/CodeMakerMenu.vue';
import vuejwtdecode from 'vue-jwt-decode';
import codeMakerService from '../../../../services/codeMakerService';
import JavaCodeBlock from '../../../../components/codeMaker/JavaCodeBlock.vue';

export default {

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
                code: '',
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
            javaChat: [
                // { title: "Conversa 1", lastMessage: "Olá, como vai?" },

                // Adicione mais conversas conforme necessário
            ],
            selectedConversationIndex: null,
            code: null

        };
    },

    components: {
        CodeMakerComponent,
        CodeMakerMenu,
        JavaCodeBlock,
    },

    methods: {
        submitFormMessage() { },
        async createChat() {
            // Lógica para criar o novo chat
            try {
                
                const token = localStorage.getItem('jwt');
                const _token = vuejwtdecode.decode(token);
                
                await codeMakerService.javaChat(this.newChat, _token._id, token);
                this.javaChat.unshift(this.newChat)
                
                console.log(this.javaChat);
                
                
                // // Após criar o chat, redefinimos o formulário para o estado original
                this.newChat = {
                    name: '',
                    code: '',
                };
                
                this.showModal = false;
            } catch (error) {
                console.log("error > " + error)
            }


        },
        extractJavaCodeBlocks(code, inputString) {
            // const regex = /```java([\s\S]*?)```/g;
            const regex = new RegExp('```' + code + '([\\s\\S]*?)```', 'g');
            const matches = [];
            let match;

            while ((match = regex.exec(inputString)) !== null) {
                matches.push(match[1]);
            }

            return matches;
        },
        // Outros métodos do chat (como enviar mensagem, etc.)

        //pega todos os chats...
        async getId() {
            this.messages.splice(0, this.messages.length);
            await this.getHistoryJavaChat().then(data => {
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

  

        async selectChat(index) {

            this.messages.splice(0, this.messages.length);
            this.selectedConversationIndex = index;
            
            await this.getHistoryJavaChat().then(data => {
                this.chatHeaderTitle = data[index].name;
                this.code = data[index].code;
                this.message_id = data[index]._id;
                console.log('id message: ' + this.message_id);
                for (let i = 0; i < data[index].messages.length; i++) {
                    this.messages.push(data[index].messages[i]);
                   
                }

                this.$router.push(`/javacodebox/${this.message_id}`);
               

                // this.showChatContainer = true;
            });
            // Adicione a lógica para exibir a conversa selecionada na área de chat principal aqui
        },

        async getHistoryJavaChat() {
            const token = localStorage.getItem('jwt');
            const _token = vuejwtdecode.decode(token);
            const res = await codeMakerService.historyJavaChat(_token._id, token)
                .then(result => {
                    this.javaChat = result;
                    
                    return result.reverse();
                });
                
            return res;
        },

    },
    created() {
        this.getId()
        this.getHistoryJavaChat();
        // console.log(this.messages)
    },
}
</script>

<style scoped>
.menu-container {
    margin: 0px 0px 0px 0px;
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
    max-width: 1200px;
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
    background: #6e6e80;
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
    left: 360px;
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

/* 
.typing-controls {
    display: flex;
}

.typing-controls span {
    margin-left: 7px;
    font-size: 1.2rem;

    background: gray;
    border-radius: 4px;
}
 */

/* side-chat */
.side-chat {
    background: var(--background-color-primary);
    color: var(--text-primary-color);
    width: 240px;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    font-family: Arial, sans-serif;
    position: fixed;
    left: 60px;
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
    border-radius: 10px;
    color: var(--text-primary-color);
}

.conversation:hover {
    background-color: var(--background-color-secondary);
    color: var(--text-primary-color);
}

.avatar{
    width: 30px;
    height: 30px;
    border-radius: 20%;
    padding: 3px;
    border: 2px solid greenyellow;
    margin-right: 10px;
    background: var(--text-secondary-color);
}

.info h5 {
    margin: 0;
    font-size: 14px;
    color: var(--text-primary-color);
}

.info p {
    margin: 0;
    font-size: 10px;
    color: white
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

.btn:hover {
background: var(--accent-color)
}
.conversation.active-conversation {
    background-color: red;
    /* Cor de destaque quando selecionada */
    color: black;
    /* Cor do texto de destaque quando selecionada */
}

</style>