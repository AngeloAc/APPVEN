<template>
    <div>
        <h1>JOBS API</h1>
        <ul>
            <li v-for="job in jobs" :key="job.id">
                <router-link :to="{ name: 'JobDetails', params: { id: job.id }}">
                <h2>{{ job.title }}</h2>
                 </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
   data() {
    return {
        jobs: [
        {title:"Web development", description:"net beam web development 2032",id: 1},
        {title:"mobile development", description:"net beam mobile development 2032",id: 2},
        {title:"desktop development", description:"net beam desktop development 2032",id: 3},
        {title:"iot development", description:"net beam iot development 2032",id: 4},
        {title:"tv development", description:"net beam tv development 2032",id: 5},

    ] 
    }
   },
   methods: {
        openDetails(){
            console.log(this.id)
        }
   },
   mounted() {
        
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