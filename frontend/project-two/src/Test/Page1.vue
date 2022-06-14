<template >

    <div>
        <h1>Les articles de blog</h1>
    <hr>
    <ul>
        <li v-for="(article,index) in allArticles" v-bind:key="index" >
        
            <router-link  :to ="`/blogpost/${index+1}`">
                <div class="card m-2">
                    <h3>{{article.title}}</h3>
                </div>
            </router-link>
        
        
        
        </li>
    </ul>
    </div>
    
</template>
<script>
import axios from 'axios'
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Page1',
    data(){
        return {
            allArticles:[]
        }
    },
    created(){
        axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then(res=>{
            for(const blogpost of res.data){
                this.allArticles.push(blogpost)
            }
        })
    }

}

</script>

<style>


</style>