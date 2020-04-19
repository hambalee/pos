<template>
  <div>
    <h1>Product List</h1>
    <img v-if="loading" src="../assets/loading.gif" />
    <ul v-else-if="products">
      <li v-for="product in products" :key="product.productID">
        {{ product.productName }} ราคา
        {{ product.productPrice | currency }} (เหลือ
        {{ product.quantityPerUnit }} ชิ้น)
        <br />
        <v-btn
          outlined
          dark
          class="primary"
          :disabled="!productIsInStock(product)"
          @click="addProductToCart(product)"
        >
          Add to cart
        </v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      loading: false,
      productIndex: 1
    }
  },
  computed: {
    ...mapState({
      products: state => state.products.products
      //   firstProduct: state => state.products[0],
      /*     specificProduct (state){
        return state.products[this.productIndex]
    } */
    }),
    // ...mapGetters(['productIsInStock'])
    ...mapGetters({
      productIsInStock: 'productIsInStock'
    })
  },
  /*     computed: {
    products() {
      // return store.state.products
      return this.$store.getters.availableProducts
    },

    productIsInStock() {
      return this.$store.getters.productIsInStock
    }
  }, */
  methods: {
    ...mapActions({
      //   fetchProduct: 'fetchProduct',
      addProductToCart: 'addProductToCart'
    })
    /*     addProductToCart(product) {
      this.$store.dispatch('addProductToCart', product)
    } */
  },
  created() {
    this.loading = true
    this.$store
      .dispatch('fetchProducts')
      // this.fetchProduct()
      .then(() => (this.loading = false))

    /*     shop.getProducts().then(products => {
    //   this.state.products = products
    store.commit('setProducts', products)
    }) */
  }
}
</script>

<style lang="scss" scoped></style>
