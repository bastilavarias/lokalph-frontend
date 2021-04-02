<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :label="label"
                :outlined="outlined"
                :value="formattedDate"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="dateLocal"
            @input="menu = false"
        ></v-date-picker>
    </v-menu>
</template>

<script>
import commonUtility from "@/common/utility";

export default {
    name: "custom-date-picker-component",

    props: {
        date: {
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
            dateLocal: this.date,
        };
    },

    computed: {
        formattedDate() {
            if (!this.dateLocal) return "";
            return this.formatDate(this.dateLocal);
        },
    },

    watch: {
        date(value) {
            this.dateLocal = value;
        },

        dateLocal(value) {
            this.$emit("update:date", value);
        },
    },
};
</script>
