import ApiInvite from "./ApiInvite";
import swal from "sweetalert";


export default{

    async sendemessage(info){
        try {
           const response = await ApiInvite().post('/sendMessage', info);
           return response.data;

        } catch (error) {
            swal({
                title: "ooops!",
                text:"Não foi possível concluir com acção.",
                icon:"error"
            })
        }
        

    },


    async sendImage(file){
        try {
            
           const response = await ApiInvite().post('/upload', file);
           return response.data;

        } catch (error) {
            swal({
                title: "ooops!",
                text:"Não foi possível concluir com acção.",
                icon:"error"
            })
        }
        

    },

    async verificationCode(data){
        try {

           const response = await ApiInvite().post('/verificationcode', data);
           return response.data;
     
        } catch (error) {
            swal({
                title: "ooops!",
                text:"Não foi possível concluir com acção.",
                icon:"error"
            })
        }
        

    },

}