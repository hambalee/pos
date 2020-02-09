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
    redirect: '/stock'
  },
  {
    path: '/stock',
    name: 'stock',
    component: Stock,
    meta: {
      title: "คลังสินค้า"
    }
  },
  {
    path: '/shop',
    name: 'shop',
    component: Shop,
    meta: {
      title: "หน้าร้าน"
    }
  },
  {
    path: '/report',
    name: 'report',
    component: Report,
    meta: {
      title: "รายงาน"
    }
  },
  {
    path: '/transaction',
    name: 'transaction',
    component: Transaction,
    meta: {
      title: "ประวัติ"
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/supplier',
    name: 'supplier',
    component: () => import(/* webpackChunkName: "about" */ '../views/Supplier.vue'),
    meta: {
      title: "ผู้ผลิต"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
