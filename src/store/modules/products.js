import shop from '@/api/shop'
export default {
  namespaced: true,
  state: {
    //*product in shop
    products: [],
    filteredProducts: [],
    message: ''
  },
  getters: {
    //*products
    availableProducts(state) {
      return state.products.filter(product => product.quantityPerUnit >= 0)
    },
    //notAvailableProducts
    outOfStockProducts(state) {
      return state.products.filter(product => product.quantityPerUnit == 0)
    },

    productIsInStock() {
      return product => {
        return product.quantityPerUnit > 0
      }
    }
  },
  actions: {
    //*products
    fetchProducts({ commit }) {
      return new Promise(resolve => {
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
    }
  },
  mutations: {
    //*products
    setProducts(state, products) {
      // products is payload
      // update products
      state.products = products
      state.filteredProducts = products
    },

    decrementProductInventory(state, product) {
      product.quantityPerUnit--
    },

    resetProductInventory(state, product) {
      state.products.map(p => {
        if (p.productID === product.productID) {
          p.quantityPerUnit = p.inventory
        }
      })
    },
    setProductInventory(state, product) {
      state.products.map(p => {
        if (p.productID === product.productID) {
          let tmp = p.inventory - product.quantityPerUnit
          if (tmp >= 0) {
            p.quantityPerUnit = tmp
          } else {
            p.quantityPerUnit = 0
          }
          console.log(p, 'adsfadsf')
          // console.log(n);
        }
      })
    },
    updateMessage(state, message) {
      state.message = message
      state.filteredProducts = []
      if(message != null)
      state.filteredProducts = state.products.filter(product => product.productName.toLowerCase().includes(state.message.toLowerCase()))
      else
      state.filteredProducts = state.products
    },
  }
}
