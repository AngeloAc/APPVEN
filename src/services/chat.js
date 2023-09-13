import Api from "./Api";
import swal from "sweetalert";


export default {
    async getReplay(message, _token, _id, message_id){
        try {
            const response = await Api().post('/chat/' + _id + "/" +message_id, message, 
            
            {
                headers: {
                    Authorization: `Bearer ${_token}`,
                    token: _token
                }
            }
            );
            console.log(response.data)
            return response.data;
    
        } catch (error) {
            swal({
                title: "Ooops!",
                message: "Erro ao pegar a resposta",
                icon: "error"
            })
        }       
    }
}