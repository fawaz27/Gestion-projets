<template>
    <div class="liste">
        <ul>
            <li v-for="(task,index) in tasks" v-bind:key="index" >
                <div class="card mt-3">
                    <div class="p-3">
                        <p>{{task}}</p> 
                        <button  v-on:click="DeleteTask(index)" class="btn btn-danger  btn-modale">X</button>
                    </div>
                    
                    
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name:'liste',
        data(){
            return {

            }
        },
        props:["tasks","DeleteTask"]
    }

</script>

<style scoped>
    p{
        text-align: left;
    }
    .btn-modale{
        position: absolute;
        top: 10px;
        right: 10px;

    }
    li{
        list-style-type: none;
    }

</style>