
// import swal from "sweetalert";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import 'nprogress/nprogress.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Vuelidate from 'vuelidate';
import './assets/css/style.css'

import VueTelInput from "vue-tel-input";








//import './assets/main.css'

const app = createApp(App)
app.use(VueTelInput);
app.use(Vuelidate);
app.use(router);
app.mount('#app');
