import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogged: false,
    username: ""
  },  
  getters: {
    isLogin(state) {
      return state.isLogged;
    }
  },
  mutations: {
    SET_LOGGED_IN(state){
      state.isLogged = true
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false;
    },
    SET_USERNAME(state, value){
      state.username = value
    }
  },
  actions: {
    doLogin({commit}){
      commit("SET_LOGGED_IN");
    },
    doLogout({ commit }) {
      commit("SET_LOGGED_OUT");
    },
  },
  modules: {
  }
})
