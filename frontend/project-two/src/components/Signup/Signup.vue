<template>
  <div >
      <div v-if="showModal" class="bloc-modale">
        <transition name="modal">
              <div class="modal-mask">
                <div class="modal-wrapper" >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">SIGN UP</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showModal = false">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form >
                          <div class="container">
                            <div class="form-group mb-4">
                              <input name="username"  v-model="FormData.username" id="username" type="text" placeholder="Your Username" class="form-control form-control-sm">
                            </div>
                            <div class="form-group mb-4">
                              <input name="name" v-model="FormData.name" id="name" type="text" placeholder="Your Name" class="form-control form-control-sm ">
                            </div>
                            <div class="form-group mb-4">
                              <input name="email" v-model="FormData.email"  id="email" type="email" placeholder="Your Email" class="form-control form-control-sm ">
                            </div>
                            <div class="form-group mb-4">
                              <input name="password" v-model="FormData.password" id="password" type="password" placeholder="Your Password" class="form-control form-control-sm">
                            </div>
                            <div class="form-group mb-4">
                              <input name="repassword" v-model="FormData.repassword" id="repassword" type="password" placeholder="Repeat your password" class="form-control form-control-sm">
                            </div>
                          </div>
                          
                          
                        </form>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                        <button type="button" class="btn btn-primary" @click="register" >Sign up</button>
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
import axios from 'axios'
import {bus} from "../../main";
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'signin',
    data(){
        return{
            showModal: false,
            FormData:{
                username:'',
                name:'',
                email:'',
                password:'',
                repassword:''
            }
        }
    },
    methods:{
      toogle:function(){
        this.showModal=!this.showModal;
      },
      register(){
            axios
            .post('http://localhost:3000/partners/register',this.FormData)
            .then(res=>{
                console.log(res);
                
            })
            .catch(err=>{
                console.log(err);
            });

            
                
            this.FormData.username='';
            this.FormData.name='';
            this.FormData.email='';
            this.FormData.password='';
            this.FormData.repassword='';
        }
    },
    created(){
      bus.$on('callsignup',(data)=>{
        this.showModal=data;
      });
      bus.$on('hidesignup',(data)=>{
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