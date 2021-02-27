import Vue from "vue";
import vueAxios from "vue-axios";
import axios from "axios";
import cookieService from "@/services/cookie-service";

const axiosService = {
    init() {
        Vue.use(vueAxios, axios);
        Vue.axios.defaults.baseURL =
            "https://lokalph-development.herokuapp.com/api";
    },

    setHeader() {
        const accessToken = cookieService.get("access_token");
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${accessToken}`;
    },

    async get(route, body) {
        return await Vue.axios.get(route, body);
    },

    async post(route, body) {
        return await Vue.axios.post(route, body);
    },

    async put(route, body) {
        return await Vue.axios.put(route, body);
    },

    async delete(route, body) {
        return await Vue.axios.delete(route, body);
    },
};

export default axiosService;
