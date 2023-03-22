<template>
    <div>
        <h1>JOBS API</h1>
        <div v-if="jobs.length">
            <ul>
            <li v-for="job in jobs" :key="job.id">
                <router-link :to="{ name: 'JobDetails', params: { id: job.id }}">
                <h2>{{ job.title }}</h2>
                 </router-link>
            </li>
        </ul>
        </div>
      <div v-else>
        <p> Carregando os dados</p>
      </div>
    </div>
</template>

<script>
export default {
   data() {
    return {
        jobs: []
    }
   },
   methods: {
        openDetails(){
            console.log(this.id)
        }
   },
   mounted() {
        fetch('http://localhost:3000/jobs').
        then(res => res.json()).
        then(data => this.jobs = data).
        catch(error => console.log(error.message));
   },
}
</script>

<style>
li{
    color:black;
    list-style-type: none;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background: #fff;
    margin: 10px auto;
    cursor: pointer;
    max-width: 600px ;
}

li:hover{
    background: burlywood;
}

a{
    text-decoration: none;
    color: #777;
    font-size: 12px;
}

</style>