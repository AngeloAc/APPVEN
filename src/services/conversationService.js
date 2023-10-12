import Api from "./Api";
import swal from "sweetalert";


export default{
    async conversations (data, id, token){
        try {
            const res = await Api().post('/conversation/'+id, data, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    token: token
                }
            }
            );
            // console.log(res.data);
        } catch (error) {
            swal({
                title: "Ooops!",
                text: "Alguma coisa correu mal ao criar o chat.",
                icon: "error"
            })
        }
    },

    async historyChat(id, token){
        try {
            const res = await Api().get('/c/history/' + id, 
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                    token: token
                }
            });
            return res.data;
        } catch (error) {
            swal({
                title: "Ooops!",
                text: "Alguma coisa correu mal ao criar o chat.",
                icon: "error"
            })
        }
    },

    async delete (id, data){
        try {
    
           const res =  await Api().post('/deleteconversation/'+id, data);
           return res.data;
            
        } catch (error) {
            swal({
                title: "Ooops!",
                text: "Alguma coisa correu mal ao criar o chat.",
                icon: "error"
            })
        }
    },
}