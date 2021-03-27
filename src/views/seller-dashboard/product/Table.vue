<template>
    <v-card outlined>
        <v-card-title>
            <div class="d-flex align-center">
                <span class="mr-1">Product Management</span>
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
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        depressed
                        :to="{
                            name: 'seller-dashboard-product-form',
                            params: {
                                operation: 'create',
                                params: { operation: 'create' },
                            },
                        }"
                        v-on="on"
                    >
                        <span class="mr-1 text-capitalize">Create</span>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>Create a new Product</span>
            </v-tooltip>
        </v-card-title>
        <v-data-table
            :headers="tableHeaders"
            :loading="isGetProductsStart"
            :items="products"
            :server-items-length="pagination.totalCount"
            :items-per-page.sync="pagination.perPage"
            :page.sync="pagination.page"
            :footer-props="{
                'items-per-page-options': pagination.rowsPerPageItems,
            }"
        >
            <template v-slot:top>
                <v-card-text>
                    <v-text-field
                        filled
                        rounded
                        placeholder="Search"
                        append-icon="mdi-magnify"
                        autofocus
                        v-model="search"
                        :disabled="!selectedShop"
                    ></v-text-field>
                </v-card-text>
            </template>
            <template v-slot:item.name="{ item }">
                <custom-router-link-component
                    :to="{
                        name: 'product-post-view',
                        params: { shopId: item.shop.id, slug: item.slug },
                    }"
                >
                    <span class="black--text font-weight-bold">{{
                        item.name
                    }}</span>
                </custom-router-link-component>
            </template>
            <template v-slot:item.category="{ item }">
                {{ item.category.label }}
            </template>
            <template v-slot:item.price="{ item }">
                {{ formatMoney("PHP", item.price) }}
            </template>
            <template v-slot:item.shippingMethods="{ item }">
                <template v-for="(method, index) in item.shipping_methods">
                    <v-chip :key="index" small color="primary" class="ma-1">
                        {{ method.label }}
                    </v-chip>
                </template>
            </template>
            <template v-slot:item.actions>
                <v-btn icon class="mr-1">
                    <v-icon>mdi-pencil-outline</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
            </template>
        </v-data-table>
    </v-card>
</template>

<script>
import { GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
import { GET_SHOP_PRODUCTS } from "@/store/types/product-store-type";
import commonUtility, { debounce } from "@/common/utility";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";

export default {
    components: { CustomRouterLinkComponent },
    mixins: [commonUtility],

    data() {
        return {
            shops: [],
            isGetShopsStart: false,
            isGetProductsStart: false,
            products: [],
            search: null,
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
                    text: "Name",
                    sortable: false,
                    value: "name",
                },
                {
                    text: "Category",
                    sortable: false,
                    value: "category",
                },
                {
                    text: "Price per unit",
                    sortable: false,
                    value: "price",
                },
                {
                    text: "Shipping Methods",
                    sortable: false,
                    value: "shippingMethods",
                },
                {
                    text: "Actions",
                    value: "actions",
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
        search: debounce(async function () {
            await this.getProducts();
        }, 800),

        async "pagination.page"() {
            await this.getProducts();
        },

        async "pagination.perPage"() {
            await this.getProducts();
        },

        async selectedShopId(value) {
            if (value) await this.getProducts();
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

        async getProducts() {
            const payload = {
                shopId: this.selectedShopId,
                page: this.pagination.page,
                perPage: this.pagination.perPage,
                search: this.search,
            };
            this.isGetProductsStart = true;
            const { data } = await this.$store.dispatch(
                GET_SHOP_PRODUCTS,
                payload
            );
            this.isGetProductsStart = false;
            this.products = data.products;
            if (!this.search) this.pagination.totalCount = data.total_count;
            if (this.search) this.pagination.totalCount = this.shops.length;
        },

        async setRouteQueries(shopId) {
            await this.$router.push({
                name: "seller-dashboard-product",
                query: { shop_id: shopId },
            });
        },
    },

    async created() {
        await this.getShops();
        if (this.selectedShopId) await this.getProducts();
    },
};
</script>
