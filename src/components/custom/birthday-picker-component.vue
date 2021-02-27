<template>
    <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                :label="label"
                append-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
                :outlined="outlined"
                :value="formattedBirthDate"
            ></v-text-field>
        </template>
        <v-date-picker
            ref="picker"
            v-model="dateLocal"
            :max="new Date().toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
        ></v-date-picker>
    </v-menu>
</template>

<script>
import commonUtility from "@/common/utility";

export default {
    name: "custom-birthday-picker-component",

    mixins: [commonUtility],

    props: {
        outlined: {
            type: Boolean,
            required: false,
        },

        label: {
            type: String,
            required: false,
        },

        birthDate: {
            required: true,
        },
    },

    data() {
        return {
            dateLocal: this.birthDate,
            menu: false,
        };
    },

    computed: {
        formattedBirthDate() {
            return this.dateLocal ? this.formatBirthDate(this.dateLocal) : "";
        },
    },

    watch: {
        menu(val) {
            val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
        },

        birthDate(value) {
            this.dateLocal = value;
        },

        dateLocal(value) {
            this.$emit("update:birthDate", value);
        },
    },

    methods: {
        save(date) {
            this.$refs.menu.save(date);
        },
    },
};
</script>
