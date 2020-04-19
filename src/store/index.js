/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import products from '@/store/modules/products.js'
import cart from '@/store/modules/cart.js'
import user from '@/store/modules/user.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart,
    products,
    user
  },
  state: {
    // = data
  },
  getters: {
    // = compputed properties
  },
  actions: {
    // = methods
  },
  mutations: {
    // for set or update state
  }
})
