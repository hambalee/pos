import shop from '@/api/shop'
export default {
  namespaced: true,
  state: {
    cart: [],
    checkoutStatus: null
  },
  getters: {
    //*get product from cart
    cartProducts(state, getters, rootState) {
      return state.cart.map(cartItem => {
        const product = rootState.products.products.find(
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

    cartTotal(state, getters) {
      // let total = 0
      // getters.cartProducts.forEach(product => {
      //   total += product.productPrice * product.quantityPerUnit
      // })
      // return total
      return getters.cartProducts.reduce(
        (total, product) =>
          total + product.productPrice * product.quantityPerUnit,
        0
      )
    }
  },
  actions: {
    addProductToCart({ state, rootGetters, commit }, product) {
      if (rootGetters['products/productIsInStock'](product)) {
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
        commit('products/decrementProductInventory', product, { root: true })
      } else {
        //show out of stock
      }
    },
    // eslint-disable-next-line no-unused-vars
    deleteItemInCart({ state, commit }, product) {
      /*       const cartItem = state.cart.find(
        item => item.productID === product.productID
      ) */
      // const index = this.state.indexOf(product)
      //* console.log(product);

      // eslint-disable-next-line no-undef
      commit('delete', product)

      commit('products/resetProductInventory', product, { root: true })
    },
    checkout({ state, commit }) {
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
    pushProductToCart(state, product) {
      state.cart.push({
        // productID,
        ...product,
        quantityPerUnit: 1
      })
    },
    // eslint-disable-next-line no-unused-vars
    delete(state, product) {
      const index = state.cart.findIndex(
        item => item.productID == product.productID
      )
      state.cart.splice(index, 1)
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantityPerUnit++
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
    },

    emptyCart(state) {
      state.cart = []
    }
  }
}
