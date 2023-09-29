<template>
    <div class="home">

        <Dashboard />
        <Home />
    </div>
</template>

<script>
import Home from '../../../components/home/HomeComponent.vue'
import Dashboard from '../../../components/widgets/dashboard/Dashboard.vue';
export default {
    components: {
        Home,
        Dashboard,
    }
}
</script>

<style scoped>
.home {
    /* background: var(--background-color-secondary); */
    /* height: 100vh; */
    font-family: 'Montserrat', sans-serif;
    font-family: 'Open Sans', sans-serif;
}
</style>