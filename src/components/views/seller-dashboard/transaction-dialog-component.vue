<template>
    <v-dialog width="600" persistent v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <div>
                    <span class="mr-2">Transaction</span>
                    <seller-dashboard-view-transaction-status-chip-component
                        :status="transactionStatus"
                    ></seller-dashboard-view-transaction-status-chip-component>
                </div>
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
                        <v-list-item two-line>
                            <v-list-item-avatar :size="50">
                                <v-img :src="accountImageUrl"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    accountFirstName
                                }}</v-list-item-title>
                                <v-list-item-subtitle>
                                    <span
                                        :title="`Transaction was created ${formatRelativeTime(
                                            offerCreatedAt
                                        )}`"
                                    >
                                        Received this transaction
                                        {{ formatRelativeTime(offerCreatedAt) }}
                                    </span>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn
                                    color="primary"
                                    depressed
                                    small
                                    class="text-capitalize"
                                    :to="{
                                        name: 'profile-view',
                                        params: {
                                            email: accountEmail,
                                        },
                                    }"
                                >
                                    View Profile
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import commonUtility from "@/common/utility";
import SellerDashboardViewTransactionStatusChipComponent from "@/components/views/seller-dashboard/transaction-status-chip-component";

export default {
    name: "seller-dashboard-view-transaction-dialog-component",
    components: {
        SellerDashboardViewTransactionStatusChipComponent,
    },

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

        productCategory: {
            type: Object,
            required: true,
        },

        productShippingMethods: {
            type: Array,
            required: true,
        },

        offerTotalPrice: {
            type: Number,
            required: true,
        },

        offerQuantity: {
            type: Number,
            required: true,
        },

        offerShippingMethod: {
            type: Object,
            required: true,
        },

        offerCreatedAt: {
            type: String,
            required: true,
        },

        accountFirstName: {
            type: String,
            required: false,
        },

        accountImageUrl: {
            type: String,
            required: false,
        },

        accountEmail: {
            type: String,
            required: false,
        },

        transactionStatus: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
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
