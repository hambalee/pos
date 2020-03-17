import Vue from "vue";
import VueRouter from "vue-router";
import Stock from "../views/Stock.vue";
import Shop from "../views/Shop.vue";
import Report from "../views/Report.vue";
import Transaction from "../views/Transaction.vue";
import LoginPage from "../components/LoginPage.vue";
// eslint-disable-next-line no-unused-vars
import store from "../store/index";
import Import from "../views/Import.vue";
import ImportCreate from "../views/ImportCreate.vue";
// eslint-disable-next-line no-unused-vars
import firebase from "firebase";

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
      import(/* webpackChunkName: "supplier" */ "../views/Supplier.vue"),
    meta: {
      requiresAuth: true,
      title: "ผู้ผลิต"
    }
  },
  {
    path: "/customer",
    name: "customer",
    component: () =>
      import(/* webpackChunkName: "customer" */ "../views/Customer.vue"),
    meta: {
      title: "ลูกค้า"
    }
  },
  {
    path: "/stock/details/:id",
    name: "stock-view",
    component: () =>
      import(/* webpackChunkName: "customer" */ "../views/StockView.vue"),
    meta: {
      title: "รายละเอียด"
    }
  },
  {
    path: "/stock/import",
    name: "import",
    component: Import,
    meta: {
      requiresAuth: true,
      title: "นำเข้า"
    }
  },
  {
    path: "/stock/import/create",
    name: "import-create",
    component: ImportCreate,
    meta: {
      requiresAuth: true,
      title: "สร้างใบสั่งซื้อ"
    }
  },
  /*   {
    path: "/",
    redirect: "/login"
  }, */
  /*   {
    path: "*",
    redirect: "/about"
  } */
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // console.log("User is logined from router");
      // update data or vuex state
      store.dispatch("doLogin");
      // console.log("check state q", store.getters.isLogin);
    } else {
      // console.log("check state else", store.getters.isLogin);
      // console.log("User is not logged in. from router before each");
      //if (store.getters.isLogin && to.path === "/login") next("/stock")
      if (to.meta.requiresAuth && !store.getters.isLogin) {
        next("/login");
      }
    }
  });
  next();

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
  // const isAuthenticated = firebase.auth().currentUser;
  // const isAuthenticated = store.getters.isLogin;

  // eslint-disable-next-line no-unused-vars
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // eslint-disable-next-line no-constant-condition
  /*   if (store.getters.isLogin && to.name === "/login") {
    next("/stock");
  } */
  /*   if (requiresAuth && !store.getters.isLogin) {
    next("/login");
  } */
});

export default router;
