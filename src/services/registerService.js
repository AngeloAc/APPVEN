import swal from "sweetalert";
import Api from "./Api";

export default {
    async registerNewUser(newUser){
        try {
            const response = await Api().post('/register', newUser);
            const { token } = response.data;
            
            if(token){
                localStorage.setItem('jwt', token);
                swal({
                    title:"Excelente!",
                    text: "A SUA SUBSCRIÇÃO FOI SOLICITADA COM SUCESSO!\nESTÁ A UM PASSO PARA DESFRUTAR A STARTIC.",
                    icon: 'success'
                })
            }
        } catch (error) {
            swal({
                title:"Ooops!",
                text: "Erro ao cadastrar novo usuario.",
                icon: 'error'
            })
        }
    }
}