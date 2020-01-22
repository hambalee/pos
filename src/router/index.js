import Vue from 'vue'
import VueRouter from 'vue-router'
import Stock from '../views/Stock.vue'
import Shop from '../views/Shop.vue'
import Report from '../views/Report.vue'
import Transaction from '../views/Transaction.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'stock',
    component: Stock
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop
  },
  {
    path: '/report',
    name: 'report',
    component: Report
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: Transaction
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
