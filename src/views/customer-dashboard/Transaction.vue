<template>
    <v-card outlined>
        <v-card-title>Transactions</v-card-title>
        <template v-for="(transaction, index) in transactions">
            <customer-dashboard-view-transaction-list-item-component
                :offer-id="transaction.offer.id"
                :shop-id="transaction.shop.id"
                :shop-name="transaction.shop.name"
                :product-slug="transaction.product.slug"
                :product-name="transaction.product.name"
                :account-email="transaction.account.email"
                :transaction-status="transaction.status"
                :offer-quantity="transaction.offer.quantity"
                :offer-total-price="transaction.offer.total_price"
                :offer-shipping-method="transaction.offer.shipping_method"
                :transaction-created-at="transaction.created_at"
                :product-preview="transaction.product.images[0]"
                :transactions.sync="transactions"
                :transaction-date="transaction.date"
                :transaction-time="transaction.time"
                :transaction-address="transaction.address"
                :transaction-code="transaction.code"
            ></customer-dashboard-view-transaction-list-item-component>
            <v-divider v-if="transactions.length - 1 !== index"></v-divider>
        </template>
        <infinite-loading
            @infinite="getTransactions"
            :identifier="scrollOptions.id"
        >
            <template v-slot:spinner>
                <custom-loading-spinner-component></custom-loading-spinner-component>
            </template>
            <template v-slot:no-more>
                <span></span>
            </template>
            <template v-slot:no-results>
                <div class="text-center py-5">
                    <span class="font-italic">
                        {{
                            transactions.length === 0
                                ? "No transactions available."
                                : ""
                        }}
                    </span>
                </div>
            </template>
        </infinite-loading>
    </v-card>
</template>

<script>
import { GET_ACCOUNT_OFFERS } from "@/store/types/offer-store-type";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";
import commonUtility from "@/common/utility";
import GlobalOfferStatusChipComponent from "@/components/global/offer-status-chip-component";
import CustomerDashboardViewTransactionListItemComponent from "@/components/views/customer-dashboard/transaction-list-item-component";
import { GET_ACCOUNT_TRANSACTIONS } from "@/store/types/transaction-store-type";

export default {
    components: {
        CustomerDashboardViewTransactionListItemComponent,
        GlobalOfferStatusChipComponent,
        CustomRouterLinkComponent,
        CustomLoadingSpinnerComponent,
    },

    mixins: [commonUtility],

    data() {
        return {
            transactions: [],
            scrollOptions: {
                page: 1,
                perPage: 5,
                id: +new Date(),
            },
            isCancelOfferStart: false,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },

    methods: {
        async getTransactions($state) {
            const payload = {
                page: this.scrollOptions.page,
                perPage: this.scrollOptions.perPage,
            };
            const { data } = await this.$store.dispatch(
                GET_ACCOUNT_TRANSACTIONS,
                payload
            );
            const transactions = data.account_transactions;
            console.log(transactions);
            if (transactions.length === this.scrollOptions.perPage) {
                this.transactions = [...this.transactions, ...transactions];
                $state.loaded();
                this.scrollOptions.page += 1;
                return;
            }
            this.transactions = [...this.transactions, ...transactions];
            $state.complete();
        },
    },
};
</script>
