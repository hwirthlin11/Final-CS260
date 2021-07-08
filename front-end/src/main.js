import Vue from "vue";
import App from "./App.vue";
import PublicLayout from "./PublicLayout.vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Login from "./components/Login";
import Register from "./components/Register";
import Appointment from "./components/Appointment";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Service from "./components/Service";
import { getCookie } from "./helper";

import store from "./store";
import VueRouter from "vue-router";
import "./style.css";
Vue.config.productionTip = false;

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/login",

    component: PublicLayout,
    children: [{ path: "", name: "login", component: Login }],
  },
  {
    path: "/register",
    component: PublicLayout,
    children: [{ path: "", name: "register", component: Register }],
  },

  {
    path: "/dashboard",
    component: App,
    children: [
      { path: "", component: Dashboard, name: "dashboard" },
      { path: "appointement", component: Appointment, name: "appointement" },
      { path: "service", component: Service, name: "service" },
    ],
  },
];
const router = new VueRouter({
  routes, // short for `routes: routes`
});

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueRouter);
store.commit("login");
router.beforeEach((to, from, next) => {
  let user = getCookie("user");
  if (user == null || user == "") {
    if (
      to.name !== "login" &&
      to.name !== "register" &&
      to.name !== "home" &&
      !store.state.isAuth
    ) {
      next({ name: "home" });
    } else {
      next();
    }
  } else {
    if (to.name === "login" || to.name === "register" || to.name === "home") {
      next({ name: "dashboard" });
    } else {
      next();
    }
  }
});
new Vue({
  el: "#app",
  store,
  router,
  render: (h) => h(PublicLayout),
});
