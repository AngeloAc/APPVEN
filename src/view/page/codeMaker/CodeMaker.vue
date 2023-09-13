<template>
    <CodeMakerComponent />
    <CodeMakerMenu />

    <div class="body-container">
    <div>
      <img src="../../../assets/img/codemaker.png" alt="" style="width: 400px;">
    <p class="text-center">A inteligencia artifical para programação.</p>
    <p style="font-size: 12px;" class="text-center">Faça os seus códigos como nunca, sejá criativo e produtivo.</p>
    <p style="font-size: 10px;" class="text-center">Desenvolvido pela Startic, lda</p>  
    <p style="font-size: 10px;" class="text-center">Versão: 0.0.1-beta, ultima actualização: 08-2023</p>  
  </div>
    
  </div>

</template>

<script>
import CodeMakerComponent from '../../../components/codeMaker/CodeMakerComponet.vue'
import CodeMakerMenu from '../../../components/codeMaker/CodeMakerMenu.vue';
export default {
    components: {
        CodeMakerComponent,
        CodeMakerMenu,
    },
}
</script>
````
<style scoped>

.body-container{
  /* background: green; */
    position: fixed;
    left: 120px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.body-container h1{
  font-size: 2.5rem;
   
}

</style>