<template>
  <div id="report_income_expense">
    <v-data-table :headers="headers" :items="getOrdersIncomeExpense" :items-per-page="5" class="elevation-1"></v-data-table>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'ReportIncomeExpense',
  data() {
    return {
      headers: [
        {
          text: 'วันที่',
          align: 'start',
          sortable: true,
          value: 'showDate'
        },
        { text: 'ยอดรวม', value: 'orderPriceIfNoDiscount' },
        { text: 'ส่วนลด', value: 'orderDiscount' },
        { text: 'ยอดสุทธิ', value: 'orderPrice' },
        { text: 'ต้นทุน', value: 'orderCost' },
        { text: 'กำไรสุทธิ', value: 'orderProfit' }
      ],
    }
  },
  created () {
      this.$store.dispatch('report/fetchOrdersIncomeExpense');
  },
  computed: {
      ...mapState({
          ordersIncomeExpense: state => state.report.ordersIncomeExpense
      }),
      ...mapGetters({
      getOrdersIncomeExpense: 'report/getOrdersIncomeExpense'
    }),
  },

}
</script>

<style scoped>
</style>