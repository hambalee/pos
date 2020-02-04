<template>
  <div id="shop">
    <h1 class="subheading grey--text"></h1>
    <v-container fluid>
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
              @click="onClickProduct(product.name, product.price, product.qty)"
            >
              <v-card
                class="mx-auto"
                max-width="100%"
                min-width="100%"
                max-height="100%"
                min-height="150"
                outlined
              >
                <v-card-title>{{ product.name }}</v-card-title>
                <v-card-subtitle>{{ product.price }} บาท</v-card-subtitle>
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
                  <div>
                    {{ item.name }}
                  </div>
                  <v-spacer></v-spacer>
                  <div>x {{ item.qty }}</div>
                  <v-spacer></v-spacer>
                  <v-btn color="info">+</v-btn>
                  <v-btn color="error">-</v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

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
  </div>
</template>

<script>
export default {
  name: "Shop",
  created() {
    this.initialize();
  },
  data() {
    return {
      cart: []
    };
  },
  methods: {
    onClickProduct(name, price, qty = 1 ) {
      this.cart.push({ name, price, qty });
    },
    initialize() {
      this.products = [
        {
          name: "กระเบื้องคอนกรีต",
          price: 100,
          qty: 3
        },
        {
          name: "ปูนซีเมนต์",
          price: 210,
          qty: 4
        },
        {
          name: "ไม้อัด",
          price: 150,
          qty: 5
        },
        {
          name: "ปลั๊กไฟ",
          price: 50,
          qty: 4
        },
        {
          name: "หมวกนิรภัย",
          price: 170,
          qty: 7
        },
        {
          name: "กระดาษทรายแผ่น",
          price: 15,
          qty: 9
        },
        {
          name: "ค้อน",
          price: 60,
          qty: 14
        },
        {
          name: "ประตูไม้อัด",
          price: 208,
          qty: 10
        },
        {
          name: "สีทาอาคาร",
          price: 250,
          qty: 8
        },
        {
          name: "กาวตะปู",
          price: 55,
          qty: 1
        }
      ];
    }
  }
};
</script>

<style></style>
