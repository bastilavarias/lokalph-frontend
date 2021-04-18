<template>
    <v-dialog width="500" persistent v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <span>Send an Offer</span>
                <v-spacer> </v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-card-text class="pl-0">
                            <v-img
                                :src="productPreview.url"
                                width="100%"
                                height="auto"
                                position="center"
                            ></v-img>
                        </v-card-text>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-list-item-content>
                            <v-list-item-title
                                class="headline font-weight-bold accent--text"
                            >
                                <span :title="productName">
                                    {{ productName }}
                                </span>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <span
                                    :title="`Product Category: ${productCategory.label}`"
                                    >{{ productCategory.label }}</span
                                >
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-row dense>
                            <v-col cols="12">
                                <div
                                    class="d-flex align-content-center align-center"
                                >
                                    <v-icon class="mr-1">mdi-clock</v-icon>
                                    <span
                                        class="subtitle-1"
                                        :title="`Posted: ${formatRelativeTime(
                                            productCreatedAt
                                        )}`"
                                    >
                                        {{
                                            formatRelativeTime(productCreatedAt)
                                        }}
                                    </span>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div
                                    class="d-flex align-content-center align-center"
                                >
                                    <v-icon class="mr-1"
                                        >mdi-checkbox-blank</v-icon
                                    >
                                    <span
                                        class="subtitle-1"
                                        :title="`This item is tagged as ${productCondition.label}`"
                                        >{{ productCondition.label }}</span
                                    >
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div
                                    class="d-flex align-content-center align-center"
                                >
                                    <v-icon class="mr-1"
                                        >mdi-file-table-box-multiple</v-icon
                                    >
                                    <span
                                        class="subtitle-1"
                                        title="Total Stock"
                                    >
                                        {{ productStock }} stock available
                                    </span>
                                </div>
                            </v-col>
                            <v-col cols="12">
                                <div
                                    class="d-flex align-content-center align-center"
                                >
                                    <span
                                        class="subtitle-1 mr-1 font-weight-bold secondary--text"
                                        title="Price per unit"
                                    >
                                        {{ formatMoney("PHP", productPrice) }}
                                    </span>
                                    per unit
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field
                            :label="`Offer Total Price (${formatMoney(
                                'PHP',
                                form.totalPrice
                            )})`"
                            outlined
                            v-model="form.totalPrice"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <custom-stock-input-component
                            :stock.sync="form.quantity"
                            label="Quantity *"
                            limit
                            :limit-value="productStock"
                        ></custom-stock-input-component>
                    </v-col>
                    <v-col cols="12">
                        <v-select
                            outlined
                            label="Preferred Shipping Method *"
                            :items="productShippingMethods"
                            item-value="id"
                            item-text="label"
                            v-model="form.shippingMethodId"
                        ></v-select>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            outlined
                            label="Note"
                            v-model="form.note"
                            :counter="200"
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn
                    color="primary"
                    block
                    depressed
                    class="text-capitalize"
                    @click="createOffer"
                    :disabled="!isFormValid"
                    :loading="isCreateOfferStart"
                    >Send
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import commonUtility from "@/common/utility";
import CustomStockInputComponent from "@/components/custom/stock-input-component";
import { GLOBAL_SET_SNACKBAR_CONFIGS } from "@/store/types/global-store-type";
import { CREATE_OFFER } from "@/store/types/offer-store-type";

const defaultForm = {
    quantity: 1,
    shippingMethodId: null,
    note: null,
    totalPrice: 0,
};

export default {
    name: "product-post-view-offer-dialog-component",
    components: { CustomStockInputComponent },
    mixins: [commonUtility],

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },

        productPreview: {
            type: Object,
            required: true,
        },

        productName: {
            type: String,
            required: true,
        },

        productCreatedAt: {
            type: String,
            required: true,
        },

        productCondition: {
            type: Object,
            required: true,
        },

        productStock: {
            type: Number,
            required: true,
        },

        productPrice: {
            required: true,
        },

        productShippingMethods: {
            type: Array,
            required: true,
        },

        productCategory: {
            type: Object,
            required: true,
        },

        shopId: {
            type: Number,
            required: true,
        },

        productId: {
            type: Number,
            required: true,
        },
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
            isCreateOfferStart: false,
            form: Object.assign({}, defaultForm),
            defaultForm,
        };
    },

    computed: {
        isFormValid() {
            const { shippingMethodId, quantity, note } = this.form;
            const hasNote =
                shippingMethodId &&
                quantity &&
                quantity > 0 &&
                note &&
                note.length >= 3 &&
                note.length <= 200;
            const noNote = shippingMethodId && quantity && quantity > 0;
            return note ? hasNote : noNote;
        },
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
        },

        "form.quantity"(value) {
            if (value && value > 0) {
                this.form.totalPrice = this.productPrice * value;
            }
        },
    },

    methods: {
        async createOffer() {
            this.isCreateOfferStart = true;
            const payload = {
                shopId: this.shopId,
                productId: this.productId,
                quantity: this.form.quantity,
                totalPrice: this.form.totalPrice,
                note: this.form.note,
                shippingMethodId: this.form.shippingMethodId,
            };
            const { data } = await this.$store.dispatch(CREATE_OFFER, payload);
            if (data) {
                this.isCreateOfferStart = false;
                this.isOpenLocal = false;
                this.form = Object.assign(
                    {},
                    {
                        quantity: 1,
                        shippingMethodId: null,
                        note: null,
                        totalPrice: this.price * 1,
                    }
                );
                this.$store.commit(GLOBAL_SET_SNACKBAR_CONFIGS, {
                    isOpen: true,
                    text: "Your offer sent!",
                    color: "success",
                });
                return;
            }
            this.isCreateOfferStart = false;
        },
    },

    created() {
        this.form.totalPrice = this.productPrice * this.form.quantity;
    },
};
</script>
