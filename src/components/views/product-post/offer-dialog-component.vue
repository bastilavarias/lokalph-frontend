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
                                :src="preview.url"
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
                                <span :title="name">
                                    {{ name }}
                                </span>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <span
                                    :title="`Product Category: ${category.label}`"
                                    >{{ category.label }}</span
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
                                            createdAt
                                        )}`"
                                    >
                                        {{ formatRelativeTime(createdAt) }}
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
                                        :title="`This item is tagged as ${condition.label}`"
                                        >{{ condition.label }}</span
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
                                        {{ stock }} stock available
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
                                        {{ formatMoney("PHP", price) }}
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
                            label="Total Offer Price"
                            :value="formatMoney('PHP', totalPrice)"
                            outlined
                            readonly
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <custom-stock-input-component
                            :stock.sync="form.quantity"
                            label="Quantity *"
                            limit
                            :limit-value="stock"
                        ></custom-stock-input-component>
                    </v-col>
                    <v-col cols="12">
                        <v-select
                            outlined
                            label="Preferred Shipping Method *"
                            :items="shippingMethods"
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
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
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
                    </v-col>
                </v-row>
            </v-card-text>
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

        preview: {
            type: Object,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        createdAt: {
            type: String,
            required: true,
        },

        condition: {
            type: Object,
            required: true,
        },

        stock: {
            type: Number,
            required: true,
        },

        price: {
            required: true,
        },

        shippingMethods: {
            type: Array,
            required: true,
        },

        category: {
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
        totalPrice() {
            return parseFloat(this.price) * this.form.quantity;
        },

        isFormValid() {
            const { shippingMethodId, quantity } = this.form;
            return shippingMethodId && quantity && quantity > 0;
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
        async createOffer() {
            this.isCreateOfferStart = true;
            const payload = {
                shopId: this.shopId,
                productId: this.productId,
                quantity: this.form.quantity,
                totalPrice: this.totalPrice,
                note: this.form.note,
                shippingMethodId: this.form.shippingMethodId,
            };
            const { data } = await this.$store.dispatch(CREATE_OFFER, payload);
            if (data) {
                this.isCreateOfferStart = false;
                this.isOpenLocal = false;
                this.form = Object.assign({}, this.defaultForm);
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
};
</script>
