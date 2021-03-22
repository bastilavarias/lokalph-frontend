import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#FF2636",
                secondary: "#0038A7",
                accent: "#2C2C2D",
            },
        },
    },
});
