<template>
  <div>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">ชื่อสินค้า</th>
            <th class="text-left">ราคา</th>
            <th class="text-left">จำนวน</th>
            <th class="text-left">รวม</th>
          </tr>
        </thead>
        <tbody>
                     <tr v-for="item in productDetails" :key="item.productID">
            <td>{{ item.productName }}</td>
            <td>{{ item.productPrice }}</td>
            <td>{{ item.quantityPerUnit }}</td>
            <td>{{ item.productPrice * item.quantityPerUnit }}</td>
          </tr> 
        </tbody>
      </template>
    </v-simple-table>
    <v-card outlined>
      <v-card-title primary-title>
        <div v-if="orderDetailID">ยอดรวม {{sum}}</div>
      </v-card-title>
    </v-card>
    <!-- // TODO: FP-29 <div class="pt-4"><v-btn color="success" >แก้ไข</v-btn></div> -->
    
  </div>
</template>

<script>
import { orderDetailsCollection, ordersCollection } from '../firebase'
export default {
  name: 'TransactionDetails',
  created() {
    this.initialize()
  },
  data() {
    return {
      productDetails: [],
      orderDetailID: []
    }
  },
  methods: {
    initialize() {
      ordersCollection
        .doc(this.$route.params.id)
        .get()
        .then(querySnapshot => {
          this.orderDetailID = querySnapshot.data().orderDetailID
        })
        .then(() => {
          this.orderDetailID.forEach(id => {
            orderDetailsCollection.doc(id).get().then(doc => {
              this.productDetails.push({...doc.data(),id: id})
            })
          })
        })
    }
  },
  computed: {
    sum() {
      let sum = 0
      this.productDetails.forEach(pd => {
        sum = sum + pd.productPrice*pd.quantityPerUnit
      })
      return sum
    }
  },
}
</script>

<style lang="scss" scoped>
</style>