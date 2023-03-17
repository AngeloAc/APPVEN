<template>
  <div class="nav">
    <router-link to="/" >Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>

  <div>
    <button @click="changeName">click</button>
  </div>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
  import { ref } from 'vue';
  const msg = ref('hello')
</script>


<style scoped>

.nav a{
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 10px;
  color: #777;
  letter-spacing: 1px;
}
.nav a.router-link-active{
  background: tomato;
}

</style>
