
// @utor: Euclides de Carvalho
// data: 15/08/2023
// Component: REGISTER
// Abordagem: Este componente renderiza a pagina de Registro. 


import swal from "sweetalert";
import registerService from "../../services/registerService";
import sendMessageWhatsapp from "../../services/sendMessageWhatsapp";
import { storage } from "../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import vuejwtdecode from 'vue-jwt-decode';

export default {
    name: "RegisterComponent",
    data() {
        return {
            registerForm: {
                name: null,
                email: null,
                password: null,
                telefone: null,
                indicativo: "244",
                validationCode: null
            },
            isValidationCodeValid: false,
            isSenhaValidation: false,
            code: '',
            randomCodeSend: null,
            isSenhaEnable: false,
            isCodeCorrect: false,
            isCodeIncorrect: false,
            showPassword: false,
        };
    },
    methods: {
        registerSubmitUserForm() { },
        gerarNumero() {
            var numero = Math.floor(Math.random() * 90000) + 10000;
            return numero;
        },

        formatPhoneNumber(number) {
            // Remove espaços em branco do número
         const cleanedNumber = number.replace(/\s/g, '');
       
         // Verifica se o número começa com '+244' ou '244'
         const regex = /^(?:\+?244|351|55|238|258)?(.*)$/;
       //   const regex = /^(?:(\+?351|55|238|258)|351|55|238|258)?(.*)$/;
       // const regex = /^(?:(\+?244|244))?(.*)$/;
       
       
         const match = cleanedNumber.match(regex);
       
         // Se houver correspondência, retorna o restante do número sem espaços
         if (match && match[1]) {
           return match[1];
         } else {
           // Se não houver correspondência, retorna null ou uma mensagem de erro, dependendo do requisito
           return null;
         }
               },

        upload() {
            const token = localStorage.getItem('jwt');
            const _token = vuejwtdecode.decode(token);
            const storageRef = ref(storage, `folder/${_token._id}.jpg`);
            const file = "src/assets/img/avatar.png";
            uploadBytes(storageRef, file).then(
                snpashot => {
                    // console.log("upload") 
                }
            )
        },
        async submitRegisterUser() {
            try {
                await registerService.registerNewUser(this.registerForm);
                this.upload();
                this.$router.push('/');
            } catch (error) {
                swal({
                    title: "Ooops!",
                    text: "Alguma coisa deu errado.",
                    icon: 'error'
                })
            }
        },

        async requestValidationCode() {
            // Lógica para solicitar o código de validação pelo WhatsApp
            // ...
            // Defina isValidationCodeValid como verdadeiro se o código for válido
            if (this.registerForm.telefone > 1) {
                const numeroAleatorio = this.gerarNumero();
                const telefone = this.formatPhoneNumber(this.registerForm.telefone,)

                const data = {
                    index: this.registerForm.indicativo,
                    telefone: telefone,
                    randomNumber: numeroAleatorio
                };
                const res = await sendMessageWhatsapp.verificationCode(data)
                    .then(

                        result => {
                            this.randomCodeSend = result.data.randomNumber
                            console.log(result)
                        }
                    )
                    .catch(error => {
                        console.log(error)
                    })


                this.isValidationCodeValid = true;
            } else {
                // console.log('vazio campo telefone')
            }

        },
        requestConfirmation() {
            const r = this.registerForm.validationCode

            if (r == this.randomCodeSend) {
                this.isCodeCorrect = true;
                this.isCodeIncorrect = false;

                this.isSenhaValidation = true
               
            } else {
                this.isCodeCorrect = false;
                this.isCodeIncorrect = true;
              
            }
        },
        togglePasswordVisibility() {
         
            this.showPassword = !this.showPassword;
           
          },

    },
};