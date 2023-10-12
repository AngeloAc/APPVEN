import Api from "./Api";
import swal from "sweetalert";



export default {

    async sendImageVariation(image) {
        try {
            const response = await Api().post('/uploadvariation', image)

            return response.data;
        } catch (error) {
            swal({
                title: "Ooops!",
                text: "Erro ao pegar as informações no banco de dados.",
                icon: 'error'
            })
        }
    },
}