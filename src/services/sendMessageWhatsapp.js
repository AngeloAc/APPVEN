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
                text:"Something went wrong",
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
                text:"Something went wrong",
                icon:"error"
            })
        }
        

    },

}