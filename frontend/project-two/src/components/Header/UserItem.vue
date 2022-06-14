<template >
    <div>
        
        <div class="user-avatar">
            <span style="margin-right:10px" > Hi {{username}} </span>
            <div class="dropdown">
                
                <a class="dropdown-toggle" href="#" id="dropdownMenuLink" data-toggle="dropdown" aria-expanded="false">
                    <img :src="img" alt="mdo" width="32" height="32" class="rounded-circle">
                </a>

                <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="#">Users settings</a>
                    <button class="dropdown-item" @click="Out">Logout</button >
                    
                </div>
            </div>
        </div>
        

        

    </div>
</template>
<script>
import { mapMutations } from "vuex";
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'user-item',
    data(){
        return{
            
        }
    },
    methods:{
       ...mapMutations(["LogOut"]), 
       Out(){
          
           this.LogOut();
       }
    },
    props:["username","img"]

}

</script>

<style>

    .user-avatar{
        
        display: flex;
        
    }
    

</style>