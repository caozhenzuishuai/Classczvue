import Vue from "vue";

import Vuex from "vuex";
Vue.use(Vuex);

const state = {
  count: 0,
};

const actions = {
  increment(context) {
    context.commit("INCREMENT");
  },
  decrement({ commit }) {
    commit("DECREMENT");
  },
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

const store = new Vuex.Store({
  state,
  actions,
  mutations,
});

export default store;
