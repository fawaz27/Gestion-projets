<template>
    
    <div class="main-app" >
        <div class="contain">
         <router-view></router-view>
        </div>
    </div>
</template>

<script>



export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'main-app',
    components:{
   
    }

}

</script>

<style scoped>

.main-app{
    background-color: #e6e9ee;
    width: auto;
    height: 100%;
    position: relative;
    margin-left: 280px;
    min-height: 9999999px;
    
  }

.contain{
    
}
</style>