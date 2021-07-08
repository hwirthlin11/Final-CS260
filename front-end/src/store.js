import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { getCookie, setCookie, parseErrorMessage } from "./helper";
import { BASE_URL } from "./constants";
Vue.use(Vuex);

const state = {
  user: {
    email: "",
    firstName: "",
    lastName: "",
    token: "",
    _id: "",
  },
  isAuth: false,
};

const mutations = {
  increment(state) {
    state.count++;
  },
  login(state) {
    let user = getCookie("user");
    if (user != "") {
      state.user = JSON.parse(user);
      state.isAuth = true;
    }
  },
  logOut(state) {
    setCookie("user", "", 1);
    state.user = {
      email: "",
      firstName: "",
      lastName: "",
      token: "",
      _id: "",
    };
    state.isAuth = false;
  },
  decrement(state) {
    state.count--;
  },
};

const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(BASE_URL + "/api/auth/login", payload)
        .then(function(response) {
          if (
            response.data &&
            response.data.data &&
            response.data.status == 1
          ) {
            setCookie("user", JSON.stringify(response.data.data));
            commit("login");
            resolve(response);
          } else {
            reject();
          }
        })
        .catch(function(error) {
          reject(parseErrorMessage(error));
        });
    });
  },
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
});
