<template>
    <v-dialog width="500" v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <span> Verify Transaction Code </span>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-col cols="12">
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
                                    <span
                                        class="black--text font-weight-bold"
                                        >{{ productName }}</span
                                    >
                                </custom-router-link-component>
                            </v-list-item-title>
                            <v-list-item-subtitle>
                                <span
                                    class="font-weight-bold secondary--text"
                                    >{{
                                        formatMoney("PHP", offerTotalPrice)
                                    }}</span
                                >
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
                                    {{
                                        formatRelativeTime(transactionCreatedAt)
                                    }}
                                </span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-action>
                            <global-transaction-status-chip-component
                                :status="transactionStatus"
                                :cancelled-by="transactionCancelledBy"
                                :is-shop="false"
                            ></global-transaction-status-chip-component>
                        </v-list-item-action>
                    </v-list-item>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Transaction Code"
                        persistent-hint
                        hint="Ask the shop for the transaction code"
                        outlined
                    ></v-text-field>
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" class="text-capitalize" depressed block
                    >Verify</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
import CustomRouterLinkComponent from "@/components/custom/router-link-component";
import commonUtility from "@/common/utility";
import GlobalTransactionStatusChipComponent from "@/components/global/transaction-status-chip-component";
export default {
    name:
        "customer-dashboard-view-transaction-code-verification-dialog-component",

    mixins: [commonUtility],

    components: {
        GlobalTransactionStatusChipComponent,
        CustomRouterLinkComponent,
    },

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },

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
