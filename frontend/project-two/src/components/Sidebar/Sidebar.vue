<template>
    <div>
              
      <div class="app-sidebar" >
          <div class="main-sidebar">
                
              <div class="contain-main">
                  <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Menu</span>
                    <a class="link-secondary" href="#" aria-label="Add a new report">
                      <span data-feather="plus-circle"></span>
                    </a>
                  </h6>
                  <ul class="nav flex-column ">
                    <li class="nav-item element" v-for="(item,index) in Items1" v-bind:key="index" >
                        <sidebar-item :txt="item.txt" :status="item.status" :url="item.url" :icone="item.faicon" ></sidebar-item>
                        
                    </li>
                    
                  </ul>

                  <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Module Menu</span>
                    <a class="link-secondary" href="#" aria-label="Add a new report">
                      <span data-feather="plus-circle"></span>
                    </a>
                  </h6>
                  <ul class="nav flex-column mb-2">
                    <li class="nav-item element" v-for="(item,index) in Items2" v-bind:key="index" >
                        <sidebar-item :txt="item.txt" :status="item.status" :url="item.url" :icone="item.faicon" ></sidebar-item>
                        
                    </li>
                  </ul>
              </div>
          </div>

      </div>
      
     </div>
     
      
  
</template>

<script>


import SidebarItemVue from "./SidebarItem.vue"
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'sidebar',
  data(){
    return{
      Items1:[
        {txt:'Home',url:'/',faicon:'house'},
        {txt:'Modules',url:'/modules',faicon:'folder-blank'},
        {txt:'Dashboard',url:'/dasboard',faicon:'dashboard'}

      ],
      Items2:[
        {txt:'Home',url:'/modules/name',faicon:'house'},
        {txt:'Calendar',url:'/modules/calendar',faicon:'calendar'},
        {txt:'Users',url:'/modules/users',faicon:'user'},
        {txt:'Gantt',url:'/modules/gantt',faicon:'chart-gantt'}
      ]
      

    }
    

  },
  methods:{
   
  },
  components: {
    'sidebar-item':SidebarItemVue
    
    
}
}
</script>

<style scoped >
    
    .nav-item:hover{
      background: lightblue;
    }
    
    .sidebar{
      width: 100%;
    }
    .app-sidebar{
      height: 100%;
      width:100%;
      width: 280px;
      display: flex;
      z-index: 11;
      overflow: hidden;
      min-width: 280px;
      position: fixed;
      flex: 0 0 280px;
      margin-top: -60px;
      padding-top: 60px;
      transition: all .2s;
      box-shadow: 7px 0 60px rgba(0,0,0,0.05);
    }

    .main-sidebar{
      position: relative;
      height: 100%;
      width: 100%;
    }
    .contain-main{
      padding: 2px 1.5rem 1.5rem;
    }

    .active{
      background: lightblue;
    }
    
</style>
