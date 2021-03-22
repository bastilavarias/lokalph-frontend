import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#0038A7",
                secondary: "#CE1127",
                accent: "#2C2C2D",
            },
        },
    },
});
