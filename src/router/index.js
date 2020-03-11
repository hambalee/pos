import Vue from "vue";
import VueRouter from "vue-router";
import Stock from "../views/Stock.vue";
import Shop from "../views/Shop.vue";
import Report from "../views/Report.vue";
import Transaction from "../views/Transaction.vue";
import LoginPage from "../components/LoginPage.vue";
import store from '../store/index'
// import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/stock",
    name: "stock",
    component: Stock,
    meta: {
      requiresAuth: true,
      title: "คลังสินค้า"
    }
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      title: "เข้าสู่ระบบ"
    }
  },
  {
    path: "/shop",
    name: "shop",
    component: Shop,
    meta: {
      requiresAuth: true,
      title: "หน้าร้าน"
    }
  },
  {
    path: "/report",
    name: "report",
    component: Report,
    meta: {
      requiresAuth: true,
      title: "รายงาน"
    }
  },
  {
    path: "/transaction",
    name: "transaction",
    component: Transaction,
    meta: {
      requiresAuth: true,
      title: "ประวัติ"
    }
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/supplier",
    name: "supplier",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Supplier.vue"),
    meta: {
      requiresAuth: true,
      title: "ผู้ผลิต"
    }
  },
  {
    path: "/customer",
    name: "customer",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Customer.vue"),
    meta: {
      requiresAuth: true,
      title: "ลูกค้า"
    }
  },
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "*",
    redirect: "/login"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  /*   const requiresAuth = to.meta.requiresAuth
  if (requiresAuth && !this.$store.getters.isLogin) {
    next('/login')
  } */
  /*   const user = firebase
    .auth()
    .currentUser
  if (!user) {
    next('/login')
  } */
  /*   if(!store.getters.isLogin){
    next('/login')
  } */
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // const isAuthenticated = firebase.auth().currentUser;
  // const isAuthenticated = store.getters.isLogin;

  if (requiresAuth && !store.getters.isLogin) {
    next("/login");
  }
  next();
});

export default router;
