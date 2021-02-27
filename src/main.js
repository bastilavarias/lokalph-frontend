import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axiosService from "@/services/axios-service";

Vue.config.productionTip = false;
axiosService.init();

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
