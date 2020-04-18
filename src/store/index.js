/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import products from './products'
import cart from './cart'
import shop from '@/api/shop'
// import actions from '@/store/actions.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // = data
    isLogged: false,
    username: '',
    //*product in shop
    products: [],
    cart: [],
    checkoutStatus: null
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
    },
    //*products
    availableProducts(state, getters) {
      return state.products.filter(product => product.quantityPerUnit >= 0)
    },
    //notAvailableProducts
    outOfStockProducts(state, getters) {
      return state.products.filter(product => product.quantityPerUnit == 0)
    },
    //*get product from cart
    cartProducts(state) {
      return state.cart.map(cartItem => {
        const product = state.products.find(
          product => product.productID === cartItem.productID
        )
        return {
          // productID: product.productID,
          // productName: product.productName,
          // productPrice: product.productPrice,
          ...product,
          quantityPerUnit: cartItem.quantityPerUnit
        }
      })
    },
    
    cartTotal(state,getters){
      // let total = 0
      // getters.cartProducts.forEach(product => {
      //   total += product.productPrice * product.quantityPerUnit
      // })
      // return total
      return getters.cartProducts.reduce((total, product) => total + product.productPrice*product.quantityPerUnit, 0)
    },

    productIsInStock(){
      return (product) => {
        return product.quantityPerUnit > 0
      }
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
    },
    //*products
    fetchProducts({ commit }) {
      return new Promise((resolve, reject) => {
        // make the call
        // call setProducts mutation
        shop.getProducts().then(products => {
          //   this.state.products = products
          commit('setProducts', products)
          resolve()
        })
      })
/*       shop.getProducts().then(products => {
        commit('setProducts', products)
      }) */
    },
    addProductToCart({state, getters, commit}, product) {
      if (getters.productIsInStock(product)) {
        // find cartItem
        const cartItem = state.cart.find(
          item => item.productID === product.productID
        )
        if (!cartItem) {
          // pushProductToCart
          commit('pushProductToCart', product)
        } else {
          // incrementItemQuantity
          commit('incrementItemQuantity', cartItem)
        }
        commit('decrementProductInventory', product)
      } else {
        //show out of stock
      }
    },
    checkout ({state, commit}) {
      shop.buyProducts(
        state.cart, 
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
        )
      
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
    },
    //*products
    setProducts(state, products) {
      // products is payload
      // update products
      state.products = products
    },

    pushProductToCart(state, product) {
      state.cart.push({
        // productID,
        ...product,
        quantityPerUnit: 1
      })
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantityPerUnit++
    },

    decrementProductInventory(state, product) {
      product.quantityPerUnit--
    },

    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    },

    emptyCart (state){
      state.cart = []
    }
  }
})
