<template>
    <div>
        <new-module v-on:addnewmodule=" Addnewmodule($event)"></new-module>
        <h1>{{title}}</h1>
        <div class="d-flex justify-content-between p-2 mb-4">
            <div>
                <input type="search" v-model="searchKey" id="search " placeholder="Search ...">
            </div>
            <div>

                    <div class="btn-group" role="group">
                        <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Perform some action
                        </button>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left" aria-labelledby="btnGroupDrop1">
                        <button class="dropdown-item" @click="AppelNewModule" >New Module</button>
                        <button class="dropdown-item">Dropdown link</button>
                        </div>
                    </div>
                
            </div>
            

        </div>
        
        <div class="contain">
            <div class="row" v-if="modules!=[]">
            
                
                 <div class="col-md-4 mt-3 " v-for="(module,index) in filtre" v-bind:key="index" >
                    <router-link :to=GenerateLink(module.module.name) class="cardf">
                        <div >
                        <div class="card ">
                        <div class="card-body">
                            <h5 class="card-title" style="  text-transform  : uppercase">{{module.module.name}}</h5>
                            <p class="card-text">
                                <small class="text-muted">Created {{DateDifference(new Date(module.module.datecreate))}} ago</small>
                            </p>
                        </div>
                        </div>
                    </div>
                    </router-link>
                    
                    
                   
                
                </div>
               
            
            
            </div>
        </div>
        
        
        
    </div>
</template>

<script>
import NewModuleVue from './NewModule.vue'
import axios from 'axios'
import {bus} from '../../main'
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'home',
    data(){
        return{
            title:'Home',
            searchKey:'',
            modules:[]
        }
    },
    
    methods:{

       AppelNewModule(){
           
           bus.$emit('callnewmodule',true)
       },
       Addnewmodule(data){
          
           this.modules.push(data);
       },
       GenerateLink(name){
           return "/"+name
       },
       DateDifference(date){
            var now =new Date();
            if(date.getFullYear()!=now.getFullYear()){
                return (now.getFullYear()-date.getFullYear())+' years';
            }
            else if(date.getMonth()!=now.getMonth()){
                return (now.getMonth()-date.getMonth())+' months';
            }
            else if( date.getMonth()==now.getMonth() &&  date.getDay()!=now.getDay()){
                var Diff_temps = now.getTime() - date.getTime(); 
                var Diff_jours = Diff_temps / (1000 * 3600 * 24); 

                return Math.round(Diff_jours)+' days';
            }
            else if(date.getHours()!=now.getHours()){
                return (now.getHours()-date.getHours())+' hours';
            }
            else if(date.getMinutes()!=now.getMinutes()){
                return (now.getMinutes()-date.getMinutes())+' minutes';
            }
            else if(date.getSeconds()!=now.getSeconds()){
                return (now.getSeconds()-date.getSeconds())+' seconds';
            }
            else if(date.getSeconds()==now.getSeconds()){
                return '0 seconds';
            }
            

       }
    },
    computed:{
        filtre(){
            return this.modules.filter((module)=>{
                return module.module.name.toLowerCase().includes(this.searchKey.toLowerCase())
            })
        }
    },
    mounted(){
            axios
            .get('http://localhost:3000/modules')
            .then(res=>{
                this.modules=res.data
                console.log(res.data);
                
            }).catch(err=>{
                console.log(err);
            });
    },
    components:{
        'newModule':NewModuleVue
    }
    

}
</script>

<style>
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
    .contain{
        margin-left: 40px;
        margin-right: 40px;
    }
    .cardf{
        color: black;
        text-decoration: none;
    }
    .cardf:hover{
        text-decoration: none;
    }
    
</style>