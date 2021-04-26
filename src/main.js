import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axiosService from "@/services/axios-service";
import VueMeta from "vue-meta";
import VuetifyAlgoliaPlaces from "vuetify-algolia-places";
import InfiniteLoading from "vue-infinite-loading";
import CKEditor from "ckeditor4-vue";
import pusher from "vue-pusher";

Vue.config.productionTip = false;
axiosService.init();
Vue.use(VueMeta);
Vue.use(VuetifyAlgoliaPlaces, {
    algolia: {
        appId: process.env.VUE_APP_ALGOLIA_ID,
        apiKey: process.env.VUE_APP_ALGOLIA_APP_API_KEY,
    },
});
Vue.use(InfiniteLoading);
Vue.use(CKEditor);
Vue.use(pusher, {
    api_key: process.env.VUE_APP_PUSHER_APP_KEY,
    options: {
        cluster: process.env.VUE_APP_PUSHER_CLUSTER,
    },
});

new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
