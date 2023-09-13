import Api from "./Api";
import swal from "sweetalert";



export default {
    async script(_token, _id, data){
        try {
            
            const newScript = await Api().patch('/script/' + _id, data,
            {
                headers: {
                  Authorization:`Bearer ${_token}`,
                  token: _token
                }
              }
            );

            
                swal({
                    title:"Excelente!",
                    text: "Script adicionado com sucesso.",
                    icon: 'success'
                })
            
        } catch (error) {
            swal({
                title:"Ooops!",
                text: "Erro ao addicionar novo script.",
                icon: 'error'
            })
        }
    }
}