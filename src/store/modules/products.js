import shop from '@/api/shop'
export default {
  namespaced: true,
  state: {
    //*product in shop
    products: [],
    filteredProducts: [],
    message: '',
    minimumProducts: []
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
    },
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
      state.minimumProducts = products.filter(product => product.quantityPerUnit < product.stockMinimum)
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
      state.filteredProducts = state.products
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
      if (message != null)
        state.filteredProducts = state.products.filter(product =>
          product.productName
            .toLowerCase()
            .includes(state.message.toLowerCase())
        )
      else state.filteredProducts = state.products
    },
    updateProductAfterPayment(state, products) {
      //* console.log('ok state iss:',state);
      //* console.log('ok products iss:',products);
      products.forEach(product => {
        //* console.log('pr ;:', product.quantityPerUnit, "---", product.inventory)
        product.inventory = product.quantityPerUnit
        //* console.log("hhh");

        //* console.log('pr ;:', product.quantityPerUnit, "---", product.inventory)
      })

      /*       state.products.map(p => {
        console.log(p.inventory);
        
        p.inventory = state.product.quantityPerUnit
      })
      state.filteredProducts = state.products */
    }
  }
}
