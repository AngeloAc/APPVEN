<template>
  <div class="nav">
    <router-link to="/" >Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/jobs">Jobs</router-link>
  </div>

  <main>
    <router-view></router-view>
  </main>
</template>

<script >
  
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

.fade-enter-from{
  opacity: 0;
  transform: translateX(-60px);
  transform: translateX(60px);
}
.fade-enter-to{
  opacity: 5;
  transform: translateY(0);
}
.fade-enter-active{
  transition: all 1s ease;
}
.fade-leave-from{
  opacity: 2;
  
}
.fade-leave-to{
  opacity: 0;
}
.fade-leave-active{
  transition: all 2s ease;
}


</style>
