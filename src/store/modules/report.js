import report from '@/api/report'

export default {
  namespaced: true,
  state: {
    orders: [],
    todayOrders: [],
    ordersIncomeExpense: [],
    orderDetails: []
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
    },
    setOrdersIncomeExpense(state, ordersIncomeExpense) {
      state.ordersIncomeExpense = ordersIncomeExpense
    },
    setOrderDetails(state, orders) {
      state.orderDetails = orders
    }
  }
}
