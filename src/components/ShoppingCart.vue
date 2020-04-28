<template>
  <div>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card @click="$store.commit('cart/setCheckoutStatus', '')">
            <v-alert
              type="success"
              v-if="checkoutStatus && total == 0 && checkoutStatus == 'success'"
              append
            >ทำรายการขายสำเร็จ</v-alert>
            <v-alert
              type="error"
              v-else-if="checkoutStatus && total == 0 && checkoutStatus == 'fail'"
            >ทำรายการขายไม่สำเร็จ</v-alert>
          </v-card>
          <v-card-actions>
            <v-btn
              @click.stop="dialog = true"
              :disabled="total == 0"
              block
              color="success"
              outlined
            >
              <h2>ชำระเงิน</h2>
            </v-btn>
          </v-card-actions>
          <v-row outlined>
            <v-col class="ml-5" cols="6">
              <v-edit-dialog>
                <v-card text flat dense>
                  <v-btn outlined>
                    <span class="warning--text">ลด {{ discount | currency }}</span>
                  </v-btn>
                  <span>
                    <del class="ml-2" v-if="discount > 0">{{ total | currency }}</del>
                  </span>
                </v-card>
                <template v-slot:input>
                  <v-text-field
                    v-model="discount"
                    label="ส่วนลด"
                    single-line
                    type="number"
                    @focus="$event.target.select()"
                  ></v-text-field>
                </template>
              </v-edit-dialog>
              <v-btn
                icon
                v-if="discount && discount > 0 "
                @click="$store.commit('cart/setDiscount', 0)"
              >
                <v-icon>cancel</v-icon>
              </v-btn>
            </v-col>
            <v-col cols="5">
              <h2 class="text-right">รวม {{ totalWithDiscount | currency }}</h2>
            </v-col>
          </v-row>

          <v-card-title>
            <v-col cols="7">
              <h6></h6>
            </v-col>
            <v-col cols="5"></v-col>
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
                  <v-edit-dialog large persistent @save="setQuantity(product)">
                    <div>x {{ product.quantityPerUnit }}</div>
                    <template v-slot:input>
                      <v-text-field
                        v-model="product.quantityPerUnit"
                        label="จำนวน"
                        single-line
                        type="number"
                        @focus="$event.target.select()"
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
    <!-- //*dialog checkout -->
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="290">
        <v-card>
          <v-card-title class="headline">ชำระเงิน</v-card-title>

          <v-card-text>
            <v-input>
              <v-select
                :items="customerList"
                label="เลือกลูกค้า"
                item-text="customerName"
                item-value="id"
                clearable
                v-model="selectedCustomer"
                @change="actionCustomerID(selectedCustomer)"
              ></v-select>
              <v-btn color="info" text right @click="dialog2 = true">เพิ่ม</v-btn>
              <v-dialog v-model="dialog2" max-width="290">
                <v-card>
                  <v-card-title primary-title>เพิ่มลูกค้า</v-card-title>
                  <v-card-text>
                    <v-text-field label="ชื่อ" v-model="customerName"></v-text-field>
                    <v-text-field label="เบอร์โทร" v-model="customerPhone"></v-text-field>
                    <v-text-field label="ที่อยู่" v-model="customerAddress"></v-text-field>
                    <v-text-field label="อีเมล์" v-model="customerEmail"></v-text-field>
                    <v-btn color="info" @click="addCustomer">เพิ่ม</v-btn>
                    <v-btn color="info" @click="clearBtn" text>ยกเลิก</v-btn>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </v-input>ยอดรวม
            <b>{{ totalWithDiscount | currency }}</b>
            <v-text-field
              name="name"
              label="จ่ายเงิน"
              id="id"
              v-model="money"
              v-if="dialog"
              @focus="$event.target.select()"
              clearable
            ></v-text-field>
            <v-row>
              <v-col cols="3">
                <v-btn color="info" text @click="money = totalWithDiscount">เต็ม</v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn color="info" text @click="money += 1000">1000</v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn color="info" text @click="money += 500">500</v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn color="info" text @click="money += 100">100</v-btn>
              </v-col>
            </v-row>

            <h2 v-if="money > 0">ทอน {{money - totalWithDiscount | currency}}</h2>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="success"
              block
              @click="btnCheckout"
              :disabled="money == 0 || money == null || (money - totalWithDiscount) < 0"
            >ตกลง</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { customersCollection } from '../firebase'
export default {
  name: 'ShoppingCart',
  data() {
    return {
      dialog: false,
      dialog2: false,
      modalCheckout: false,
      money: 0,
      customerList: [],
      selectedCustomer: '',
      customerName: '',
      customerPhone: '',
      customerAddress: '',
      customerEmail: ''
    }
  },
  computed: {
    discount: {
      get() {
        return this.$store.state.cart.discount
      },
      set(discount) {
        this.$store.commit('cart/setDiscount', discount)
      }
    },
    ...mapGetters({
      products: 'cart/cartProducts',
      total: 'cart/cartTotal',
      totalWithDiscount: 'cart/totalWithDiscount'
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
      setQuantity: 'cart/setQuantity',
      actionCustomerID: 'cart/actionCustomerID'
    }),
    btnCheckout() {
      this.$store.dispatch('cart/checkout')
      this.dialog = false
      this.money = 0
      this.$store.commit('cart/setDiscount', 0)
    },
    initCustomer() {
      customersCollection.get().then(q => {
        this.customerList = q.docs.map(doc => {
          return { ...doc.data(), id: doc.id }
        })
      })
    },
    addCustomer() {
      customersCollection
        .add({
          customerName: this.customerName,
          customerPhone: this.customerPhone,
          customerEmail: this.customerEmail,
          customerAddress: this.customerAddress,
          createdAt: new Date()
        })
        .then(() => {
          this.initCustomer()
          this.clearBtn()
        })
    },
    clearBtn() {
      this.selectedCustomer = ''
      this.customerName = ''
      this.customerPhone = ''
      this.customerAddress = ''
      this.customerEmail = ''
      this.dialog2 = false
    }
  },
  created() {
    this.initCustomer()
  }
}
</script>

<style lang="scss" scoped></style>
