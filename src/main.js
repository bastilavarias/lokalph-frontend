import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axiosService from "@/services/axios-service";
import VueMeta from "vue-meta";
import VuetifyAlgoliaPlaces from "vuetify-algolia-places";

Vue.config.productionTip = false;
axiosService.init();
Vue.use(VueMeta);
Vue.use(VuetifyAlgoliaPlaces, {
    algolia: {
        appId: "plN18NJ07I8D",
        apiKey: "f693daecd680aeb18bb06c39b59dfbee",
    },
});

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
