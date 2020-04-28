<template>
  <v-data-table :headers="headers" :items="orders" class="elevation-1" @click:row="rowClick">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>ประวัติการสั่งซื้อ</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small @click.stop="deleteItem(item)">delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
import {
  ordersCollection,
  orderDetailsCollection,
  productsCollection
} from '../firebase'
import moment from 'moment'
export default {
  data: () => ({
    headers: [
      {
        text: 'หมายเลขคำสั่งซื้อ',
        align: 'left',
        value: 'recieptNumber'
      },
      { text: 'วันที่', value: 'orderDate' },
      { text: 'จำนวนเงิน', value: 'orderPrice' },
      { text: 'จำนวนรายการ', value: 'orderDetailID.length' },
      { text: '', value: 'action', sortable: false }
    ],
    orders: []
  }),

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      ordersCollection
        .orderBy('recieptNumber', 'desc')
        .get()
        .then(querySnapshot => {
          this.orders = querySnapshot.docs.map(doc => {
            let tmp
            tmp = doc.data()
            tmp.id = doc.id
            tmp.orderDate = moment(tmp.orderDate.toDate())
              .locale('th')
              .format('LLLL')
            return tmp
          })
        })
    },

    deleteItem(item) {
      const index = this.orders.indexOf(item)
      var result = confirm('Are you sure you want to delete this item?')
      if (result) {
        this.orders.splice(index, 1)
        ordersCollection.doc(item.id).delete()
        item.orderDetailID.map(i => {
          let productid
          let quantityPerUnit
          orderDetailsCollection
            .doc(i)
            .get()
            .then(q => {
              productid = q.data().productID
              quantityPerUnit = q.data().quantityPerUnit
            })
            .then(() => {
              productsCollection
                .doc(productid)
                .get()
                .then(qr => {
                  let qty = qr.data().quantityPerUnit
                  return qty
                })
                .then(qty => {
                  //updata product quantityPerUnit in stock
                  productsCollection.doc(productid).update({
                    quantityPerUnit: qty + quantityPerUnit
                  })
                })
            })
            .then(() => {
              orderDetailsCollection.doc(i).delete() //delete order detail collection
            })
        })
      }
    },
    rowClick(item) {
      this.$router.push('/transaction/details/' + item.id)
    }
  }
}
</script>

<style></style>
