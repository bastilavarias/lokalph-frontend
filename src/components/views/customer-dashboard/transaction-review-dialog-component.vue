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
            <v-stepper class="elevation-0" v-model="step">
                <v-stepper-header>
                    <template v-for="(stepper, index) in steppers">
                        <v-stepper-step :key="index" :step="stepper.step">
                            <span class="text-capitalize">{{
                                stepper.text
                            }}</span>
                        </v-stepper-step>
                        <v-divider v-if="stepper.step === 1"></v-divider>
                    </template>
                </v-stepper-header>
            </v-stepper>
            <v-card-actions>
                <v-btn color="primary" block class="text-capitalize" depressed>
                    Post
                </v-btn>
            </v-card-actions>
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
            step: 1,
        };
    },

    computed: {
        steppers() {
            return [
                {
                    text: "Product Review",
                    step: 1,
                },
                {
                    text: "Shop Review",
                    step: 2,
                },
            ];
        },
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
