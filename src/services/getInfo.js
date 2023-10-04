import Api from "./Api";
import swal from "sweetalert";



export default {

    async getScript(_token, _id){
        try {
           const response = await Api().get('/script/' + _id, 
            {
                headers:{
                    Authorization: `Bearer ${_token}`,
                    token: _token
                }
            }
        )
        return response.data;
        } catch (error) {
            swal({
                title:"Ooops!",
                text: "Erro ao pegar as informações no banco de dados.",
                icon: 'error'
            })
        }
    },



    async getUser(_id){
        try {
           
           const response = await Api().get("/"+_id)
           return response.data;
       
        } catch (error) {
            swal({
                title:"Ooops!",
                text: "informações do usuario no banco de dados.",
                icon: 'error'
            })
        }
    },

    async updateAddons(_id, data){
        try {
           const response = await Api().post("/app/whatsapp/web/addons/"+_id, data);
           return response.data;
       
        } catch (error) {
            swal({
                title:"Ooops!",
                text: "informações do usuario no banco de dados.",
                icon: 'error'
            })
        }
    },

    async deleteConta(token, user){
        try {
            const response = await Api().get('/delete/'+user._id, 
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                    token: token
                }
            }
            );
            return response.data;
        } catch (error) {
            swal({
                title: "Ooops!!!",
                text: 'Erro ao tentar deletar a sua conta.',
                icon: 'error'
            })
        }
    },

    async actualizar_usuario(token, user){
        try {
            const response = await Api().post('/actualizar/' + user.id, user, 
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                    token: token
                }
            }
            );
            return response.data;
        } catch (error) {
            swal({
                title: 'Ooops!',
                text: 'Erro ao actualizar os seus dados.',
            })
        }
    },


    async getAllusers(){
        try {
           
           const response = await Api().get("/all/users")
           return response.data;
       
        } catch (error) {
            swal({
                title:"Ooops!",
                text: "informações do usuario no banco de dados.",
                icon: 'error'
            })
        }
    },

    async PasswordReset(user){
        try {
            const response = await Api().post('/password/reset', user);
            return response.data;
        } catch (error) {
            swal({
                title: 'Ooops!',
                text: 'Erro ao actualizar os seus dados.',
            })
        }
    },
}