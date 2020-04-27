import Vue from "vue";

import VueResource from "vue-resource";
import App from "./App";

Vue.use(VueResource);
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  el: "#app",
  render: (h) => h(App),
});
