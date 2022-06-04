<template >
    <div>
        <div v-if="showModal" class="bloc-modale">
            <transition name="modal">
              <div class="modal-mask">
                <div class="modal-wrapper"  >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">New Module</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true" @click="showModal = false">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <form >
                          <div class="container">
                            
                            <div class="form-group mb-4">
                                <label for="name">Name</label>
                                <input name="name" v-model="FormData.name"  id="name" type="text" placeholder="" class="form-control form-control-sm ">
                            </div>
                            <div class="form-group">
                                <label for="name">Description</label>
                                <textarea v-model="FormData.description" class="form-control" id="desc" rows="2"></textarea>  
                            </div>
                           
                            
                          </div>
                          
                          
                        </form>
                       
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
                        <button type="button" class="btn btn-primary" @click="NewModule" >Add</button>
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
import {bus} from '../../main'
export default{
    // eslint-disable-next-line vue/multi-word-component-names
    name:'newmodule',
    data(){
        return {
            showModal: false,
            FormData:{
                name:'',
                description:'',
                datecreate:''
            }
        }
    },
    methods:{
        NewModule: function(){
            this.FormData.datecreate=new Date();
            
            axios
            .post('http://localhost:3000/modules',this.FormData)
            .then( res=>{
                res;
                this.showModal=!this.showModal;
                this.FormData.name='';
                this.FormData.description;
                this.FormData.datecreate='';
            })
            .catch( err=>{
                console.log(err);
            }

            )
        }
    },
    created(){
      bus.$on('callnewmodule',(data)=>{
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