import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
// eslint-disable-next-line to ignore the next line.
import API_KEY from "./components/.env";

Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
