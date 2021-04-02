<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="timeLocal"
        transition="scale-transition"
        offset-y
        max-width="290px"
        min-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                append-icon="mdi-clock"
                readonly
                v-bind="attrs"
                v-on="on"
                :label="label"
                :outlined="outlined"
                :value="formattedDate"
            ></v-text-field>
        </template>
        <v-time-picker
            v-if="menu"
            v-model="timeLocal"
            full-width
            @click:minute="$refs.menu.save(time)"
        ></v-time-picker>
    </v-menu>
</template>

<script>
import commonUtility from "@/common/utility";

export default {
    name: "custom-time-picker-component",

    props: {
        time: {
            required: true,
        },

        outlined: {
            type: Boolean,
            required: false,
        },

        label: {
            type: String,
            required: false,
        },
    },

    mixins: [commonUtility],

    data() {
        return {
            menu: false,
            timeLocal: this.time,
        };
    },

    computed: {
        formattedDate() {
            if (!this.timeLocal) return "";
            return this.formatTime(this.timeLocal);
        },
    },

    watch: {
        time(value) {
            this.timeLocal = value;
        },

        timeLocal(value) {
            this.$emit("update:time", value);
        },
    },
};
</script>
