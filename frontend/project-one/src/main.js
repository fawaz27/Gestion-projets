import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import VueRouter from "vue-router";
import routes from './Routes'

const router = VueRouter.createRouter({routes})


const app= Vue.createApp(App)
app.use(router)
app.mount('#app')
