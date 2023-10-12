<template>
     <WhatsaapApp />
    <navBarApp />

    <div class="body-container">
  <div>
    <div class="table-controls">
      <button @click="addQuestion" class="btn btn-success" style="margin: 5px; font-size: 12px;">Adicionar Pergunta</button>
      <button @click="importQuestions" class="btn btn-info" style="margin: 5px; font-size: 12px;">Importar Perguntas</button>
    </div>
    <h2>Tabela de Perguntas e Respostas</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Pergunta</th>
          <th>Resposta</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index" style="font-size: 12px;">
          <td>{{ item.question }}</td>
          <td>{{ item.answer }}</td>
          <td><button @click="editItem(index)" class="btn btn-primary" style="font-size: 12px;">Editar</button></td>
          <td><button @click="deleteItem(index)" class="btn btn-danger" style="font-size: 12px;">Deletar</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
</template>

<script>

import WhatsaapApp from '../../../../components/whatsappApp/WhatsappApp.vue';
import navBarApp from '../../../../components/widgets/navBarApp/navbarApp.vue';


export default {
  data() {
    return {
      items: [
        { question: 'Qual é a sua cor favorita?', answer: 'Azul' },
        { question: 'Qual é o seu animal favorito?', answer: 'Cachorro' },
        // ...outras perguntas e respostas...
      ]
    };
  },
  components: {
    WhatsaapApp,
    navBarApp,
  },
  methods: {
    editItem(index) {
      // Lógica para edição do item
      console.log('Editar item', index);
    },
    deleteItem(index) {
      // Lógica para exclusão do item
      console.log('Deletar item', index);
    },
    addQuestion() {
      // Lógica para adicionar uma nova pergunta
      console.log('Adicionar pergunta');
    },
    importQuestions() {
      // Lógica para importar perguntas
      console.log('Importar perguntas');
    }
  }
};
</script>

<style scoped>

.body-container{
  /* background: green; */
    position: fixed;
    left: 120px;
    width: 100%;
    height: 100%;
    padding-top: 20px;
    display: flex;
    /* align-items: center; */
    justify-content: center;
}
.body-container h1{
  font-size: 2.5rem;
   
}
.table-controls {
  margin-bottom: 20px;
}
</style>
