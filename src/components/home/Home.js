import vueJwtDecode from 'vue-jwt-decode';
import Navbar from '../widgets/navbar/Navbar.vue';
import Dashboard from '../widgets/dashboard/Dashboard.vue';
export default {
    name: "HomeComponent",
    data(){
        return{
            user:{},
            currentSection: 'dashboard'
        };
    },
    components:{
        Navbar,
        Dashboard,
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
        navigatorDashboard(){
            
        },
        showSection(section){
            this.currentSection = section;
            console.log(this.currentSection);
        },
        
    },
        created() {
        this.getUser();
     
    },

    
    
};