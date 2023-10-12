import swal from "sweetalert";
import Api from "./Api";



export default {
    async loginUser(user){
       try {
        const response = await Api().post('/login', user);
        const { token } = response.data;

        localStorage.setItem('jwt', token);
        if(token){
            // swal({
            //     title:"Excelente!",
            //     text: "Usuario logado com sucesso",
            //     icon: 'success'
            // });
        }

       } catch (error) {
        swal({
            title:"Ooops!",
            text: "Erro ao logar.",
            icon: 'error'
        })
        this.$router.push('/');
       }
    }
}