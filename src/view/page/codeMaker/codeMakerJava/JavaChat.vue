<template>
    <CodeMakerComponent />
    <!-- <CodeMakerMenu /> -->
    <div class="menu-container">

        <!-- START Side bar contendo todos os chats do usuario...  -->
        <div class="side-chat shadow-lg">
            <div class="header">
                <h3>Pro.ai</h3>
                <button class="create-chat-btn" @click="callCreateNewChat">+ Criar chat</button>
            </div>


            <div v-if="loading" class="loading-container">
                <div class="loading-indicator"></div>
            </div>
            <div class="conversation-list">
                <!-- Verifica se o array conversations está vazio -->
                <div v-if="javaChat.length === 0" class="empty-conversations">
                    <!-- Exibe a mensagem "Nenhuma conversa iniciada..." -->
                    <p>Toque no lápis para iniciar um novo chat</p>
                    <img src="../../../../assets/img/codemaker.png" alt="" class="chat-phone">
                    <p style="font-size: 8px;">Versão: 0.0.1-beta</p>
                </div>

                <!-- Lista de conversas -->
                <div v-else>

                    <div class="conversation" v-for="(javaChat, index) in javaChat" :key="index">
                        <div style="display: flex; width: 100%;">
                            <svg v-if="javaChat.code === 'java'" class="avatar" xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M277.74 312.9c9.8-6.7 23.4-12.5 23.4-12.5s-38.7 7-77.2 10.2c-47.1 3.9-97.7 4.7-123.1 1.3-60.1-8 33-30.1 33-30.1s-36.1-2.4-80.6 19c-52.5 25.4 130 37 224.5 12.1zm-85.4-32.1c-19-42.7-83.1-80.2 0-145.8C296 53.2 242.84 0 242.84 0c21.5 84.5-75.6 110.1-110.7 162.6-23.9 35.9 11.7 74.4 60.2 118.2zm114.6-176.2c.1 0-175.2 43.8-91.5 140.2 24.7 28.4-6.5 54-6.5 54s62.7-32.4 33.9-72.9c-26.9-37.8-47.5-56.6 64.1-121.3zm-6.1 270.5a12.19 12.19 0 0 1-2 2.6c128.3-33.7 81.1-118.9 19.8-97.3a17.33 17.33 0 0 0-8.2 6.3 70.45 70.45 0 0 1 11-3c31-6.5 75.5 41.5-20.6 91.4zM348 437.4s14.5 11.9-15.9 21.2c-57.9 17.5-240.8 22.8-291.6.7-18.3-7.9 16-19 26.8-21.3 11.2-2.4 17.7-2 17.7-2-20.3-14.3-131.3 28.1-56.4 40.2C232.84 509.4 401 461.3 348 437.4zM124.44 396c-78.7 22 47.9 67.4 148.1 24.5a185.89 185.89 0 0 1-28.2-13.8c-44.7 8.5-65.4 9.1-106 4.5-33.5-3.8-13.9-15.2-13.9-15.2zm179.8 97.2c-78.7 14.8-175.8 13.1-233.3 3.6 0-.1 11.8 9.7 72.4 13.6 92.2 5.9 233.8-3.3 237.1-46.9 0 0-6.4 16.5-76.2 29.7zM260.64 353c-59.2 11.4-93.5 11.1-136.8 6.6-33.5-3.5-11.6-19.7-11.6-19.7-86.8 28.8 48.2 61.4 169.5 25.9a60.37 60.37 0 0 1-21.1-12.8z" />
                            </svg>
                            <svg v-if="javaChat.code === 'python'" class="avatar" xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z" />
                            </svg>
                            <svg v-if="javaChat.code === 'c'" class="avatar" xmlns="http://www.w3.org/2000/svg" height="1em"
                                viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M329.1 142.9c-62.5-62.5-155.8-62.5-218.3 0s-62.5 163.8 0 226.3s155.8 62.5 218.3 0c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3c-87.5 87.5-221.3 87.5-308.8 0s-87.5-229.3 0-316.8s221.3-87.5 308.8 0c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0z" />
                            </svg>
                            <svg v-if="javaChat.code === 'javascript'" class="avatar" xmlns="http://www.w3.org/2000/svg"
                                height="0.75em"
                                viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z" />
                            </svg>
                            <svg v-if="javaChat.code === 'html'" class="avatar" xmlns="http://www.w3.org/2000/svg"
                                height="0.625em"
                                viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" />
                            </svg>
                            <svg v-if="javaChat.code === 'cisco'" class="avatar" xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M256 64H384v64H256V64zM240 0c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h48v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96v32H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H240c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H192V288H448v32H400c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H512V288h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V192h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H240zM96 448V384H224v64H96zm320-64H544v64H416V384z" />
                            </svg>
                            <svg v-if="javaChat.code === 'huawei'" class="avatar" xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M256 64H384v64H256V64zM240 0c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h48v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96v32H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H240c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H192V288H448v32H400c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H512V288h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V192h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H240zM96 448V384H224v64H96zm320-64H544v64H416V384z" />
                            </svg>
                            <svg v-if="javaChat.code === 'mikrotik'" class="avatar" xmlns="http://www.w3.org/2000/svg"
                                height="1em"
                                viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                                <path
                                    d="M256 64H384v64H256V64zM240 0c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48h48v32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h96v32H80c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H240c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H192V288H448v32H400c-26.5 0-48 21.5-48 48v96c0 26.5 21.5 48 48 48H560c26.5 0 48-21.5 48-48V368c0-26.5-21.5-48-48-48H512V288h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H352V192h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48H240zM96 448V384H224v64H96zm320-64H544v64H416V384z" />
                            </svg>
                            <div style="display: flex; width: 100%; justify-content: space-between;">
                                <div class="info" @click="selectChat(index)">
                                    <div>
                                        <h5>{{ javaChat.name }}</h5>
                                        <p v-if="javaChat.code === 'java'"
                                            style="background: green; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">
                                            {{ javaChat.code }}</p>
                                        <p v-if="javaChat.code === 'python'"
                                            style="background: blue; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">
                                            {{ javaChat.code }}</p>
                                        <p v-if="javaChat.code === 'c'"
                                            style="background: rgba(255, 0, 0, 0.2); padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">
                                            {{ javaChat.code }}</p>
                                        <p v-if="javaChat.code === 'javascript'"
                                            style="background: purple; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">
                                            {{ javaChat.code }}</p>
                                        <p v-if="javaChat.code === 'html'"
                                            style="background: yellowgreen; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">
                                            {{ javaChat.code }}</p>
                                        <p v-if="javaChat.code === 'cisco'"
                                            style="background: yellowgreen; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">
                                            {{ javaChat.code }}</p>
                                        <p v-if="javaChat.code === 'huawei'"
                                            style="background: yellowgreen; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">
                                            {{ javaChat.code }}</p>
                                        <p v-if="javaChat.code === 'mikrotik'"
                                            style="background: yellowgreen; padding: 2px; font-size: 8px; border: none; border-radius: 5px; text-align: center; width: 42px;">
                                            {{ javaChat.code }}</p>

                                    </div>
                                    <div>
                                        <div style="font-size: 8px; color: gray;">{{ javaChat.messages.length > 0
                                            ? javaChat.messages[javaChat.messages.length - 1].time
                                            : '' }}</div>

                                    </div>
                                </div>

                                <div @click="deleteConversation(index, javaChat._id)">
                                    <i class="bi bi-trash" style="color: var(--text-primary-color); font-size: 20px;"></i>

                                </div>


                            </div>
                        </div>
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
                                <input type="text" id="chatTitle" class="form-control"
                                    placeholder="Escreva um título amigável. Ex.: Clone Whatsapp." v-model="newChat.name"
                                    required />
                                <p style="padding: 5px; font-size: 10px; color: green;">* {{ displayText }}</p>
                            </div>
                            <div class="form-group" style="margin: 7px 0px 7px 0px">
                                <label for="languageSelect" style="margin: 5px 0px 5px 0px;">Linguagem:</label>
                                <select id="languageSelect" class="form-control" v-model="newChat.code">
                                    <option value="" disabled selected style="color: rgb(185, 184, 184);">Seleciona a
                                        linguaguem do seu gosto</option>
                                    <option value="java">Java</option>
                                    <option value="python">Python</option>
                                    <option value="c">C para Arduino</option>
                                    <option value="javascript">P5.js *JavaScript</option>
                                    <!-- <option value="p5js">P5 js</option> -->
                                    <option value="html">HTML</option>
                                    <option value="cisco">Cisco</option>
                                    <option value="huawei">Huawei</option>
                                    <option value="mikrotik">Mikrotik</option>
                                </select>
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

   
            <div class="chat-container" ref="chatContainer">
            <div class="text-salute"><i class="bi bi-tools"></i> Seja bem vindo ao novo Chat Code, use palavras claras e
                simples. Agora poderás gerar programas com interface gráfica.</div>

            <div v-if="loading" class="loading-container">
                <div class="loading-indicator"></div>
            </div>
            <!-- Verifica se o array conversations está vazio -->
            <div v-if="messages.length === 0" class="empty-conversations">
                <!-- Exibe a mensagem "Nenhuma conversa iniciada..." -->
                <p class="badge bg-white m-2" style="color: black; font-weight: normal;">Faça um codigo que lê os números
                    primos <i>135</i> </p>
                <p class="badge bg-white m-2" style="color: black; font-weight: normal;">Faça um programa com interface
                    gráfica que ... <i class="bi bi-laptop"></i></p>
                <p class="badge bg-white m-2" style="color: black; font-weight: normal;">Faça um programa com interface
                    gráfica para o jogo da cobra <i class="bi bi-controller"></i></p>
                <p class="badge bg-white m-2" style="color: black; font-weight: normal;">Faça um site elegante e responsivo
                    para uma escola ... <i class="bi bi-book"></i></p>

            </div>
            <div>
                <div v-for="(message, index) in messages" :key="index" class="chat"
                    :class="{ outgoing: message.isUser, incoming: !message.isUser }">
                    <div class="chat-content">
                        <div class="chat-details">
                            <img :src="url" alt="" v-show="message.isUser">
                            <img src="../../../../assets/img/bot.png" alt="" v-show="!message.isUser">


                            <div v-if="!message.isTyping" class="">
                                <JavaCodeBlock :class="{ 'd-none': message.isUser }" :javaCode="message.text" />
                                <p :class="{ 'd-none': !message.isUser }" style=" background-color: #f7f7f7;
                            border: 1px solid greenyellow;
                            color: black;
                            margin-left: 10px;
                            border-radius: 8px">{{ message.text }}</p>
                            </div>
                            <div v-else class="typing-animation">
                                <div class="typing-dot" style="--delay: 0.2s"></div>
                                <div class="typing-dot" style="--delay: 0.3s"></div>
                                <div class="typing-dot" style="--delay: 0.4s"></div>
                            </div>
                        </div>
                        <div class="copyanddownload" v-show="!message.isUser">
                            <span class="icon-actions" @click="copyCode(message.text)"
                                :class="{ 'checkmark-icon': copied }">
                                <i :class="iconCopy"></i>
                            </span>
                            <span class="icon-actions" @click="downloadCode(message.text)">
                                <i class="bi bi-download"></i>
                            </span>
                            <span class="icon-actions-bug" @click="toggleSidebarRight">
                                <i class="bi bi-bug"></i>
                            </span>

                        </div>



                    </div>
                </div>
            </div>

        </div>



        <div class="typing-container" tabindex="-1">
            <div class="typing-content">
                <div class="typing-textarea">
                    <textarea v-model="inputMessage" @keyup.enter="sendMessage" id="chat-input"
                        placeholder="Escreva a instrução do seu codigo..." required></textarea>
                    <span @click="sendMessage"><img src="../../../../assets/img/send.png" style="height: 20px;"
                            alt=""></span>
                </div>
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
import { storage } from "../../../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
            code: null,
            copied: false,
            iconCopy: 'bi bi-clipboard',
            loading: false,
            path: 'folder/2.jpg',
            url: 'https://placehold.co/400',
            file: '',
            textArray: [
                'Sujestão: Algoritmos',
                'Sujestão: Meus códigos em HTML',
                'Sujestão: Meus códigos em  Java',
                'Sujestão: Meus códigos em  Python',
                'Sujestão: Configuração de Mikrotik R1',
                'Sujestão: Calculadora usando HTML',
                'Sujestão: Jogo da Cobra com interface grafica',
                'Sujestão: Jogo da Velha'
            ],
            fullText: '',
            displayText: '',
            currentIndex: 0,
            isSidebarRightOpen: true,

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
                this.javaChat.unshift(this.newChat);

                // // Após criar o chat, redefinimos o formulário para o estado original
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

        callCreateNewChat() {
            this.showModal = true;
            this.typeANewTextRandom(this.textArray)
            this.typeText();
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
                    const codeInJava = await codeMakerService.Injava(this.data, _token, token._id, this.message_id)
                        .then(res => {
                            const javaCodeBlocks = this.extractJavaCodeBlocks(this.code, res.resposta);

                            // Verifica se o array possui elementos
                            if (javaCodeBlocks.length === 0) {
                                this.messages.pop(); // Remova a mensagem de digitação
                                this.messages.push({ text: 'Por favor, reformule a pergunte usando termos mais explicitos e direito.', isUser: false, isTyping: false });
                            } else {
                                this.messages.pop(); // Remova a mensagem de digitação
                                this.messages.push({ text: javaCodeBlocks[0], isUser: false, isTyping: false });
                            }

                        });

                }
            } catch (error) {
                console.log(error)
            }
        },

        scrollChatToBottom() {
            // Role a div de mensagens para o final.
            const chatContainer = this.$refs.chatContainer;
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        },
        async getId() {
            // console.log('me');
            this.messages.splice(0, this.messages.length);
            await this.getHistoryJavaChat().then(data => {
                for (let i = 0; i < data.length; i++) {
                    const element = data[i];

                    if (this.id === element._id) {
                        this.chatHeaderTitle = element.name;
                        for (let i = 0; i < element.messages.length; i++) {
                            this.messages.push(element.messages[i]);


                        }
                        break;
                    }

                }

            });
            this.loading = false;
        },
        async selectChat(index) {
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

            await this.getHistoryJavaChat().then(data => {
                this.chatHeaderTitle = data[index].name;
                this.code = data[index].code;
                this.message_id = data[index]._id;
                for (let i = 0; i < data[index].messages.length; i++) {
                    this.messages.push(data[index].messages[i])


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
                    // this.loading = false;
                    return result.reverse();
                });
            return res;
        },
        async initWithId() {

            this.message_id = this.id;


            await this.getHistoryJavaChat().then(data => {

                for (var i = 0; i < data.length; i++) {

                    if (data[i]._id === this.id) {
                        this.code = data[i].code;
                        break
                    }
                }
                // this.showChatContainer = true;
            });
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

        downloadCode(code) {
            // Crie um elemento de link temporário
            const tempLink = document.createElement('a');

            // Crie um arquivo HTML com o conteúdo do código
            const htmlContent = code;
            //`<!DOCTYPE html>
            // <html lang="en">
            // <head>
            //   <meta charset="UTF-8">
            //   <meta http-equiv="X-UA-Compatible" content="IE=edge">
            //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
            //   <title>Code Download</title>
            // </head>
            // <body>
            //   <pre><code>${code}</code></pre>
            // </body>
            // </html>`;

            // Crie um Blob com o conteúdo HTML
            const blob = new Blob([htmlContent], { type: 'text/html' });
            console.log(this.code)
            // Defina o atributo "href" do elemento de link temporário para o URL do Blob
            tempLink.href = URL.createObjectURL(blob);

            // Defina o atributo "download" para o nome do arquivo desejado
            switch (this.code) {
                case 'python':
                    tempLink.download = 'code.py';
                    break;
                case 'javascript':
                    tempLink.download = 'code.js';
                    break;
                case 'java':
                    tempLink.download = 'code.java';
                    break;
                case 'c':
                    tempLink.download = 'code.ino';
                    break;
                case 'html':
                    tempLink.download = 'code.html';
                    break;

                default:
                    tempLink.download = 'config.txt';
                    break;
            }


            // Clique no elemento de link temporário para iniciar o download
            tempLink.click();

            // Libere o URL do Blob
            URL.revokeObjectURL(tempLink.href);
        },

        async deleteConversation(index, conversationID) {


            const token = localStorage.getItem('jwt');
            const _token = vuejwtdecode.decode(token);
            this.selectedConversationIndex = index;

            const data = {
                index: index,
                conversationID: conversationID
            };


            await codeMakerService.deleteCode(_token._id, data)
                .then(
                    res => {
                        this.$router.push('/codejava')
                    }
                ).catch(error => {
                    console.log(error);
                })

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

        toggleSidebarRight() {
            console.log("open")
            this.isSidebarRightOpen = !this.isSidebarRightOpen;
        },



    },

    mounted() {
        this.loading = true;
        this.initWithId();
        this.getId();
        this.getHistoryJavaChat();
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
            );

    },
}
</script>

