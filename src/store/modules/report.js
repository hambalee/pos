import report from '@/api/report'

export default {
  namespaced: true,
  state: {
    orders: [],
    todayOrders: [],
    ordersIncomeExpense: [],
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
        if (!found) groupDate.push({...order})
      })
      return groupDate
    },
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
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders
      state.todayOrders = orders.filter(order => order.dateISO === new Date().toISOString().substr(0, 10) )
    },
    setOrdersIncomeExpense(state, ordersIncomeExpense) {
      state.ordersIncomeExpense = ordersIncomeExpense
    },
  }
}
