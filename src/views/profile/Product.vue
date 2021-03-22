<template>
    <v-card outlined>
        <v-card-title>
            <div>
                <span>Products</span>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            text
                            v-bind="attrs"
                            v-on="on"
                            :loading="isGetShopsStart"
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
                                @click="selectedShop = shop"
                                >{{ shop.name }}</v-list-item
                            >
                        </template>
                    </v-list>
                </v-menu>
            </div>
            <v-spacer></v-spacer>
        </v-card-title>
        <v-card-text>
            <v-row dense>
                <template v-for="(product, index) in products">
                    <v-col cols="12" md="4" :key="index">
                        <global-product-mini-preview-component
                            :category="product.category"
                            :preview="product.images[0]"
                            :price="product.price"
                            :name="product.name"
                            :description="product.description"
                            :created-at="product.created_at"
                            :shop="product.shop"
                        ></global-product-mini-preview-component>
                    </v-col>
                </template>
            </v-row>
            <infinite-loading
                @infinite="getProducts"
                :identifier="scrollOptions.id"
                v-if="selectedShop"
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
                                products.length === 0
                                    ? "No products available."
                                    : ""
                            }}
                        </span>
                    </div>
                </template>
            </infinite-loading>
        </v-card-text>
    </v-card>
</template>
<script>
import GlobalProductMiniPreviewComponent from "@/components/global/product-mini-preview-component";
import { GET_ACCOUNT_DETAILS_BY_EMAIL } from "@/store/types/account-store-type";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";
import { GET_SHOP_PRODUCTS } from "@/store/types/product-store-type";
import { GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
export default {
    components: {
        CustomLoadingSpinnerComponent,
        GlobalProductMiniPreviewComponent,
    },

    data() {
        return {
            account: null,
            isGetAccountDetailsStart: false,
            products: [],
            isGetShopsStart: false,
            shops: [],
            selectedShop: null,
            scrollOptions: {
                page: 1,
                perPage: 5,
                id: +new Date(),
            },
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },

    watch: {
        selectedShop(value) {
            if (value) {
                this.scrollOptions = Object.assign(this.scrollOptions, {
                    page: 1,
                    perPage: 5,
                    id: +new Date(),
                });
                this.products = [];
            }
        },
    },

    methods: {
        async getAccountDetails() {
            const email = this.$route.params.email || null;
            if (!email) return this.$router.go(-1);
            this.isGetAccountDetailsStart = true;
            const { success, data, error } = await this.$store.dispatch(
                GET_ACCOUNT_DETAILS_BY_EMAIL,
                email
            );
            this.isGetAccountDetailsStart = false;
            if (error) return this.$router.go(-1);
            if (success) {
                this.account = Object.assign({}, data);
            }
        },

        async getShops() {
            const payload = {
                accountId: this.account.id,
                perPage: 999,
            };
            this.isGetShopsStart = true;
            const { data } = await this.$store.dispatch(
                GET_ACCOUNT_SHOPS,
                payload
            );
            this.isGetShopsStart = false;
            this.shops = data.shops;
        },

        async getProducts($state) {
            const payload = {
                shopId: this.selectedShop.id,
                page: this.scrollOptions.page,
                perPage: this.scrollOptions.perPage,
            };
            const { data } = await this.$store.dispatch(
                GET_SHOP_PRODUCTS,
                payload
            );
            const products = data.products;
            if (products.length === this.scrollOptions.perPage) {
                this.products = [...this.products, ...products];
                $state.loaded();
                this.scrollOptions.page += 1;
                return;
            }
            this.products = [...this.products, ...products];
            $state.complete();
        },
    },

    async created() {
        await this.getAccountDetails();
        await this.getShops();
    },
};
</script>
