
    // @utor: Euclides de Carvalho
    // data: 15/08/2023
    // Component: REGISTER
    // Abordagem: Este componente renderiza a pagina de Registro. 


import swal from "sweetalert";
import registerService from "../../services/registerService";

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
        async submitRegisterUser(){
           try {
                await registerService.registerNewUser(this.registerForm);
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