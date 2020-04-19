import shop from '@/api/shop'
export default {
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
    addProductToCart({ state, getters, commit }, product) {
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
