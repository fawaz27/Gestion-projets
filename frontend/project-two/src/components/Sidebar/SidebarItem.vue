<template >
    <div>
        <router-link :to="url" exact class="nav-link">
            
                <span>
                        <font-awesome-icon :icon="icone"/>
                </span>
                <span class="text-item">
                    {{txt}}
                </span>
                        
            
        </router-link>
        

    </div>
</template>
<script>

export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'sidebar-item',
    data(){
        return{
            
        }
    },
    props:["txt","icone","status","url"]

}

</script>

<style scoped>
    .router-link-active{
        background: lightblue;
    }
    
    .text-item{
        margin-left: 10px;
        color:black;
    }
    

</style>