/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import products from '@/store/modules/products.js'
import cart from '@/store/modules/cart.js'
import shop from '@/api/shop'
// import actions from '@/store/actions.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    products
  },
  state: {
    // = data
    isLogged: false,
    username: ''
  },
  /*   modules: { 
    products, 
    cart 
  }, */
  getters: {
    // = compputed properties
    isLogin(state) {
      /*       if(firebase.auth().currentUser){
        state.isLogged = true;
      } */
      return state.isLogged
    }
  },
  actions: {
    // = methods
    doLogin({ commit }) {
      commit('SET_LOGGED_IN')
    },
    doLogout({ commit }) {
      commit('SET_LOGGED_OUT')
    },
    restoreLogin({ commit }) {
      if (firebase.auth().currentUser) {
        commit('SET_LOGGED_IN')
      }
    }
  },
  mutations: {
    // for set or update state
    SET_LOGGED_IN(state) {
      state.isLogged = true
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false
    },
    SET_USERNAME(state, value) {
      state.username = value
    }
  }
})
