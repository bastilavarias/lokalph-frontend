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
                        :title="`This offer accepted by ${shopName} at ${formatDateTime(
                            transactionCreatedAt
                        )}`"
                    >
                        Accepted by {{ shopName }}
                        {{ formatRelativeTime(transactionCreatedAt) }}
                    </span>
                </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
                <global-transaction-status-chip-component
                    :status="transactionStatusLocal"
                    :cancelled-by="transactionCancelledByLocal"
                    :is-shop="false"
                ></global-transaction-status-chip-component>
            </v-list-item-action>
        </v-list-item>
        <v-card-text>
            <v-card flat rounded>
                <div class="grey lighten-5 mb-3">
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
                                            <v-icon class="mr-1"
                                                >mdi-truck</v-icon
                                            >
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
                                                {{
                                                    formatDate(transactionDate)
                                                }}
                                            </span>
                                        </div>
                                    </v-col>
                                    <v-col cols="12">
                                        <div
                                            class="d-flex align-content-center align-center"
                                        >
                                            <v-icon class="mr-1"
                                                >mdi-clock</v-icon
                                            >
                                            <span
                                                class="subtitle-1 black--text"
                                                :title="`${offerShippingMethod.label} Time`"
                                            >
                                                {{
                                                    formatTime(transactionTime)
                                                }}
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
                </div>
                <v-list-item>
                    <v-list-item-avatar :size="50">
                        <v-img :src="shopImageUrl"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>{{ shopName }}</v-list-item-title>
                        <v-list-item-subtitle
                            >Created
                            {{
                                formatRelativeTime(shopCreatedAt)
                            }}</v-list-item-subtitle
                        >
                    </v-list-item-content>
                    <v-list-item-action>
                        <v-btn
                            color="secondary"
                            depressed
                            small
                            class="text-capitalize"
                            >Visit Shop</v-btn
                        >
                    </v-list-item-action>
                </v-list-item>
            </v-card>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="error"
                depressed
                @click="cancelTransaction"
                :loading="isCancelTransactionStart"
                v-if="isStatusPending"
            >
                <v-icon class="mr-1">mdi-cancel</v-icon>
                <span class="text-capitalize">Cancel</span>
            </v-btn>
            <v-btn
                color="success"
                depressed
                class="text-capitalize"
                @click="isCodeVerificationDialogOpen = true"
                v-if="isStatusPending"
            >
                Mark <span class="text-lowercase mx-1">as</span> Received
            </v-btn>
            <v-btn
                depressed
                v-if="isStatusReceived && !transactionIsReviewedLocal"
                class="text-capitalize"
                color="primary"
                block
                @click="isReviewDialogOpen = true"
            >
                Write<span class="text-lowercase mx-1">a</span> Review
            </v-btn>
            <span
                class="subtitle-2 font-italic"
                v-if="isStatusReceived && transactionIsReviewedLocal"
                >You already reviewed.</span
            >
        </v-card-actions>
        <customer-dashboard-view-transaction-code-verification-dialog-component
            :is-open.sync="isCodeVerificationDialogOpen"
            :shop-id="shopId"
            :shop-name="shopName"
            :product-slug="productSlug"
            :product-name="productName"
            :account-email="accountEmail"
            :transaction-status="transactionStatusLocal"
            :offer-quantity="offerQuantity"
            :offer-total-price="offerTotalPrice"
            :product-preview="productPreview"
            :transaction-created-at="transactionCreatedAt"
            :transaction-id="transactionId"
            :transactions.sync="transactionsLocal"
            :transaction-cancelled-by="transactionCancelledByLocal"
        ></customer-dashboard-view-transaction-code-verification-dialog-component>
        <customer-dashboard-view-transaction-review-dialog-component
            :is-open.sync="isReviewDialogOpen"
            :transaction-id="transactionId"
            :transaction-is-reviewed.sync="transactionIsReviewedLocal"
        ></customer-dashboard-view-transaction-review-dialog-component>
    </v-card>
</template>

<script>
import CustomRouterLinkComponent from "@/components/custom/router-link-component";
import commonUtility from "@/common/utility";
import GlobalTransactionStatusChipComponent from "@/components/global/transaction-status-chip-component";
import { CANCEL_TRANSACTION } from "@/store/types/transaction-store-type";
import CustomerDashboardViewTransactionCodeVerificationDialogComponent from "@/components/views/customer-dashboard/transaction-code-verification-dialog-component";
import CustomerDashboardViewTransactionReviewDialogComponent from "@/components/views/customer-dashboard/transaction-review-dialog-component";
export default {
    name: "customer-dashboard-view-transaction-list-item-component",

    components: {
        CustomerDashboardViewTransactionReviewDialogComponent,
        CustomerDashboardViewTransactionCodeVerificationDialogComponent,
        GlobalTransactionStatusChipComponent,
        CustomRouterLinkComponent,
    },

    mixins: [commonUtility],

    props: {
        transactionId: {
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

        transactionCancelledBy: {
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

        shopImageUrl: {
            type: String,
            required: true,
        },

        shopSlug: {
            type: String,
            required: true,
        },

        shopCreatedAt: {
            type: String,
            required: true,
        },

        transactionIsReviewed: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            transactionStatusLocal: this.transactionStatus,
            transactionCancelledByLocal: this.transactionCancelledBy,
            isCancelTransactionStart: false,
            transactionsLocal: this.transactions,
            isCodeVerificationDialogOpen: false,
            isReviewDialogOpen: false,
            transactionIsReviewedLocal: this.transactionIsReviewed,
        };
    },

    computed: {
        isStatusPending() {
            return this.transactionStatusLocal === "pending";
        },

        isStatusReceived() {
            return this.transactionStatusLocal === "received";
        },
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

        transactionCancelledBy(value) {
            this.transactionCancelledByLocal = value;
        },

        transactionIsReviewed(value) {
            this.transactionIsReviewedLocal = value;
        },

        transactionIsReviewedLocal(value) {
            this.$emit("update:transactionIsReviewed", value);
        },
    },

    methods: {
        async cancelTransaction() {
            this.isCancelTransactionStart = true;
            const payload = {
                transactionId: this.transactionId,
                cancelledBy: "customer",
            };
            const { data } = await this.$store.dispatch(
                CANCEL_TRANSACTION,
                payload
            );
            if (data) {
                this.transactionsLocal = this.transactionsLocal.map(
                    (transaction) => {
                        if (transaction.id === data.id) {
                            this.transactionStatusLocal = data.status;
                            transaction.status = data.status;
                            this.transactionCancelledByLocal =
                                data.cancelled_by;
                            transaction.cancelled_by = data.cancelled_by;
                        }
                        return transaction;
                    }
                );
                this.isCancelTransactionStart = false;

                return;
            }
            this.isCancelTransactionStart = false;
        },
    },
};
</script>
