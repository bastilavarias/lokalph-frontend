<template>
    <v-card flat>
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
                    <span
                        :title="`This offer accepted by ${shopName} ${formatRelativeTime(
                            transactionCreatedAt
                        )}`"
                    >
                        Accepted by {{ shopName }}
                        {{ formatRelativeTime(transactionCreatedAt) }}
                    </span>
                    ·
                    <span
                        @click="isExpanded = !isExpanded"
                        :style="{ cursor: 'pointer' }"
                    >
                        {{ isExpanded ? "Hide Details" : "Expand Details" }}
                        <v-icon small>
                            {{
                                isExpanded
                                    ? "mdi-chevron-up"
                                    : "mdi-chevron-down"
                            }}
                        </v-icon>
                    </span>
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <global-transaction-status-chip-component
                    :status="transactionStatus"
                    :is-shop="false"
                ></global-transaction-status-chip-component>
            </v-list-item-action>
        </v-list-item>
        <v-card-text v-if="isExpanded">
            <v-card outlined rounded class="grey lighten-5">
                <v-row dense>
                    <v-col cols="12" md="6">
                        <v-card-subtitle class="font-weight-bold"
                            >Offer Details</v-card-subtitle
                        >
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <div
                                        class="d-flex align-content-center align-center"
                                    >
                                        <span
                                            class="subtitle-1 font-weight-bold secondary--text"
                                            title="Offer Price"
                                        >
                                            {{
                                                formatMoney(
                                                    "PHP",
                                                    offerTotalPrice
                                                )
                                            }}
                                        </span>
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
                                            title="Quantity"
                                        >
                                            <span
                                                class="font-weight-bold black--text"
                                            >
                                                {{ offerQuantity }}
                                            </span>
                                            pcs
                                        </span>
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <div
                                        class="d-flex align-content-center align-center"
                                    >
                                        <v-icon class="mr-1">mdi-truck</v-icon>
                                        <span
                                            class="subtitle-1 black--text"
                                            title="Prefer Shipping Method"
                                        >
                                            {{ offerShippingMethod.label }}
                                        </span>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card-subtitle class="font-weight-bold"
                            >{{
                                offerShippingMethod.label
                            }}
                            Details</v-card-subtitle
                        >
                        <v-card-text>
                            <v-row dense>
                                <v-col cols="12">
                                    <div
                                        class="d-flex align-content-center align-center"
                                    >
                                        <v-icon class="mr-1"
                                            >mdi-calendar</v-icon
                                        >
                                        <span
                                            class="subtitle-1 black--text"
                                            :title="`${offerShippingMethod.label} Date`"
                                        >
                                            {{ formatDate(transactionDate) }}
                                        </span>
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <div
                                        class="d-flex align-content-center align-center"
                                    >
                                        <v-icon class="mr-1">mdi-clock</v-icon>
                                        <span
                                            class="subtitle-1 black--text"
                                            :title="`${offerShippingMethod.label} Time`"
                                        >
                                            {{ formatTime(transactionTime) }}
                                        </span>
                                    </div>
                                </v-col>
                                <v-col cols="12">
                                    <div
                                        class="d-flex align-content-center align-center"
                                    >
                                        <v-icon class="mr-1"
                                            >mdi-map-marker</v-icon
                                        >
                                        <span
                                            class="subtitle-1 black--text"
                                            :title="`${offerShippingMethod.label} Address`"
                                        >
                                            {{ transactionAddress.value }}
                                        </span>
                                    </div>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-card>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" depressed>
                <v-icon class="mr-1">mdi-cancel</v-icon>
                <span class="text-capitalize">Cancel</span>
            </v-btn>
            <v-btn color="success" depressed class="text-capitalize">
                Mark <span class="text-lowercase mx-1">as</span> Received
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import CustomRouterLinkComponent from "@/components/custom/router-link-component";
import commonUtility from "@/common/utility";
import { CANCEL_OFFER } from "@/store/types/offer-store-type";
import GlobalTransactionStatusChipComponent from "@/components/global/transaction-status-chip-component";
export default {
    name: "customer-dashboard-view-transaction-list-item-component",

    components: {
        GlobalTransactionStatusChipComponent,
        CustomRouterLinkComponent,
    },

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

        shopName: {
            type: String,
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

        offerShippingMethod: {
            type: Object,
            required: true,
        },

        transactionCreatedAt: {
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

        transactionDate: {
            type: String,
            required: true,
        },

        transactionTime: {
            type: String,
            required: true,
        },

        transactionAddress: {
            type: Object,
            required: true,
        },

        transactionCode: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            transactionStatusLocal: this.transactionStatus,
            isCancelOfferStart: false,
            transactionsLocal: this.transactions,
            isExpanded: true,
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
