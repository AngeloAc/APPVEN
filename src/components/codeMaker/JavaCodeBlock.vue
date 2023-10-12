<template>
    
        <pre class="java-code-block"><code class="language-java codeStyle">{{ javaCode }}</code></pre>
    
</template>
  
<script>
import 'prismjs/themes/prism.css'; // Importa o estilo do Prism.js
import Prism from 'prismjs'; // Importa o objeto Prism

import 'prismjs/components/prism-java'; // Importa a sintaxe do Java para o Prism

export default {
    props: {
        javaCode: String,
    },
    mounted() {
        Prism.highlightAll(); // Destaca a sintaxe do código após a renderização
    },
};
</script>
  
<style scoped>
.java-code-block {
  background-color: #f7f7f7;
  border: 1px solid greenyellow;
  /* padding: 16px; */
  margin-left: 10px;
  border-radius: 8px;
  overflow: auto;
  width: 500px;

}
.codeStyle{
  font-size: 10px;
  min-width: 500px;
}

@media (max-width: 768px) {
  .java-code-block {
    width: 300px;
    }
  }

/* .java {
    font-family: 'Courier New', monospace;
    font-size: 14px;
  } */
</style>
  