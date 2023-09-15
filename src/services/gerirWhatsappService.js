import APIWWJS from "./APIWW";
import swal from "sweetalert";


export default{

    async getQRCODE(porta){
        try {
           const response = await APIWWJS(porta).get('/qrcode');
           return response.data;

        } catch (error) {
            swal({
                title: "ooops!",
                text:"Something went wrong",
                icon:"error"
            })
        }
        

    },

    async desconnect(porta){
        try {
           const response = await APIWWJS(porta).get('/client/logout');
           console.log(response.data)
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