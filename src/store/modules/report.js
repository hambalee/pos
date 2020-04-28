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
    dayDatePickISO: new Date().toISOString().substr(0,10)
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
    }
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders
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
              h.y += order.orderPrice
            }
          })
        }
      })

      state.daySeries = [{ name: 'ยอดขาย', data: [...hour] }]
    },
    setOrdersIncomeExpense(state, ordersIncomeExpense) {
      state.ordersIncomeExpense = ordersIncomeExpense
    },
    setOrderDetails(state, orders) {
      state.orderDetails = orders
    },
    setdayDatePickISO(state, date) {
      state.dayDatePickISO = date
    }
  }
}
