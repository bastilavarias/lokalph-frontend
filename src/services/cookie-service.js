import VueCookie from "vue-cookie";

const cookieService = {
    save(name, value) {
        VueCookie.set(name, value);
    },

    get(name) {
        return VueCookie.get(name);
    },

    remove(name) {
        VueCookie.delete(name);
    },
};

export default cookieService;
