
<template>

    <div class="container mt-5">

        <h1> Rentrer vos choses à faire.</h1>
        
        <form >

            <div class="form-group">
                <label for="action" >Action</label>
                 <input v-model="task" type="text" id="actin" class="form-control">
            </div>
            <button v-on:click.prevent="AddTask" class="btn btn-primary mt-3">Créer une tâche</button>
        </form>
        <br><br><br>

        <liste :tasks="tasks" :DeleteTask="DeleteTask"></liste>
        
    </div>


</template>

<script>

    
    import List from './List.vue'
    export default {
    
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'api',
    data(){
        return {
            
                task:'',
                tasks:["BDD","Postgres","Modèle","Vue"]
            }
            
            
        
    
    },
    methods: {
        AddTask:function(){
            this.tasks.push(this.task)
            this.task=''
            
        },
        DeleteTask:function(id){
            this.tasks.splice(id,1)
        }
        
    },
    
    components:{
        'liste':List
    },

    

    }

</script>


<style scoped>

label,button{
    float:left;

}
.card{
    text-align: left;
}
</style>
