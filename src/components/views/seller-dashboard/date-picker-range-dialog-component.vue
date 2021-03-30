<template>
    <v-dialog v-model="isOpenLocal" persistent width="290px">
        <v-date-picker
            v-model="customDatesLocal"
            range
            :max="max"
            :reactive="false"
        >
            <v-spacer></v-spacer>
            <v-btn text @click="cancel" class="text-capitalize"> Cancel </v-btn>
            <v-btn
                color="primary"
                depressed
                @click="proceed"
                class="text-capitalize"
                :disabled="!isFormValid"
            >
                View Offers
            </v-btn>
        </v-date-picker>
    </v-dialog>
</template>

<script>
export default {
    name: "seller-dashboard-view-date-range-picker-dialog-component",

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },

        customDates: {
            type: Array,
            required: true,
        },

        cancel: {
            type: Function,
            required: false,
        },

        proceed: {
            type: Function,
            required: false,
        },

        max: {
            type: String,
            required: false,
        },
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
            customDatesLocal: this.customDates,
        };
    },

    computed: {
        isFormValid() {
            return this.customDatesLocal.length === 2;
        },
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
        },

        customDates(value) {
            this.customDatesLocal = value;
        },

        customDatesLocal(value) {
            this.$emit("update:customDates", value);
        },
    },
};
</script>
