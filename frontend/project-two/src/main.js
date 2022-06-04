import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHatWizard ,faHouse,faTasks,faChartGantt,faBars, faFolder,faDashboard,faCalendar,faUser} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueRouter from 'vue-router'
import Routes from './Routes'
import store from './store/store'
export const bus =new Vue()

library.add(faHatWizard,faHouse,faTasks,faChartGantt,faBars,faFolder,faDashboard,faCalendar,faUser)
Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(VueRouter)

const router = new VueRouter({
  routes:Routes,
  mode:'history'
})

new Vue({
  el:'#app',
  store:store,
  render: h => h(App),
  router:router
})
