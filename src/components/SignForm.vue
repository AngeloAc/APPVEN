<template>
   <form @submit.prevent="handeSubmit">
    <label for="">Email</label>
    <input type="email" v-model="email">
    <label for="">Password</label>
    <input type="password" v-model="password">
    <div class="error" v-if="passwordError">{{ passwordError }}</div>
    <label for="">Role</label>
    <select name="" id="" v-model="role">
        <option value="web">Design web</option>
        <option value="mobile">Mobile design</option>
    </select>

    <div>
        <input type="checkbox" value="Eans" v-model="names">
        <label for="">Eans</label>
    </div>

    <div>
        <input type="checkbox" value="Tions" v-model="names">
        <label for="">Tions</label>
    </div>

    <div>
        <input type="checkbox" value="Aonditions" v-model="names">
        <label for="">Aonditions</label>
    </div>

   

    <label for="">Skills</label>
    <input type="text" v-model="tempskill" @keyup="addSkill">
  
    <div v-for="skill in skills" :key="skill" class="pill">
        <span @click="deleteSkill(skill)">{{ skill }}</span> 
    </div>
        
    <div>
        <input type="checkbox" v-model="terms">
        <label for="">Accept terms and conditions</label>
    </div>

    <div class="submit">
       <button>create an account</button> 
    </div>

   </form>
   
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password:'',
            role: 'web',
            terms: false,
            names:[],
            skills: [],
            tempskill:'',
            passwordError:''
        }
    },
    methods:{
        addSkill(e){
            if(e.key === '.' && this.tempskill){
             
                if(!this.skills.includes(this.tempskill)){
                    this.skills.push(this.tempskill);
                }
                this.tempskill = ''
            }
        },
        deleteSkill(skill){
            this.skills = this.skills.filter((item) => {
                return skill != item
            })
            
        },
        handeSubmit(){
            // validate password
            this.passwordError = this.password.length > 5 ? '' : 'Password must be at least 6 chars long'
        }
    }
}
</script>

<style>
form{
    max-width: 420px;
    margin: 30px auto;
    background: white;
    text-align: left;
    padding: 40px;
    border-radius: 10px;
}
label{
    color: #aaa;
    display: inline-block;
    margin: 25px 0 15px;
    font-size: 0.6em;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;
}
input{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;

}
select{
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ddd;
    color: #555;

}
input[type="checkbox"]{
display: inline-block;
width: 16px;
margin: 0 10px 0 0;
position: relative;
top: 2px;
}
.pill{
    display: inline-block;
    margin: 20px 10px 0 0;
    padding: 6px 12px;
    background: #eee;
    border-radius: 20px;
    font-size: 12px;
    letter-spacing: 1px;
    color: #777;
    cursor: pointer;

}
button{
    background: #0b6dff;
    border: 0;
    padding: 10px 20px;
    margin-top: 20px;
    color: white;
    border-radius: 20px;
    cursor: pointer;
}
button:hover{
    background: gray;
}
.submit{
    text-align: center;
}
.error{
    color: red;
    font-size: 10px;
    margin-top: 4px;
    letter-spacing: 1px;
}

</style>