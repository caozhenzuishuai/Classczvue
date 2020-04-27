import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  count: 0,
};

const actions = {
  incrementIfOdd({ commit, state }) {
    if (state.count % 2 === 0) {
      commit("INCREMENT");
    }
  },
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit("INCREMENT");
    }, 1000);
  },
};

const mutations = {
  INCREMENT(state) {
    state.count++;
  },
  DECREMENT() {
    state.count--;
  },
};
const getters = {
  oddOrEven() {
    return state.count % 2 === 1 ? "奇数" : "偶数";
  },
};
const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});

export default store;
