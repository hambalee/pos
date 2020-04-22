<template>
  <div>
    <!-- <h1 class="justify-center">Product List</h1> -->
    <v-col cols="12" dense>
      <!-- <v-text-field label="ค้นหา" clearable :value="search" @input="updateSearch"></v-text-field> -->
      <v-text-field label="ค้นหา" clearable v-model="message" dense></v-text-field>
    </v-col>
    <img v-if="loading" src="../assets/loading.gif" />
    <v-row v-else-if="products">
      <v-col
        v-for="product in filteredProducts"
        :key="product.productID"
        xl="3"
        lg="3"
        md="4"
        sm="6"
        xs="12"
        cols="12"
      >
        <v-card
          min-height="100%"
          @click="addProductToCart(product)"
          :disabled="!productIsInStock(product)"
        >
          <v-img :src="product.productImageUrl" aspect-ratio="2" contain></v-img>
          <v-card-title>{{ product.productPrice | currency }}</v-card-title>
          <v-card-subtitle>เหลือ {{ product.quantityPerUnit }} ชิ้น</v-card-subtitle>
          <v-card-text>
            <b>{{ product.productName }}</b>
          </v-card-text>
          <!--     <v-card-action>
           <v-btn
            
              outlined
              block
              :disabled="!productIsInStock(product)"
              
              text
            >
              ซื้อ
            </v-btn> 
          </v-card-action>-->
        </v-card>
      </v-col>
    </v-row>
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
      productIsInStock: 'products/productIsInStock'
      //or ...mapGetters('products',{ productIsInStock: 'productIsInStock'
    }),
    /*     message() {
      return this.$store.state.message
    }, */
    message: {
      get() {
        return this.$store.state.products.message
      },
      set(value) {
        this.$store.commit('products/updateMessage', value)
      }
    },
    filteredProducts: {
      get() {
        return this.$store.state.products.filteredProducts
      }
    }
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
      addProductToCart: 'cart/addProductToCart'
    }),
    /*     addProductToCart(product) {
      this.$store.dispatch('addProductToCart', product)
    } */
    updateMessage(e) {
      this.$store.commit('products/updateSearch', e.target.value)
      // this.$store.commit('products/updateFilteredProducts', e.target.value)
    }
  },
  created() {
    this.loading = true
    this.$store
      .dispatch('products/fetchProducts')
      // this.fetchProduct()
      .then(() => (this.loading = false))

    /*     shop.getProducts().then(products => {
    //   this.state.products = products
    store.commit('setProducts', products)
    }) */
  }
}
</script>

<style></style>
