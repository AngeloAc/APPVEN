import Api from "./Api";
import swal from "sweetalert";


export default {
    //codificando em java...
    async Injava(message, _token, _id, message_id){
        try {
            const response = await Api().post('/codejava/'+ _id + "/" + message_id, message, 
            
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
    },

    async javaChat(newChat, token_id, token){
      try {
        await Api().post('/codejavachat/' + token_id, newChat, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                token: token
            }
        }
        
        );
      } catch (error) {
        
      }
        
    
    },

    async historyJavaChat(token_id, token){
        try {
            const res = await Api().get('/codejavachat/history/' + token_id, 
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                    token: token
                }
            });
    
            return res.data;
        } catch (error) {
           
        }
    },

    async deleteCode(token_id, data){
        try {
            const res = await Api().post('/deletecode/' + token_id, data);
    
            return res.data;
        } catch (error) {
           
        }
    }
}