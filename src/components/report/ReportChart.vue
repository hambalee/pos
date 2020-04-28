<template>
  <div id="report_chart">
    <v-tabs>
      <v-tab>วัน</v-tab>
      <v-tab>เดือน</v-tab>
      <v-tab>ปี</v-tab>
      <!-- Day Chart -->
      <v-tab-item :transition="false" :reverse-transition="false">
        <v-card outlined>
          <v-card-text>
            <v-col cols="12" lg="6" class="pa-0">
              <v-menu
                v-model="menu1"
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
                  @input="menu1 = false"
                  @change="$store.commit('report/setdayDatePickISO', date); $store.dispatch('report/fetchOrdersForDay')"
                ></v-date-picker>
                <!-- @input="menu1 = false; $store.dispatch('report/fetchOrders')" -->
              </v-menu>
            </v-col>
            <apexchart height="400" type="line" :options="dayChartOptions" :series="getdaySeries"></apexchart>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <!-- Month Chart -->
      <v-tab-item :transition="false" :reverse-transition="false">
        <v-row>
          <v-col cols="12" lg="6" class="pa-0">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="computedMonthFormatted"
                  label="เดือน"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                locale="th"
                v-model="date2"
                type="month"
                no-title
                scrollable
                @input="menu2 = false"
                @change="$store.commit('report/setmonthDatePickISO', date2); $store.dispatch('report/fetchOrdersForMonth')"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <apexchart
          width="100%"
          height="400"
          type="area"
          :options="monthChartOptions"
          :series="getmonthSeries"
        ></apexchart>
      </v-tab-item>
      <!-- Year Chart -->
      <v-tab-item :transition="false" :reverse-transition="false">
        <datepicker
          :minimumView="'year'"
          :maximumView="'year'"
          :initialView="'year'"
          v-model="date3"
          format="yyyy"
          class="pl-5 pt-2"
          @input="setYear"
        ></datepicker>
        <apexchart
          width="100%"
          height="400"
          type="area"
          :options="yearChartOptions"
          :series="getyearSeries"
        ></apexchart>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
// eslint-disable-next-line no-unused-vars
import moment from 'moment'
import Datepicker from 'vuejs-datepicker'
export default {
  name: 'ReportChart',
  components: {
    Datepicker
  },
  data: () => ({
    menu1: false,
    menu2: false,
    date: new Date().toISOString().substr(0, 10),
    date2: new Date().toISOString().substr(0, 7),
    date3: new Date().toISOString().substr(0, 4),
    chartOptions: {
      chart: {
        id: 'chart'
      }
    },
    dayChartOptions: {
      chart: {
        id: 'chart'
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        title: { text: 'ชม.' },
        formatter: function(value) {
          return value + '$'
        }
      },
      yaxis: {
        title: { text: 'ยอดขาย' }
      }
    },
    monthChartOptions: {
      chart: {
        id: 'chart'
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        title: {
          text: 'วันที่'
        },
        type: 'datetime'
      },
      yaxis: {
        title: { text: 'ยอดขาย' }
      }
    },
    yearChartOptions: {
      chart: {
        id: 'chart'
      },
      dataLabels: {
        enabled: true
      },
      xaxis: {
        title: {
          text: 'เดือน'
        },
        categories: [
          'มกราคม',
          'กุมภาพันธ์',
          'มีนาคม',
          'เมษายน',
          'พฤษภาคม',
          'มิถุนายน',
          'กรกฎาคม',
          'สิงหาคม',
          'กันยายน',
          'ตุลาคม',
          'พฤศจิกายน',
          'ธันวาคม'
        ]
      },
      yaxis: {
        title: { text: 'ยอดขาย' }
      }
    }
  }),
  created() {
    this.$store.dispatch('report/fetchOrdersForDay')
    this.$store.dispatch('report/fetchOrdersForMonth')
    this.$store.dispatch('report/fetchOrdersForYear')
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
    ...mapGetters({
      getdaySeries: 'report/getdaySeries',
      getmonthSeries: 'report/getmonthSeries',
      getyearSeries: 'report/getyearSeries'
    }),
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
    computedMonthFormatted() {
      return this.formatMonth(this.date2)
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      // eslint-disable-next-line no-unused-vars
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
      // return `${day}/${month}`
    },
    formatMonth(date) {
      if (!date) return null

      // eslint-disable-next-line no-unused-vars
      const [year, month] = date.split('-')
      // return `${month}`
      return `${month}/${year}`
    },
    setYear() {
      this.$store.commit(
        'report/setyearDatePickISO',
        this.date3.toISOString().substr(0, 4)
      )
      this.$store.dispatch('report/fetchOrdersForYear')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>