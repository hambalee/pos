<template>
  <div>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card @click="$store.commit('cart/setCheckoutStatus', 'fail')">
            <v-alert
              type="success"
              v-if="checkoutStatus && total == 0 && checkoutStatus == 'success'"
              append
            >ทำรายการขายสำเร็จ</v-alert>
            <v-alert
              type="error"
              v-else-if="checkoutStatus && total == 0 && checkoutStatus == ''"
            >ทำรายการขายไม่สำเร็จ</v-alert>
          </v-card>
          <v-card-actions>
            <v-btn @click="checkout" :disabled="total == 0" block color="success" outlined>
              <h2>ชำระเงิน</h2>
            </v-btn>
          </v-card-actions>
          <v-card-title>
            <p>Total: {{ total | currency }}</p>
          </v-card-title>
        </v-card>
        <v-card outlined>
          <v-col cols="12">
            <v-row v-for="product in products" :key="product ? product.productID : ''" width="100%">
              <v-card class="d-flex" tile width="100%" outlined height="100%" min-height="80">
                <v-col cols="8" justify-center align-center>
                  {{ product.productName }}
                  <br />
                  <v-btn color="error" outlined @click="deleteItem(product)">ลบ</v-btn>
                </v-col>
                <v-col cols="4" justify-center align-center>
                  {{ product.productPrice | currency }}
                  <br />
                  <v-edit-dialog
                    large
                    persistent
                    @save="setQuantity(product)"
                  >
                    <div>x {{ product.quantityPerUnit }}</div>
                    <template v-slot:input>
                      <v-text-field
                        v-model="product.quantityPerUnit"
                        label="Edit"
                        single-line
                        autofocus
                        type="number"
                      ></v-text-field>
                    </template>
                  </v-edit-dialog>
                  <!-- <v-btn color="info" text style="cursor: default">x {{ product.quantityPerUnit }}</v-btn> -->
                </v-col>
              </v-card>
            </v-row>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-btn
          outlined
          color="primary"
          dark
          :value="productID"
          >delete</v-btn
    >-->

    <!--     <v-btn @click="$store.dispatch('checkout')" v-if="total != 0"
      >Checkout</v-btn
    >-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'ShoppingCart',
  data() {
    return {
      dialog: false,
    }
  },
  computed: {
    ...mapGetters({
      products: 'cart/cartProducts',
      total: 'cart/cartTotal'
    }),
    /*     products() {
      return this.$store.getters.cartProducts
    },
    total() {
      return this.$store.getters.cartTotal
    } */
    ...mapState({
      // checkoutStatus: 'checkoutStatus'
      checkoutStatus: state => state.cart.checkoutStatus
    })
  },
  methods: {
    ...mapActions({
      checkout: 'cart/checkout',
      deleteItem: 'cart/deleteItemInCart',
      setQuantity: 'cart/setQuantity'
    })
  }
}
</script>

<style lang="scss" scoped></style>
