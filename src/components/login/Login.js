import swal from "sweetalert";
import loginService from "../../services/loginService";
import SplashScreen from '../../components/widgets/splash/Splash.vue'
import config from "../../../config";

export default {
    name: "LoginComponent",
    data() {

        return {
            loginSubmitForm: {
                telefone: null,
                password: null,
            },
            userTheme: "dark-theme",
            showSplashScreen: true,
            showPassword: false,
        };
    },
    components: {
        SplashScreen
    },
    methods: {

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

        togglePasswordVisibility() {
         
            this.showPassword = !this.showPassword;
           
          },

        loginSubmitUserForm() { },
        async submitLoginUser() {
            this.loginSubmitForm.telefone = this.formatPhoneNumber(this.loginSubmitForm.telefone);
            try {

                await loginService.loginUser(this.loginSubmitForm);
                // this.$router.push('/home');
                this.$router.push('/chat');

            } catch (error) {
                swal({
                    title: "Ooops!",
                    text: "Alguma coisa deu errado",
                    icon: 'error'
                })
            }
        },
        hideSplashScreen() {
            this.showSplashScreen = false;
        }




    },
    mounted() {
        console.log("versão beta: 0.0.1");
       
    },
};