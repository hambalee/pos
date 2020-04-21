<template>
  <div id="shop">
    <!--     <v-container fluid> -->
    <!-- 
      <v-row>
        <v-col cols="12" md="8">
          <v-row>
            <v-col
              cols="12"
              xl="2"
              lg="3"
              md="4"
              sm="6"
              v-for="(product, index) in products"
              :key="index"
              @click="
                onClickProduct(
                  product.productName,
                  product.productPrice,
                  product.qty
                )
              "
            >
              <v-card outlined height="100%" width="100%">
                <v-card-title>{{ product.productName }}</v-card-title>
                
                <v-divider class="mt-6 mx-4"></v-divider>
                <v-card-subtitle>
                  {{ product.productPrice }} บาท
                </v-card-subtitle>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="4" align="center" justify="center" v-if="true">
          <v-card outlined>
            <div>
              <b> รวม 560 บาท</b>
            </div>
            <br />
            <v-card-actions>
              <v-btn color="success" block>ชำระเงิน</v-btn>
            </v-card-actions>

            <v-card outlined v-for="(item, index) in cart" :key="index">
              <v-row>
                <v-col cols="12">
                    <v-card-text >
                    {{ item.name }}
                    </v-card-text>
                  !--                   <v-spacer></v-spacer>
                  <div>x {{ item.qty }}</div>
                  <v-spacer></v-spacer>
                  <v-btn color="info">+</v-btn>
                  <v-btn color="error">-</v-btn> --
                  !-- <v-divider class="mt-6 mx-4"></v-divider> --
                  <v-card-actions  class="card-action">
                    <v-chip class="ma-2" color="green" text-color="white" @click="true" >
                      <v-avatar left class="green darken-4">
                        1
                      </v-avatar>
                      ชิ้น
                    </v-chip>
                    <v-chip
                      v-if="true"
                      class="ma-2"
                      color="red"
                      text-color="white"
                      @click="true"
                      >ลบ
                    </v-chip>
                    <v-chip @click="true">
                      <v-icon left>mdi-blinds</v-icon>
                      Close blinds
                    </v-chip>
                  </v-card-actions>
                </v-col>
              </v-row>
            </v-card>
          </v-card>
        </v-col>
      </v-row> 
      -->

    <!--     </v-container> -->

    <!--     <v-containter fluid>
      <v-row>
        <v-col
          class="grey lighten-5 d-flex"
          xs12
          sm6
          md4
          lg3
          v-for="product in products"
          :key="product.name"
        >
          <v-card outlined tile class="ma-3 pa-6">
            <div>{{ product.name }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-containter>
    <div class="team">
      <v-container class="my-5 ">
        <v-row row wrap class="grey lighten-5">
          <v-col
            xs12
            sm6
            md4
            lg3
            xl2
            v-for="person in products"
            :key="person.name"
          >
            <v-card class="ma-3 pa-6">
              <v-card-text>
                <div class="subheading">{{ person.name }}</div>
                <div class="grey--text">{{ person.price }} บาท</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div> -->

    <!-- card product list start -->
    <!--     <v-card class="mx-auto" max-width="200"  v-for="item in items" :key="item">
      <v-img
        class="white--text align-end"
        height="150"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
      </v-img>
      <v-card-title class="w-5 text-truncate">{{ item.message }}</v-card-title>

      <v-card-text>
        <div >Whitehaven Beach</div>
      </v-card-text>
    </v-card> -->
    <!-- card product list end -->
    <!--     <v-row>
    <v-col cols="12" sm="6" offset-sm="3" >
      <v-card>
        <v-container fluid>
          <v-row>
            <v-col
              v-for="n in 10"
              :key="n"
              class="d-flex child-flex"
              cols="4"
            >
              <v-card flat tile class="d-flex">
                <v-img
                  :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
                  :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row> -->
    <!--     <ProductItem
      v-for="product in products"
      :product="product"
      :key="product.productID"
      @onAddProduct="addProduct"
    />
    <Payment :products="cart"/> -->
    <v-row>
      <v-col cols="12" md="8" order-md="first">
        <ProductList />
      </v-col>
      <v-col cols="12" md="4" order-sm="first">
        <ShoppingCart />
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { productsCollection, categoriesCollection } from '../firebase'
// import shop from '@/api/shop'
// import { mapState, mapActions } from 'vuex'
import ProductList from '@/components/ProductList.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'

export default {
  name: 'Shop',
  components: {
    ProductList,
    ShoppingCart
  }
  /*   created() {
    this.initialize()
  }, */
  /*   data() {
    return {
      // products: [],
      // items: [{ message: "Fooadsfasdfasdfasdfasdfasdfasdfsadf" }, { message: "Basadfsadfasdfasdfrasdfsdfasdfasdfasdfasdf" }]
    }
  }, */
  /*   methods: {
    //find product in cart if found qty++ else push
    // addProduct(product) {
    //   this.cart.push(product)
    // },
    initialize() {
      // get products
      // shop.getProducts().then((products)=> this.products = products)
      // shop.getProducts().then(products => console.log(products))
      
      // console.log(this.$store.dispatch('products/getAllProducts'));
      
    }
  }, */
  /*   computed: mapState({
    products: state => state.products.all
  },
  // console.log(this.products())
  ), */
  /*   computed: {
    name() {
      return mapState({
    products: state => state.products.all
  })
    }
  }, */
}
</script>

<style>
/* .card-outter {
  position: relative;
  padding-bottom: 50px;
}
.card-actions {
  position: absolute;
  bottom: 0;
} */
</style>
