import Api from "./Api";
import swal from "sweetalert";


export default{

    async install(data){
     try {
        const response = await Api().post('/app/whatsapp/web/install', data);
        return response.data;
     } catch (error) {
        swal({
            title: 'Ooops!',
            text: "Something went worng",
            icon: 'error'
        });
     }
    },

    async connect(data){
        try {
           const response = await Api().post('/app/whatsapp/web/connect', data);
           console.log(response.data)
           return response.data;
        } catch (error) {
           swal({
               title: 'Ooops!',
               text: "Something went worng",
               icon: 'error'
           });
        }
       },

}