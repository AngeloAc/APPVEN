<script setup>

</script>

<template>
 
  <nav class="nav">
    <h1 class="logo">Logo</h1>
    <div class="menu">
      <a href="">Home</a>
      <a href="">Sobre nos</a>
      <a href="">Servicos</a>
      <a href="">Fale conosco</a>
    </div>
  </nav>
    
</template>

<style scoped>

  *{
    margin: 0;
    box-sizing: border-box;
    padding: 0;
  }
  .nav{
    display: flex;
    flex-flow: row wrap;
    border: 1px solid red;
  }
  .logo{
    flex: 20%;
  }
  .menu{
    flex: 80%;
  }
  

</style>
