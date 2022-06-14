<template>
    <div class="liste">
        <h1>Test</h1>
        <ul>
            <li v-for="(partner,index) in partners" v-bind:key="index" >
                <div class="card mt-3">
                    <div class="p-3">
                        <p>Nom : {{partner.partner.name}} </p>
                        <p>Prenom : {{partner.partner.prenom}} </p>
                        <button  v-on:click="DeleteTask(index)" class="btn btn-danger  btn-modale">X</button>
                    </div>
                    
                    
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        // eslint-disable-next-line vue/multi-word-component-names
        name:'liste',
        data(){
            return {
                partners:[]
            }
        },
        mounted(){
            axios
            .get('http://localhost:3000/partners')
            .then(res=>{
                this.partners=res.data
                console.log(res.data);
                
            })
        
        }
        
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