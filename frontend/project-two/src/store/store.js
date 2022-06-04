import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        token: null,
      },
      mutations: {
        setUser(state, user) {
          state.user = user;
        },
        setToken(state, token) {
          state.token = token;
        },
        LogOut(state){
          state.user = null
          state.token = null
        }

      },
      actions: {},
      getters: {
        isLoggedIn(state) {
          return !!state.token;
        },
        getusername(state){
          if(state.user)
            return state.user.partner.username;
          else
          return;
        }
      },
})