<template>
    <v-list-item three-line>
        <v-list-item-avatar tile :size="50">
            <v-img :src="productPreview.url"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title class="d-flex align-center">
                <custom-router-link-component
                    :to="{
                        name: 'product-post-view',
                        params: {
                            shopId: shopId,
                            slug: productSlug,
                        },
                    }"
                >
                    <span class="black--text font-weight-bold">{{
                        productName
                    }}</span>
                </custom-router-link-component>
            </v-list-item-title>
            <v-list-item-subtitle>
                <span class="font-weight-bold secondary--text">{{
                    formatMoney("PHP", offerTotalPrice)
                }}</span>
                ·
                <span> {{ offerQuantity }} pcs </span>
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <global-offer-status-chip-component
                :status="transactionStatus"
            ></global-offer-status-chip-component>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
import CustomRouterLinkComponent from "@/components/custom/router-link-component";
import GlobalOfferStatusChipComponent from "@/components/global/offer-status-chip-component";
import commonUtility from "@/common/utility";
import { CANCEL_OFFER } from "@/store/types/offer-store-type";
export default {
    name: "customer-dashboard-view-transaction-list-item-component",

    components: { GlobalOfferStatusChipComponent, CustomRouterLinkComponent },

    mixins: [commonUtility],

    props: {
        offerId: {
            type: Number,
            required: true,
        },

        shopId: {
            type: Number,
            required: true,
        },

        productSlug: {
            type: String,
            required: true,
        },

        productName: {
            type: String,
            required: true,
        },

        accountEmail: {
            type: String,
            required: true,
        },

        transactionStatus: {
            type: String,
            required: true,
        },

        offerQuantity: {
            type: Number,
            required: true,
        },

        offerTotalPrice: {
            type: Number,
            required: true,
        },

        offerCreatedAt: {
            type: String,
            required: true,
        },

        productPreview: {
            type: Object,
            required: true,
        },

        transactions: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            transactionStatusLocal: this.transactionStatus,
            isCancelOfferStart: false,
            transactionsLocal: this.transactions,
        };
    },

    watch: {
        transactions(value) {
            this.transactionsLocal = value;
        },

        transactionsLocal(value) {
            this.$emit("update:transactions", value);
        },

        transactionStatus(value) {
            this.transactionStatusLocal = value;
        },

        offerCancelledBy(value) {
            this.offerCancelledByLocal = value
                ? Object.assign({}, value)
                : null;
        },
    },

    methods: {
        async cancelTransaction() {
            this.isCancelOfferStart = true;
            const { data } = await this.$store.dispatch(
                CANCEL_OFFER,
                this.offerId
            );
            if (data) {
                this.transactionsLocal = this.transactionsLocal.map((offer) => {
                    if (offer.id === data.id) {
                        this.transactionStatusLocal = data.status;
                        offer.status = data.status;
                    }
                    return offer;
                });
                this.isCancelOfferStart = false;

                return;
            }
            this.isCancelOfferStart = false;
        },
    },
};
</script>
