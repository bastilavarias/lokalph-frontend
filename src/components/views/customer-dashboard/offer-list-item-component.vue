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
            <v-list-item-subtitle>
                <span class="black--text">
                    Offered by:
                    <custom-router-link-component
                        :to="{
                            name: 'profile-view',
                            params: {
                                email: accountEmail,
                            },
                        }"
                    >
                        <span class="black--text text-decoration-underline"
                            >You</span
                        >
                    </custom-router-link-component>
                    ·
                    <span>{{ formatRelativeTime(offerCreatedAt) }}</span>
                </span>
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="isStatusPending">
            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                        <v-icon>mdi-dots-horizontal</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-subheader
                        >Offer Status:
                        <span class="ml-1 font-weight-bold text-capitalize">{{
                            offerStatus
                        }}</span></v-subheader
                    >
                    <v-divider></v-divider>
                    <v-subheader>Action</v-subheader>
                    <v-list-item
                        @click="cancelOffer"
                        :disabled="isCancelOfferStart"
                        >Cancel Offer</v-list-item
                    >
                </v-list>
            </v-menu>
        </v-list-item-action>
        <v-list-item-action v-if="!isStatusPending">
            <global-offer-status-chip-component
                :status="offerStatus"
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
    name: "customer-dashboard-view-offer-list-item-component",

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

        offerStatus: {
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

        offers: {
            type: Array,
            required: true,
        },

        offerCancelledBy: {
            required: true,
        },
    },

    data() {
        return {
            offerStatusLocal: this.offerStatus,
            isCancelOfferStart: false,
            offersLocal: this.offers,
            offerCancelledByLocal: this.offerCancelledBy
                ? Object.assign({}, this.offerCancelledBy)
                : null,
        };
    },

    watch: {
        offers(value) {
            this.offersLocal = value;
        },

        offersLocal(value) {
            this.$emit("update:offers", value);
        },

        offerStatus(value) {
            this.offerStatusLocal = value;
        },

        offerCancelledBy(value) {
            this.offerCancelledByLocal = value
                ? Object.assign({}, value)
                : null;
        },
    },

    computed: {
        isStatusPending() {
            return this.offerStatusLocal === "pending";
        },
    },

    methods: {
        async cancelOffer() {
            this.isCancelOfferStart = true;
            const payload = {
                offerId: this.offerId,
                cancelledBy: "customer",
            };
            const { data } = await this.$store.dispatch(CANCEL_OFFER, payload);
            if (data) {
                this.offersLocal = this.offersLocal.map((offer) => {
                    if (offer.id === data.id) {
                        this.offerStatusLocal = data.status;
                        this.offerCancelledByLocal = Object.assign(
                            {},
                            data.cancelled_by
                        );
                        offer.cancelled_by = Object.assign(
                            {},
                            data.cancelled_by
                        );
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
