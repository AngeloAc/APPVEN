
    // @utor: Euclides de Carvalho
    // data: 15/08/2023
    // Component: REGISTER
    // Abordagem: Este componente renderiza a pagina de Registro. 


import swal from "sweetalert";
import registerService from "../../services/registerService";
import { storage } from "../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import vuejwtdecode from 'vue-jwt-decode';

export default {
    name: "RegisterComponent",
    data(){
        return{
            registerForm:{
                name: null,
                email: null,
                password: null,
                telefone: null
            }
        };
    },
    methods: {
        registerSubmitUserForm(){},
        upload(){
            const token = localStorage.getItem('jwt');
            const _token = vuejwtdecode.decode(token);
            const storageRef = ref(storage, `folder/${_token._id}.jpg`);
            const file  = "https://placehold.co/600x400.png";
            uploadBytes(storageRef, file).then(
              snpashot =>{
                // console.log("upload") 
              }
            )
          },
        async submitRegisterUser(){
           try {
                await registerService.registerNewUser(this.registerForm);
                this.upload();
                this.$router.push('/');
            } catch (error) {
            swal({
                title:"Ooops!",
                text: "Alguma coisa deu errado.",
                icon: 'error'
            })
           }
        }  

    },
};