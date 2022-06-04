import Accueil from './Accueil.vue'
import Page1 from "./Page1.vue"
import Page2 from "./Page2.vue"
import Liste from "./ToDoListe.vue"
import Post from './Post.vue'

export default [
    
    {path: '/', component: Accueil},
    {path: '/page1', component: Page1},
    {path: '/page2/', component: Page2},
    {path: '/liste', component: Liste},
    {path: '/blogpost/:id', component: Post,props:true}
]