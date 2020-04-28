<template>
  <div id="report_best_seller">
    <v-data-table
      :headers="headers"
      :items="getBestSellerProducts"
      :items-per-page="5"
      class="elevation-1"
      :sort-by.sync="sortTable"
      sort-desc
    ></v-data-table>
      <!-- :options.sync="options" -->
      <!-- :options="options" -->
      <!-- :sort-by="productPrice" -->
    <!-- :sort-desc.sync="sortDesc" -->
    <!-- default-sort="productPrice:desc" -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'ReportBestSeller',
  data() {
    return {
      sortTable: 'productPrice',
      options: {
        sortBy: 'productPrice',
        sortDesc: true
      },
      headers: [
        {
          text: 'ชื่อสินค้า',
          align: 'start',
          value: 'productName'
        },
        { text: 'ยอดขาย', value: 'productPrice' },
        { text: 'กำไร', value: 'profit' },
        { text: 'ปริมาณ', value: 'quantityPerUnit' },
        { text: 'ต้นทุน', value: 'productCost' }
      ]
    }
  },
  created() {
    this.$store.dispatch('report/fetchOrderDetails')
  },
  computed: {
    ...mapGetters({
      getBestSellerProducts: 'report/getBestSellerProducts'
    })
  }
}
</script>

<style scoped>
</style>