import shop from '@/api/shop'
export default {
  namespaced: true,
  state: {
    //*product in shop
    products: []
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
    },

    decrementProductInventory(state, product) {
      product.quantityPerUnit--
    }
  }
}
