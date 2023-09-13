import swal from "sweetalert";
import loginService from "../../services/loginService";

export default {
    name: "LoginComponent",
    data() {

        return {
            loginSubmitForm: {
                email: null,
                password: null
            },
            userTheme: "dark-theme",
        };
    },
    methods: {
        loginSubmitUserForm() { },
        async submitLoginUser() {
            try {
                await loginService.loginUser(this.loginSubmitForm);
                this.$router.push('/home');
            } catch (error) {
                swal({
                    title:"Ooops!",
                    text: "Alguma coisa deu errado",
                    icon: 'error'
                })
            }
        },
    
       

       
    },
    mounted(){
       
       },
};