<style scoped>
.menu-container {
    background: var(--background-color-secondary);
    color: var(--text-primary-color);
    font-size: 10px;
    height: 100vh;
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
}

.output-text {
    white-space: pre-wrap;
    /* Outras propriedades de estilo conforme necessário */
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
    background: green;
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
    font-family: Söhne, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica Neue, Arial, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    font-variation-settings: normal;
    line-height: 1.5;
    tab-size: 4;
    padding: 10px 10px 10px 15px;
}

span {
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

.text-salute {
    margin: 20px;
    padding: 12px;
    background: rgb(138, 165, 135);
    border: none;
    border-radius: 10px;
    text-align: center;
    color: white;
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


/* side-chat */
.side-chat {
    width: 240px;
    height: 100%;
    padding: 10px;
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
    width: 100%;
}

.conversation:hover {
    background-color: var(--background-color-secondary);
    color: var(--text-primary-color);
}

.avatar {
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
    color: white;
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

.icon-actions {
    /* Estilo padrão do ícone antes da cópia */
    /* Adicione seu estilo de ícone aqui */
    color: var(--text-primary-color);


}

.icon-actions-bug {
    color: orange;
}

.icon-actions i,
.icon-actions-bug i {
    font-size: 18px;
    border: none;

}

.icon-actions i:hover,
.icon-actions-bug i:hover {
    /* box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); */
    color: var(--accent-secondary-color);
}


.checkmark-icon {
    /* Estilo do ícone após a cópia com sucesso */
    /* Adicione seu estilo de ícone após a cópia com sucesso aqui */
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
    background-color: rgb(205, 225, 192);
    /* Cor de destaque quando selecionada */
    color: white;
    /* Cor do texto de destaque quando selecionada */
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
    margin-left: 20px;
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
    .side-chat {
        display: none;
    }

    .copyanddownload {
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


/* Adicione este código CSS para o sidebar-right */

/* Estilo para o sidebar-right */
.sidebar-right {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 100;
    z-index: 2;
    /* background-color: #f8f9fa; */
    overflow-x: hidden;
    padding-top: 60px;
    transition: 0.5s;
    box-shadow: -2px 0 5px 0 rgba(0, 0, 0, 0.1);
}

/* Estilo para o conteúdo dentro do sidebar-right */
.sidebar-right-content {
    padding: 20px;
}

/* Estilo para o botão de fechar o sidebar-right */
.close-sidebar-right {
    position: absolute;
    top: 10px;
    right: 25px;
    font-size: 30px;
    cursor: pointer;
}

/* Estilo para o ícone de bug no sidebar-right */
.icon-actions-bug {
    cursor: pointer;
}

/* Estilo para a animação de entrada do sidebar-right */
.sidebar-right.slideIn {
    width: 300px;
}

/* Estilo para a animação de saída do sidebar-right */
.sidebar-right.slideOut {
    width: 0;
}

/* Adicione este código para o botão que abre o sidebar-right */
#openSidebarRight {
    position: fixed;
    right: 20px;
    top: 20px;
    font-size: 30px;
    cursor: pointer;
}

/* Estilo para o botão de abrir o sidebar-right */
#openSidebarRight:hover {
    color: #007bff;
}
</style>