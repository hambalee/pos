<template>
  <div id="report_chart">
    <v-tabs>
      <v-tab>วัน</v-tab>
      <v-tab>เดือน</v-tab>
      <v-tab>ปี</v-tab>
      <v-tab-item>
        <v-card outlined>
          <v-card-text>
            <v-col cols="12" lg="6">
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="computedDateFormatted"
                    label="วันที่"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  no-title
                  @input="menu2 = false; $store.dispatch('report/fetchOrders')"
                  @change="$store.commit('report/setdayDatePickISO',date)"
                ></v-date-picker>
              </v-menu>
<!--               <p>
                Date in ISO format:
                <strong>{{ date }}</strong>
              </p> -->
            </v-col>
            <apexchart height="400" type="area" :options="dayChartOptions" :series="daySeries"></apexchart>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <apexchart
          width="100%"
          height="400"
          type="area"
          :options="chartOptions"
          :series="testmonthSeries"
        ></apexchart>
      </v-tab-item>
      <v-tab-item>
        <apexchart
          width="100%"
          height="400"
          type="area"
          :options="chartOptions"
          :series="testyearSeries"
        ></apexchart>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
// eslint-disable-next-line no-unused-vars
import moment from 'moment'
export default {
  name: 'ReportChart',
  data: () => ({
    menu2: false,
    date: new Date().toISOString().substr(0, 10),
    chartOptions: {
      chart: {
        id: 'chart'
      }
    },
    dayChartOptions: {
      chart: {
        id: 'chart'
      },
      xaxis: {
        title: { text: 'Hour' },
        formatter: function(value) {
          return value + '$'
        }
      },
      yaxis: {
        title: { text: 'ยอดขาย' }
      }
    }
  }),
  created() {
    // this.$store.dispatch('report/fetchOrders')
  },
  computed: {
    ...mapState({
      testdaySeries: state => state.report.testdaySeries,
      testmonthSeries: state => state.report.testmonthSeries,
      testyearSeries: state => state.report.testyearSeries,
      daySeries: state => state.report.daySeries,
      monthSeries: state => state.report.monthSeries,
      yearSeries: state => state.report.yearSeries,
      dayDatePickISO: state => state.report.dayDatePickISO
    }),
    computedDateFormatted() {
      return this.formatDate(this.date)
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>