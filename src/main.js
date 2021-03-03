import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axiosService from "@/services/axios-service";
import VueMeta from "vue-meta";

Vue.config.productionTip = false;
axiosService.init();
Vue.use(VueMeta);

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
