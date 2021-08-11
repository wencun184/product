import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/register",
      name: "Register",
      component: () => import("../views/Register.vue"),
      meta: {
        footShow: false,
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
      meta: {
        footShow: false,
      },
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue"),
      meta: {
        footShow: true,
      },
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import("../views/Cart.vue"),
      meta: {
        footShow: true,
      },
    },
    {
      path: "/sort",
      name: "Sort",
      component: () => import("../views/Sort.vue"),
      meta: {
        footShow: true,
      },
    },
    {
      path: "/detail/:id",
      component: () => import("../views/Detail.vue"),
      meta: {
        footShow: false,
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: () => import("../views/Profile.vue"),
      meta: {
        footShow: true,
      },
    },
    {
      path: "/profile/password",
      name: "ChangPWD",
      component: () => import("../views/user/ChangPWD.vue"),
    },
    {
      path: "/profile/info",
      name: "ChangPWD",
      component: () => import("../views/user/Info.vue"),
    },
    {
      path: "/profile/address",
      name: "Address",
      component: () => import("../views/user/Address.vue"),
    },
    {
      path: "/profile/order",
      name: "Order",
      component: () => import("../views/user/Order.vue"),
    },
    {
      path: "*",
      component: () => import("../views/Error.vue"),
      meta: {
        footShow: false,
      },
    },
  ],
});
export default router;
