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
                <v-stepper-header class="elevation-0">
                    <template v-for="(stepper, index) in steppers">
                        <v-stepper-step
                            :key="index"
                            :step="stepper.step"
                            color="primary"
                        >
                            <span class="text-capitalize">{{
                                stepper.text
                            }}</span>
                        </v-stepper-step>
                        <v-divider v-if="stepper.step === 1"></v-divider>
                    </template>
                </v-stepper-header>
                <v-stepper-content :step="1">
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12">
                                <v-textarea
                                    outlined
                                    label="Review"
                                    :counter="800"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <div class="d-flex justify-center align-center">
                                    <v-rating
                                        background-color="primary"
                                        color="primary"
                                        large
                                    ></v-rating>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            class="text-capitalize"
                            depressed
                            @click="step = 2"
                            >Continue</v-btn
                        >
                    </v-card-actions>
                </v-stepper-content>
                <v-stepper-content :step="2">
                    <v-card-text>
                        <v-row dense>
                            <v-col cols="12">
                                <v-textarea
                                    outlined
                                    label="Review"
                                    :counter="800"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <div class="d-flex justify-center align-center">
                                    <v-rating
                                        background-color="primary"
                                        color="primary"
                                        large
                                    ></v-rating>
                                </div>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text class="text-capitalize" @click="step = 1"
                            >Back</v-btn
                        >
                        <v-btn color="primary" class="text-capitalize" depressed
                            >Post</v-btn
                        >
                    </v-card-actions>
                </v-stepper-content>
            </v-stepper>
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
