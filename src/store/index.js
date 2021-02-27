import Vue from "vue";
import Vuex from "vuex";
import globalStoreModule from "@/store/modules/global-store-module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        global: globalStoreModule,
    },
});
