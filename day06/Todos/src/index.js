import Vue from "vue";
import App from "./App";
import "./index.css";

new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  el: "#tab",
  render: (h) => h(App),
});
