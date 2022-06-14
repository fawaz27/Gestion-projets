import ListPartner from './components/ListPartners.vue'
import HomeNovel from './components/Modules/Novel/HomeNovel.vue'
import HomeProject from './components/Modules/Project/HomeProject.vue'
import HomeGame from './components/Modules/Game/HomeGame.vue'
import Home from './components/Home/Home.vue'
export default [
    {
        path:'/',
        component:Home
    },
    {
        path:'/partners',
        component:ListPartner
    }, 
    {
        path:'/project',
        component:HomeProject
    },
    {
        path:'/novel',
        component:HomeNovel
    },
    {
        path:'/game',
        component:HomeGame
    }
    
    
]