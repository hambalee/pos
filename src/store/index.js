import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    username: ""
  },
  getters: {
    isLogin(state) {
/*       if(firebase.auth().currentUser){
        state.isLogged = true;
      } */
      return state.isLogged;
    }
  },
  mutations: {
    SET_LOGGED_IN(state) {
      state.isLogged = true;
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false;
    },
    SET_USERNAME(state, value) {
      state.username = value;
    }
  },
  actions: {
    doLogin({ commit }) {
      commit("SET_LOGGED_IN");
    },
    doLogout({ commit }) {
      commit("SET_LOGGED_OUT");
    },
    restoreLogin({ commit }) {
      if (firebase.auth().currentUser) {
        commit("SET_LOGGED_IN");
      }
    },
  },
  modules: {}
});
