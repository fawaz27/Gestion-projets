<template>
  <div id="app">

    <header-top></header-top>

    <div class="main">
     
      <contenu></contenu>
    </div>

    
    










      
      

    
    
  </div>
</template>

<script>

import HeaderTopVue from "./components/Header/HeaderTop.vue"
//import Sidebar from "./components/Sidebar/Sidebar.vue"
import Contenu from "./components/Contenue/Contenue.vue"


export default {
  name: 'App',
  components: {
    
    //'sidebar':NavVue,
    
    'header-top':HeaderTopVue,
    'contenu':Contenu,
    
    
}
}
</script>

<style scoped>
  .main{
    margin-top: 60px;
  }
  

  
</style>
