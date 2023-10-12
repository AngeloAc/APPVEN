import vueJwtDecode from 'vue-jwt-decode';
import Navbar from '../widgets/navbar/Navbar.vue';

export default {
    name: "CodeMaker",
    data(){
        return{
            user:{},
            currentSection: 'dashboard'
        };
    },
    components:{
        Navbar,

    },
    methods: {
         getUser(){
            let token = localStorage.getItem('jwt');
            let tokenDecoded = vueJwtDecode.decode(token);
            this.user = tokenDecoded;
        },
        logOutUser(){
            localStorage.removeItem('jwt');
            this.$router.push('/')
        },

        showSection(section){
            this.currentSection = section;
            console.log(this.currentSection);
        }
    },
        created() {
        this.getUser();
     
    },

    
    
};