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
                                    v-model="form.productReview"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <custom-image-input-component
                                    label="Images"
                                    outlined
                                    operation="create"
                                    :images.sync="form.images"
                                ></custom-image-input-component>
                            </v-col>
                            <v-col cols="12">
                                <div class="d-flex justify-center align-center">
                                    <v-rating
                                        background-color="primary"
                                        color="primary"
                                        large
                                        v-model="form.productRating"
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
                            :disabled="!isProductReviewFormValid"
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
                                    v-model="form.shopReview"
                                ></v-textarea>
                            </v-col>
                            <v-col cols="12">
                                <div class="d-flex justify-center align-center">
                                    <v-rating
                                        background-color="primary"
                                        color="primary"
                                        large
                                        v-model="form.shopRating"
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
                        <v-btn
                            color="primary"
                            class="text-capitalize"
                            depressed
                            :disabled="!isShopReviewFormValid"
                            :loading="isCreateReviewStart"
                            @click="createReview"
                            >Post</v-btn
                        >
                    </v-card-actions>
                </v-stepper-content>
            </v-stepper>
        </v-card>
    </v-dialog>
</template>

<script>
import CustomImageInputComponent from "@/components/custom/image-input-component";
import { CREATE_REVIEW } from "@/store/types/review-store-type";

const defaultForm = {
    images: [],
    productRating: null,
    productReview: null,
    shopRating: null,
    shopReview: null,
};

export default {
    name: "customer-dashboard-view-transaction-review-dialog-component",
    components: { CustomImageInputComponent },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },

        transactionId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
            step: 1,
            form: Object.assign({}, defaultForm),
            defaultForm,
            isCreateReviewStart: false,
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

        isProductReviewFormValid() {
            const { productRating } = this.form;
            return productRating;
        },

        isShopReviewFormValid() {
            const { shopRating } = this.form;
            return shopRating;
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

    methods: {
        async createReview() {
            this.isCreateReviewStart = true;
            const payload = {
                images: this.form.images || [],
                productRating: this.form.productRating || 1,
                productReview: this.form.productReview || null,
                shopRating: this.form.shopRating || 1,
                shopReview: this.form.shopReview || null,
                transactionId: this.transactionId,
            };
            const { data } = await this.$store.dispatch(CREATE_REVIEW, payload);
            if (data) {
                console.log(data);
                this.isOpenLocal = false;
                this.form = Object.assign({}, this.defaultForm);
                return;
            }
            this.isOpenLocal = false;
        },
    },
};
</script>
