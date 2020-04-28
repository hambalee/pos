import report from '@/api/report'

export default {
  namespaced: true,
  state: {
    orders: [],
    todayOrders: [],
    ordersIncomeExpense: [],
    orderDetails: [],
    testdaySeries: [
      {
        name: 'ยอดขาย',
        data: [
          {
            x: '08:00',
            y: 34
          },
          {
            x: '09:00',
            y: 43
          },
          {
            x: '10:00',
            y: 31
          },
          {
            x: '11:00',
            y: 140
          },
          {
            x: '12:00',
            y: 200
          },
          {
            x: '13:00',
            y: 150
          },
          {
            x: '14:00',
            y: 80
          },
          {
            x: '15:00',
            y: 70
          },
          {
            x: '16:00',
            y: 44
          },
          {
            x: '17:00',
            y: 60
          }
        ]
      }
    ],
    testmonthSeries: [
      {
        name: 'ยอดขาย',
        data: [
          {
            x: '2020-04-04',
            y: 34
          },
          {
            x: '2020-04-06',
            y: 43
          },
          {
            x: '2020-04-08',
            y: 31
          },
          {
            x: '2020-04-09',
            y: 43
          },
          {
            x: '2020-04-14',
            y: 33
          },
          {
            x: '2020-04-28',
            y: 52
          }
        ]
      }
    ],
    testyearSeries: [
      {
        name: 'Series 1',
        data: [
          {
            x: '1',
            y: 34
          },
          {
            x: '2',
            y: 43
          },
          {
            x: '3',
            y: 31
          },
          {
            x: '4',
            y: 43
          },
          {
            x: '5',
            y: 33
          },
          {
            x: '6',
            y: 52
          }
        ]
      }
    ],
    daySeries: [],
    monthSeries: [],
    yearSeries: [],
    dayDatePickISO: new Date().toISOString().substr(0, 10),
    monthDatePickISO: new Date().toISOString().substr(0, 7),
    yearDatePickISO: new Date().toISOString().substr(0, 4)
  },
  getters: {
    getOrdersIncomeExpense(state) {
      let groupDate = []
      state.ordersIncomeExpense.forEach(order => {
        let found = false
        groupDate.forEach(g => {
          if (g.dateISO === order.dateISO) {
            //check same date
            found = true
            g.orderPriceIfNoDiscount += order.orderPriceIfNoDiscount
            g.orderDiscount += order.orderDiscount
            g.orderPrice += order.orderPrice
            g.orderProfit += order.orderProfit
            g.orderCost += order.orderCost
          }
        })
        if (!found) groupDate.push({ ...order })
      })
      return groupDate
    },
    getBestSellerProducts(state) {
      let betSeller = []
      state.orderDetails.forEach(detail => {
        let found = false
        betSeller.forEach(bs => {
          if (bs.productID === detail.productID) {
            //check same product
            found = true
            bs.productPrice += detail.productPrice
            bs.productCost += detail.productCost
            bs.quantityPerUnit += detail.quantityPerUnit
            bs.profit += detail.profit
          }
        })
        if (!found) betSeller.push({ ...detail })
      })
      return betSeller
    },
    getBestSellerCategory(state) {
      let betSeller = []
      state.orderDetails.forEach(detail => {
        let found = false
        betSeller.forEach(bs => {
          if (bs.categoryID === detail.categoryID) {
            //check same product
            found = true
            bs.productPrice += detail.productPrice
            bs.productCost += detail.productCost
            bs.quantityPerUnit += detail.quantityPerUnit
            bs.profit += detail.profit
          }
        })
        if (!found) betSeller.push({ ...detail })
      })
      return betSeller
    },
    getdaySeries(state) {
      return state.daySeries
    },
    getmonthSeries(state) {
      return state.monthSeries
    },
    getyearSeries(state) {
      return state.yearSeries
    }
  },
  actions: {
    fetchOrders({ commit }) {
      return new Promise(resolve => {
        report.getOrders().then(orders => {
          commit('setOrders', orders)
          resolve()
        })
      })
    },
    fetchOrdersIncomeExpense({ commit, state }) {
      commit('setOrdersIncomeExpense', state.orders)
    },
    fetchOrderDetails({ commit }) {
      return new Promise(resolve => {
        report.getOrderDetails().then(orders => {
          commit('setOrderDetails', orders)
          resolve()
        })
      })
    },
    fetchOrdersForDay({ commit }) {
      return new Promise(resolve => {
        report.getOrders().then(orders => {
          commit('setOrdersForDay', orders)
          resolve()
        })
      })
    },
    fetchOrdersForMonth({ commit }) {
      return new Promise(resolve => {
        report.getOrders().then(orders => {
          commit('setOrdersForMonth', orders)
          resolve()
        })
      })
    },
    fetchOrdersForYear({ commit }) {
      return new Promise(resolve => {
        report.getOrders().then(orders => {
          commit('setOrdersForYear', orders)
          resolve()
        })
      })
    }
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders
    },
    setOrdersIncomeExpense(state, ordersIncomeExpense) {
      state.ordersIncomeExpense = ordersIncomeExpense
    },
    setOrderDetails(state, orders) {
      state.orderDetails = orders
    },
    setdayDatePickISO(state, date) {
      state.dayDatePickISO = date
    },
    setmonthDatePickISO(state, date) {
      state.monthDatePickISO = date
    },
    setyearDatePickISO(state, date) {
      state.yearDatePickISO = date
    },
    setOrdersForDay(state, orders) {
      state.todayOrders = orders.filter(
        order => order.dateISO === new Date().toISOString().substr(0, 10)
      )
      let hour = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
        { x: 7, y: 0 },
        { x: 8, y: 0 },
        { x: 9, y: 0 },
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 12, y: 0 },
        { x: 13, y: 0 },
        { x: 14, y: 0 },
        { x: 15, y: 0 },
        { x: 16, y: 0 },
        { x: 17, y: 0 },
        { x: 18, y: 0 },
        { x: 19, y: 0 },
        { x: 20, y: 0 },
        { x: 21, y: 0 },
        { x: 22, y: 0 },
        { x: 23, y: 0 }
      ]
      state.orders.forEach(order => {
        if (order.dateISO === state.dayDatePickISO) {
          hour.forEach(h => {
            if (h.x === order.hour) {
              h.y += order.orderPriceIfNoDiscount
            }
          })
        }
      })

      state.daySeries = [{ name: 'ยอดขาย', data: [...hour] }]
    },
    setOrdersForMonth(state) {
      let month = []
      state.orders.forEach(order => {
        if (order.dateISO.substr(0, 7) === state.monthDatePickISO) {
          // only selected month
          //check same date
          let found = false
          month.forEach(m => {
            if (m.x === order.dateISO) {
              found = true
            }
            if (found) {
              m.y += order.orderPriceIfNoDiscount
            }
          })
          if (!found) {
            month.push({ x: order.dateISO, y: order.orderPriceIfNoDiscount })
          }
          // let found = false
          // month.forEach(m => {
          //   console.log(m);
          //   if (m.dateISO === order.dateISO) {
          //     found = true
          //     m.y += order.orderPrice
          //   }
          // })
          // if (!found) month.push({ x: order.dateISO, y: 100 })
        }
      })
      // console.log(month)
      state.monthSeries = [{ name: 'ยอดขาย', data: [...month] }]
      // console.log(state.monthSeries);
    },
    setOrdersForYear(state) {
      let data = [0,0,0,0,0,0,0,0,0,0,0,0,]
      state.orders.forEach(order => {
        if(order.dateYear == state.yearDatePickISO){
          for (let i = 0; i < 12; i++) {
            if(order.dateMonth === i)
            data[i] = data[i] + order.orderPriceIfNoDiscount
          }
        }
      })

      state.yearSeries = [{ name: 'ยอดขาย', data: [...data] }]
    }
  }
}
