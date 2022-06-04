<template >
    <div>
        <h1>
            Le post numéro : {{id}}
        </h1>

        <div>

            <h2>{{articleUnique.title}} </h2>
            <br>
            <p>
                {{articleUnique.body}}
            </p>
        </div>
    </div>
    
</template> 
<script>
import axios from 'axios'

export default{
    
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Post',
    data(){
        return{
            articleUnique:[]
        }
    },
    mounted(){
        axios
        .get(`https://jsonplaceholder.typicode.com/posts/${this.id}`)
        .then(res=>{
            this.articleUnique=res.data
        })
    },
    props:['id']

}

</script>

<style>


</style>