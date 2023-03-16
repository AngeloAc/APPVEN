<template>
    <div class="backdrop" @click.self="closeModal">
        <div class="modal" :class="{darkTheme: theme === 'true'}" >
            <!-- <h1>{{ setTitle }}</h1>
            <p>{{ setContent }}</p>
            <p>{{ setNumber }}</p> -->
            <slot></slot>
            <div class="actions">
                <slot name="links"></slot>
            </div>
        </div>  
    </div>
</template>

<script>
export default {
    props: ['setTitle', 'setContent', 'setNumber', 'theme'],
    data() {
        return {
            
        }
    },
    methods: {
        closeModal(){
            this.$emit('callFuntion');
        }
    },
}
</script>

<style scoped>

.modal{
    width: 400px;
    padding: 20px;
    margin: 100px auto;
    background: white;
    border-radius: 10px;
    color: gray;
}
.backdrop{
    top: 0;
    position: fixed;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
}
.modal .actions{
    text-align: center;
    padding: 20px;
}
.modal .actions a{
   
}

h1{
    color: inherit;
    text-align: center;
    width: 100%;
}
.modal.darkTheme{
    background: red;
    color: white;
}



</style>