<template>
    <v-dialog width="500" persistent v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <span>Write a Review</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "customer-dashboard-view-transaction-review-dialog-component",

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
        };
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
        },
    },
};
</script>
