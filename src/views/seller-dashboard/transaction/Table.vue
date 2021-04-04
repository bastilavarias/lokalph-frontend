<template>
    <v-card outlined>
        <v-card-title>
            <div class="d-flex align-center">
                <span class="mr-1">Transactions</span>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            text
                            v-bind="attrs"
                            v-on="on"
                            :loading="!selectedShopId || isGetShopsStart"
                            small
                        >
                            <span
                                class="mr-1 font-weight-bold"
                                v-if="selectedShop"
                                >{{ selectedShop.name }}</span
                            >
                            <v-badge
                                color="primary"
                                dot
                                v-if="!selectedShop"
                                class="mr-2 text-capitalize font-italic"
                            >
                                Select Shop
                            </v-badge>
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <template v-for="(shop, index) in shops">
                            <v-list-item
                                :key="index"
                                @click="setRouteQueries(shop.id)"
                                :disabled="selectedShopId === shop.id"
                                >{{ shop.name }}</v-list-item
                            >
                        </template>
                    </v-list>
                </v-menu>
            </div>
            <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table
            :headers="tableHeaders"
            :loading="isGetTransactionsStart"
            :items="transactions"
            :server-items-length="pagination.totalCount"
            :items-per-page.sync="pagination.perPage"
            :page.sync="pagination.page"
            :footer-props="{
                'items-per-page-options': pagination.rowsPerPageItems,
            }"
        >
            <template v-slot:item.product="{ item }">
                <custom-router-link-component
                    :to="{
                        name: 'product-post-view',
                        params: {
                            shopId: item.offer.shop.id,
                            slug: item.offer.product.slug,
                        },
                    }"
                >
                    <span class="black--text font-weight-bold">{{
                        item.offer.product.name
                    }}</span>
                </custom-router-link-component>
            </template>
            <template v-slot:item.price="{ item }">
                {{ formatMoney("PHP", item.offer.total_price) }}
            </template>
            <template v-slot:item.details="{ item }">
                {{ item.offer.shipping_method.label }} ·
                {{ formatDate(item.date) }} {{ formatTime(item.time) }}
            </template>
            <template v-slot:item.status="{ item }">
                <seller-dashboard-view-transaction-status-chip-component
                    :status="item.status"
                ></seller-dashboard-view-transaction-status-chip-component>
            </template>
            <template v-slot:item.action="{ item }">
                <v-btn icon>
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
import commonUtility from "@/common/utility";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";
import { GET_SHOP_TRANSACTIONS } from "@/store/types/transaction-store-type";
import SellerDashboardViewTransactionStatusChipComponent from "@/components/views/seller-dashboard/transaction-status-chip-component";

export default {
    components: {
        SellerDashboardViewTransactionStatusChipComponent,
        CustomRouterLinkComponent,
    },

    mixins: [commonUtility],

    data() {
        return {
            shops: [],
            isGetShopsStart: false,
            isGetTransactionsStart: false,
            transactions: [],
            pagination: {
                page: 1,
                perPage: 10,
                totalCount: null,
                rowsPerPageItems: [10, 25, 50],
            },
        };
    },

    computed: {
        tableHeaders() {
            return [
                {
                    text: "Product",
                    sortable: false,
                    value: "product",
                },
                {
                    text: "Total Price",
                    sortable: false,
                    value: "price",
                },
                {
                    text: "Details",
                    sortable: false,
                    value: "details",
                },
                {
                    text: "Status",
                    sortable: false,
                    value: "status",
                },
                {
                    text: "Action",
                    value: "action",
                    sortable: false,
                    align: "right",
                },
            ];
        },

        user() {
            return this.$store.state.authentication.user;
        },

        selectedShopId() {
            const shopId = this.$route.query.shop_id;
            return parseInt(shopId) || null;
        },

        selectedShop() {
            if (!this.selectedShopId) return null;
            return this.shops.find((shop) => shop.id === this.selectedShopId);
        },
    },

    watch: {
        async "pagination.page"() {
            await this.getTransactions();
        },

        async "pagination.perPage"() {
            await this.getTransactions();
        },

        async selectedShopId(value) {
            if (value) await this.getTransactions();
        },
    },

    methods: {
        async getShops() {
            const payload = {
                accountId: this.user.id,
                perPage: 999,
            };
            this.isGetShopsStart = true;
            const { data } = await this.$store.dispatch(
                GET_ACCOUNT_SHOPS,
                payload
            );
            this.isGetShopsStart = false;
            this.shops = data.shops;
            if (!this.selectedShop) {
                const shop = this.shops[0];
                await this.setRouteQueries(shop.id);
            }
        },

        async getTransactions() {
            const payload = {
                shopId: this.selectedShopId,
                page: this.pagination.page,
                perPage: this.pagination.perPage,
            };
            this.isGetTransactionsStart = true;
            const { data } = await this.$store.dispatch(
                GET_SHOP_TRANSACTIONS,
                payload
            );
            this.isGetTransactionsStart = false;
            this.transactions = data.shop_transactions;
            this.pagination.totalCount = parseInt(data.total_count) || 0;
        },

        async setRouteQueries(shopId) {
            await this.$router.push({
                name: "seller-dashboard-transaction",
                query: { shop_id: shopId },
            });
        },
    },

    async created() {
        await this.getShops();
        if (this.selectedShopId) await this.getTransactions();
    },
};
</script>
