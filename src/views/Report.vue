<template>
  <div id="report">
    <!-- 4 card -->
    <v-row>
      <v-col lg="3" md="6" sm="12" cols="12">
        <ReportCard title="กำไร" :subtitle="orderProfit" />
      </v-col>
      <v-col lg="3" md="6" sm="12" cols="12">
        <ReportCard title="ยอดขาย" :subtitle="orderSales" />
      </v-col>
      <v-col lg="3" md="6" sm="12" cols="12">
        <ReportCard title="ต้นทุน" :subtitle="orderCost" />
      </v-col>
      <v-col lg="3" md="6" sm="12" cols="12">
        <ReportCard title="ส่วนลด" :subtitle="orderDiscount" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-tabs vertical>
          <v-tab>
            <v-icon left>show_chart</v-icon>กราฟ
          </v-tab>
          <v-tab>
            <v-icon left>thumb_up_alt</v-icon>ขายดี
          </v-tab>
          <v-tab>
            <v-icon left>report</v-icon>ใกล้หมด
          </v-tab>
          <v-tab>
            <v-icon left>account_balance_wallet</v-icon>ยอดขาย
          </v-tab>
          <v-tab>
            <v-icon left>category</v-icon>หมวดหมู่
          </v-tab>
          <v-tab-item>
            <v-card flat>
                <ReportChart />
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <ReportBestSeller />
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <ReportMinimum />
          </v-tab-item>
          <v-tab-item>
            <ReportIncomeExpense />
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import { productsCollection } from '../firebase'
import ReportCard from '@/components/report/ReportCard'
import ReportChart from '@/components/report/ReportChart'
import ReportBestSeller from '@/components/report/ReportBestSeller'
import ReportMinimum from '@/components/report/ReportMinimum'
import ReportIncomeExpense from '@/components/report/ReportIncomeExpense'
// eslint-disable-next-line no-unused-vars
import { mapState } from 'vuex'

export default {
  name: 'Report',
  components: {
    ReportCard,
    ReportChart,
    ReportBestSeller,
    ReportMinimum,
    ReportIncomeExpense
  },
  created() {
    this.$store.dispatch('report/fetchOrders')
  },
  computed: {
    ...mapState({
      orders: state => state.report.orders,
      todayOrders: state => state.report.todayOrders
    }),
    orderSales() {
      return this.todayOrders.reduce(
        (total, order) => total + order.orderPrice,
        0
      )
    },
    orderProfit() {
      return this.todayOrders.reduce(
        (total, order) => total + order.orderProfit,
        0
      )
    },
    orderDiscount() {
      return this.todayOrders.reduce(
        (total, order) => total + order.orderDiscount,
        0
      )
    },
    orderCost() {
      return this.todayOrders.reduce((total, order) => {
        if (order.orderCost) {
          return total + order.orderCost
        }else{
          return total + 0
        }
      }, 0)
    }
  },
  methods: {}
}
</script>

<style></style>
