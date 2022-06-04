<template>
    
    <div class="contenu" >
       
        <sidebar></sidebar>
         <signin></signin>
         <signup></signup>
        
         <main-app></main-app>
    </div>
</template>

<script>
import Sidebar from '../Sidebar/Sidebar.vue'
import SigninVue from "../Signin/Signin.vue"
import SignupVue from '../Signup/Signup.vue'
import MainAppVue from './MainApp.vue'
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Contenu',
    components:{
        'signin':SigninVue,
        'signup':SignupVue,
        'sidebar':Sidebar,
        'main-app':MainAppVue,
        Sidebar,
    }

}

</script>

<style scoped>
.contenu-left{
      height: 100%;
      width:100%;
      width: 280px;
      margin-right:280px;
      display: flex;
      z-index: 11;
      overflow: hidden;
      min-width: 280px;
      
      flex: 0 0 280px;
      
      padding-top: 60px;
      transition: all .2s;
      box-shadow: 7px 0 60px rgba(0,0,0,0.05);
}
.contenu{
    background-color: #e6e9ee;
    width: 100%;
    height: 100%;
    
    
  }
</style>