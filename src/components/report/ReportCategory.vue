<template>
  <div id="report_category">
    <v-data-table
      :headers="headers"
      :items="getBestSellerCategory"
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
  name: 'ReportCategory',
  data() {
    return {
      sortTable: 'productPrice',
      options: {
        sortBy: 'productPrice',
        sortDesc: true
      },
      headers: [
        {
          text: 'ชื่อหมวดหมู่',
          align: 'start',
          value: 'categoryName'
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
      getBestSellerCategory: 'report/getBestSellerCategory'
    })
  }
}
</script>

<style scoped>
</style>