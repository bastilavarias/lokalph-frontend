import Vue from "vue";
import Vuex from "vuex";
import globalStoreModule from "@/store/modules/global-store-module";
import authenticationStoreModule from "@/store/modules/authentication-store-module";
import shopStoreModule from "@/store/modules/shop-store-module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        global: globalStoreModule,
        authentication: authenticationStoreModule,
        shop: shopStoreModule,
    },
});
