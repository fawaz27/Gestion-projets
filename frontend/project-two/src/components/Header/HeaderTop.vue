<template>
    <div class="header-top">
        <div class="app-header">
            <div class="app-header-left">
                <span style="font-size: 20px;margin-right: 100px;" class="text-uppercase ">
                    Name Site
                </span>
                <span style="cursor:pointer">
                    <font-awesome-icon  icon="fa-bars"/>
                </span>
                
            </div>
            <div class="app-header-right">
                <div class="button-activate-modal" v-if="!isLoggedIn">
                    <button-modale :txt="txt1" :evenement="AppelSignin"></button-modale>
                    <button-modale :txt="txt2" :evenement="AppelSignup" ></button-modale>
                   
                </div>
                
                <div v-else class="user-contain">
                    <user-item :username="username" :img="Img"></user-item>
                </div>
                
            </div>
        </div>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import {bus} from '../../main'
import ButtonModaleVue from "./ButtonModale.vue"
import UserItem from "./UserItem.vue"
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'header-top',
    data(){
        return{
            txt1:'Sign in',
            txt2:'Sign up',
            username:'tata',
            Img:'https://github.com/mdo.png'
            
        
        }
    },
    methods:{
         
        AppelSignin: function(){
            bus.$emit('callsignin',true)

        },
        AppelSignup: function(){
            bus.$emit('callsignup',true)
        }
    },
    computed: {
    ...mapGetters(["isLoggedIn","getusername"])
    },
    components:{
        'button-modale':ButtonModaleVue,
        'user-item':UserItem
    },
    beforeUpdate(){
        this.username=this.getusername;
        //console.log(this.username);
    }

}

</script>

<style scoped>

.app-header-left{
    display: flex;
    align-items: center;
    width: 255px;
    
}
.app-header-right{
    align-items: center;
    display: flex;
    margin-left: auto;
}
.app-header{
    left: 0px;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 1000;
    display: flex;
    align-items: center;
    align-content: center;
    flex: 1;
    padding: 0 1.5rem;
    height: 60px;
    background: #594f8d;
}
.button-activate-modal{
    display: flex;
}


</style>