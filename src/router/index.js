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
      component: () => import("../views/Register.vue"),
      meta: {
        footShow: false,
      },
    },
    {
      path: "/login",
      component: () => import("../views/Login.vue"),
      meta: {
        footShow: false,
      },
    },
    {
      path: "/home",
      component: () => import("../views/Home.vue"),
      meta: {
        footShow: true,
      },
    },
    {
      path: "/cart",
      component: () => import("../views/Cart.vue"),
      meta: {
        footShow: true,
      },
    },
    {
      path: "/profile",
      component: () => import("../views/Profile.vue"),
      meta: {
        footShow: true,
      },
    },
    {
      path: "/sort",
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
  ],
  linkActiveClass: "active",
});
export default router;
