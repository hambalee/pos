import report from '@/api/report'

export default {
  namespaced: true,
  state: {
    orders: [],
    todayOrders: [],
    ordersIncomeExpense: []
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
/*     getTodayOrders(state) {
      let todayDate = new Date()
      let todayISO = todayDate.toISOString().substr(0, 10)
      let neworders = []
      neworders = state.orders.filter(order => order.dateISO === todayISO )
      return neworders
    } */

    // orderSales(state) {
    //   return state.orders
    //   // return state.orders.filter(order => order.orderDate.seconds >= 1587945600)
    // },
    // getTodayOrders(state){
    //   // return state.orders.filter(order => order.orderDate.seconds >= 0)
    //   return state.orders
    // }
    //     getOrderSales(getters) {
    // /*       let total = 0
    //       for(let i = 0; i< getters.orderSales.length; i++){
    //         total = total + getters.orderSales[i]
    //       }
    //       return total */
    //       // return getters.orderSales.reduce( (total, order) => total + order.orderPrice ,0)
    //       // console.log(getters.orderSales[0]);

    //     }
  },
  actions: {
    fetchOrders({ commit }) {
      return new Promise(resolve => {
        report.getOrders().then(orders => {
          commit('setOrders', orders)
          commit('setTodayOrders', orders)
          resolve()
        })
      })
    },
    fetchOrdersIncomeExpense({ commit, state }) {
      commit('setOrdersIncomeExpense', state.orders)
    },
/*     fetchTodayOrders({ commit, getters }) {
      commit('setTodayOrders', getters.getTodayOrders)
    } */
  },
  mutations: {
    setOrders(state, orders) {
      state.orders = orders
    },
    setOrdersIncomeExpense(state, ordersIncomeExpense) {
      state.ordersIncomeExpense = ordersIncomeExpense
    },
/*     setTodayOrders(state, todayOrders) {
      state.todayOrders = todayOrders
    } */
    setTodayOrders(state, orders) {
      state.todayOrders = orders.filter(order => order.dateISO === new Date().toISOString().substr(0, 10) )
    }
  }
}
