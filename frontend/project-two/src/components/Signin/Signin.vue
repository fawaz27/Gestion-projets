<template>
  <div >
      <div v-if="showModal" class="bloc-modale">
        <transition name="modal">
              <div class="modal-mask">
                <div class="modal-wrapper" >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">SIGN IN</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showModal = false">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form >
                          <div class="container">
                            
                            <div class="form-group mb-4">
                              <input name="id" v-model="FormData.id"  id="id" type="text" placeholder="Your Email or Username" class="form-control form-control-sm ">
                            </div>
                            <div class="form-group mb-4">
                              <input name="password" v-model="FormData.password" id="password" type="password" placeholder="Your Password" class="form-control form-control-sm">
                            </div>
                            
                          </div>
                          
                          
                        </form>
                       
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                        <button type="button" class="btn btn-primary" @click="login" >Sign in </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </transition>
      </div>
  
  </div>

</template>
<script>
import { mapMutations } from "vuex";
import axios from 'axios'
import {bus} from "../../main";
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'signin',
    data(){
        return{
            showModal: false,
            FormData:{
                id:'',
                password:''
            }
        }
    },
    methods:{
      ...mapMutations(["setUser", "setToken"]),
      toogle:function(){
        this.showModal=!this.showModal;
      },
      login(){
            axios
            .post('http://localhost:3000/partners/login',this.FormData)
            .then(res=>{
                const user=res.data.data.user;
                const token=res.data.data.token;
                this.setUser(user);
                this.setToken(token);
                this.showModal=!this.showModal
                this.FormData.id='';
                this.FormData.password='';
                

            })
            .catch(err=>{
                console.log(err);
            });
            
                
            
            
        }
    },
    created(){
      bus.$on('callsignin',(data)=>{
        this.showModal=data;
      });
      bus.$on('hidesignin',(data)=>{
        this.showModal=data;
      });

    }
}

</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

</style>