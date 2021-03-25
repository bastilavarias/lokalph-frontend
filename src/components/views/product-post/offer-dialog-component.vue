<template>
    <v-dialog width="500" persistent v-model="isOpenLocal">
        <v-card-title>
            <span>Send an Offer</span>
            <v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-spacer>
        </v-card-title>
    </v-dialog>
</template>

<script>
export default {
    name: "product-post-view-offer-dialog-component",

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
