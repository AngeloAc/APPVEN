import swal from "sweetalert";
import loginService from "../../services/loginService";
import SplashScreen from '../../components/widgets/splash/Splash.vue'

export default {
    name: "LoginComponent",
    data() {

        return {
            loginSubmitForm: {
                email: null,
                password: null,
            },
            userTheme: "dark-theme",
            showSplashScreen: true
        };
    },
    components: {
        SplashScreen
    },
    methods: {
        loginSubmitUserForm() { },
        async submitLoginUser() {
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

    },
};