import shop from '@/api/shop'
export default {
  namespaced: true,
  state: {
    cart: [],
    checkoutStatus: null,
    discount: 0
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
    },
    cartCost(state, getters) {
      return getters.cartProducts.reduce(
        (total, product) =>
          total + product.productCost * product.quantityPerUnit,
        0
      )
    },
    totalWithDiscount(state, getters) {
      if (getters.cartTotal == 0) {
        return 0
      }
      return (
        getters.cartProducts.reduce(
          (total, product) =>
            total + product.productPrice * product.quantityPerUnit,
          0
        ) - getters.discount
      )
    },
    discount(state) {
      return state.discount
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
    checkout({ state, commit, getters,rootState }) {
      let orderData = {}
      orderData.orderDiscount = Number(getters.discount)
      orderData.orderDate = new Date()
      orderData.orderPrice = getters.totalWithDiscount
      orderData.orderPriceIfNoDiscount = getters.cartTotal
      orderData.orderCost = getters.cartCost
      orderData.orderProfit = getters.totalWithDiscount - getters.cartCost
      orderData.customerID = ''
      orderData.orderDetailID = []
      orderData.employeeID = ''
      orderData.orderStatus = ''

      shop.buyProducts(
        state.cart,
        orderData,
        () => {
          commit('emptyCart')
          commit('setCheckoutStatus', 'success')
          commit('products/updateProductAfterPayment', rootState.products.products, { root: true })
          // commit('products/updateProductAfterPayment', { root: true })
        },
        () => {
          commit('setCheckoutStatus', 'fail')
        }
      )
    },
    // eslint-disable-next-line no-unused-vars
    setQuantity({ commit }, product) {
      product.quantityPerUnit = Number(product.quantityPerUnit)
      commit('products/setProductInventory', product, { root: true })
      commit('setQuntityInCart', product)
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
      state.checkoutStatus = ''
    },

    incrementItemQuantity(state, cartItem) {
      cartItem.quantityPerUnit++
    },
    setCheckoutStatus(state, status) {
      state.checkoutStatus = status
      setTimeout(function(){ state.checkoutStatus = ''; }, 5000);
    },

    emptyCart(state) {
      state.cart = []
    },

    setQuntityInCart(state, product) {
      state.cart.map(p => {
        if (p.productID === product.productID) {
          p.quantityPerUnit = product.quantityPerUnit
        }
      })
    },

    setDiscount(state, discount) {
      state.discount = discount
    }
  }
}
