<template>
    <v-dialog width="500" persistent v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <span>Offer</span>
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
    name: "seller-dashboard-view-offer-dialog-component",

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            isOpenLocal: false,
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
