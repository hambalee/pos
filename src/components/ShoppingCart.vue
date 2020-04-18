<template>
  <div>
    <h1>Shopping Cart</h1>
    <ul>
      <li v-for="product in products" :key="product ? product.productID : ''">
        {{ product.productName }} - {{ product.productPrice | currency }} *
        {{ product.quantityPerUnit }}
        <!-- <v-btn
          outlined
          color="primary"
          dark
          :value="productID"
          >delete</v-btn
        > -->
      </li>
    </ul>
    <p>Total: {{ total | currency }}</p>
    <!--     <v-btn @click="$store.dispatch('checkout')" v-if="total != 0"
      >Checkout</v-btn
    > -->
    <v-btn @click="checkout" v-if="total > 0">Checkout</v-btn>
    <p v-if="checkoutStatus">{{ checkoutStatus }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'ShoppingCart',
  computed: {
    ...mapGetters({
      products: 'cartProducts',
      total: 'cartTotal'
    }),
    /*     products() {
      return this.$store.getters.cartProducts
    },
    total() {
      return this.$store.getters.cartTotal
    } */
    ...mapState({
      checkoutStatus: 'checkoutStatus'
    })
  },
  methods: {
    ...mapActions(['checkout'])
  }
}
</script>

<style lang="scss" scoped></style>
