<template>
    <section>
        <v-row dense>
            <v-col cols="12">
                <v-card flat>
                    <v-card-subtitle v-if="!isGetShopsStart && hasShops"
                        >Shops related to "<span
                            class="primary--text font-weight-bold"
                            >{{ search }}</span
                        >"</v-card-subtitle
                    >
                    <v-card-subtitle v-if="!isGetShopsStart && !hasShops"
                        >No shops related to "<span
                            class="primary--text font-weight-bold"
                            >{{ search }}</span
                        >"</v-card-subtitle
                    >

                    <v-card-text v-if="!isGetShopsStart">
                        <v-row dense>
                            <template v-for="(shop, index) in shops">
                                <v-col cols="12" :key="index">
                                    <global-shop-search-preview-component
                                        :image-url="shop.image_url"
                                        :name="shop.name"
                                        :created-at="shop.created_at"
                                        :address="shop.address.value"
                                        :contact-number="shop.contact_number"
                                        :store-owner="shop.account"
                                        :slug="shop.slug"
                                        :total-products="
                                            shop.total_products_count
                                        "
                                        :total-orders="shop.total_orders_count"
                                        :rating="shop.rating"
                                    ></global-shop-search-preview-component>
                                </v-col>
                            </template>
                        </v-row>
                    </v-card-text>
                    <custom-loading-spinner-component
                        v-if="isGetShopsStart"
                    ></custom-loading-spinner-component>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            class="text-capitalize"
                            depressed
                            v-if="isSeeMoreShopsButtonEnable"
                            >See More</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card flat>
                    <v-card-subtitle v-if="!isGetProductsStart && hasProducts"
                        >Products related to "<span
                            class="primary--text font-weight-bold"
                            >{{ search }}</span
                        >"</v-card-subtitle
                    >
                    <v-card-subtitle v-if="!isGetProductsStart && !hasProducts"
                        >No products related to "<span
                            class="primary--text font-weight-bold"
                            >{{ search }}</span
                        >"</v-card-subtitle
                    >
                    <v-card-text v-if="!isGetProductsStart">
                        <v-row dense>
                            <template v-for="(product, index) in products">
                                <v-col cols="12" md="4" :key="index">
                                    <global-product-preview-component
                                        :shop-id="product.shop.id"
                                        :category="product.category"
                                        :preview="product.images[0]"
                                        :price="product.price"
                                        :name="product.name"
                                        :description="product.description"
                                        :created-at="product.created_at"
                                        :shop="product.shop"
                                        :stock="product.stock"
                                        :slug="product.slug"
                                        :total-likes="product.likes"
                                        :total-views="product.views"
                                    ></global-product-preview-component>
                                </v-col>
                            </template>
                        </v-row>
                    </v-card-text>
                    <custom-loading-spinner-component
                        v-if="isGetProductsStart"
                    ></custom-loading-spinner-component>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            class="text-capitalize"
                            depressed
                            v-if="isSeeMoreProductsButtonEnable"
                            >See More</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>
<script>
import GlobalShopSearchPreviewComponent from "@/components/global/shop-search-preview-component";
import { SEARCH_SHOPS } from "@/store/types/shop-store-type";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";
import { SEARCH_PRODUCTS } from "@/store/types/product-store-type";
import GlobalProductPreviewComponent from "@/components/global/product-preview-component";
export default {
    components: {
        GlobalProductPreviewComponent,
        CustomLoadingSpinnerComponent,
        GlobalShopSearchPreviewComponent,
    },

    data() {
        return {
            shopsPaginationOptions: {
                page: 1,
                perPage: 3,
                totalCount: 0,
            },
            isGetShopsStart: false,
            shops: [],
            productsPaginationOptions: {
                page: 1,
                perPage: 6,
                totalCount: 0,
            },
            isGetProductsStart: false,
            products: [],
        };
    },

    computed: {
        search() {
            return this.$route.query.search;
        },

        hasShops() {
            return this.shops.length > 0;
        },

        isSeeMoreShopsButtonEnable() {
            return (
                !this.isGetShopsStart &&
                this.shops.length < this.shopsPaginationOptions.totalCount
            );
        },

        hasProducts() {
            return this.products.length > 0;
        },

        isSeeMoreProductsButtonEnable() {
            return (
                !this.isGetProductsStart &&
                this.products.length < this.productsPaginationOptions.totalCount
            );
        },
    },

    watch: {
        async search(value) {
            if (value) {
                this.shops = [];
                this.products = [];
                await this.getShops();
                await this.getProducts();
            }
        },
    },

    methods: {
        async getShops() {
            this.isGetShopsStart = true;
            const payload = {
                page: this.shopsPaginationOptions.page,
                perPage: this.shopsPaginationOptions.perPage,
                search: this.search,
            };
            const { data } = await this.$store.dispatch(SEARCH_SHOPS, payload);
            const shops = data.shops;
            this.shopsPaginationOptions.totalCount = data.total_count || 0;
            if (shops.length === this.shopsPaginationOptions.perPage) {
                this.shops = [...this.shops, ...shops];
                this.shopsPaginationOptions.page += 1;
                this.isGetShopsStart = false;
                return;
            }
            this.shops = [...this.shops, ...shops];
            this.isGetShopsStart = false;
        },

        async getProducts() {
            this.isGetProductsStart = true;
            const payload = {
                page: this.productsPaginationOptions.page,
                perPage: this.productsPaginationOptions.perPage,
                search: this.search,
            };
            const { data } = await this.$store.dispatch(
                SEARCH_PRODUCTS,
                payload
            );
            const products = data.products;
            this.productsPaginationOptions.totalCount = data.total_count || 0;
            if (products.length === this.productsPaginationOptions.perPage) {
                this.products = [...this.products, ...products];
                this.productsPaginationOptions.page += 1;
                this.isGetProductsStart = false;
                return;
            }
            this.products = [...this.products, ...products];
            this.isGetProductsStart = false;
        },
    },

    async created() {
        if (!this.search) await this.$router.go(-1);
        await this.getShops();
        await this.getProducts();
    },
};
</script>
