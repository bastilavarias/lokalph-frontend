<template>
    <section>
        <v-row>
            <v-col cols="12">
                <v-card outlined min-height="280">
                    <v-card-title>Explore</v-card-title>
                    <custom-loading-spinner-component
                        v-if="isGetCategoriesStart"
                    ></custom-loading-spinner-component>
                    <v-slide-group
                        v-model="currentSlideGroup"
                        class="pa-4"
                        show-arrows
                    >
                        <v-slide-item
                            v-for="(category, index) in categories"
                            :key="index"
                        >
                            <v-card flat class="ma-5">
                                <div class="text-center">
                                    <custom-router-link-component
                                        :to="{
                                            name: 'product-category-view',
                                            params: {
                                                name: category.name,
                                            },
                                        }"
                                    >
                                        <v-avatar :size="100" class="mb-5">
                                            <v-img
                                                :src="category.image_url"
                                            ></v-img>
                                        </v-avatar>
                                    </custom-router-link-component>
                                </div>

                                <div
                                    class="d-flex justify-space-between align-center"
                                >
                                    <v-spacer></v-spacer>
                                    <custom-router-link-component
                                        :to="{
                                            name: 'product-category-view',
                                            params: {
                                                name: category.name,
                                            },
                                        }"
                                    >
                                        <span class="subtitle-2 black--text">{{
                                            category.label
                                        }}</span>
                                    </custom-router-link-component>
                                    <v-spacer></v-spacer>
                                </div>
                            </v-card>
                        </v-slide-item>
                    </v-slide-group>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card flat color="transparent">
                    <v-card-title class="display-1 font-weight-bold">
                        Hot Products 🔥🔥
                    </v-card-title>
                    <v-card-text>
                        <v-row dense>
                            <template v-for="(product, index) in hotProducts">
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
                        v-if="isGetHotProductsStart"
                    ></custom-loading-spinner-component>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            class="text-capitalize"
                            depressed
                            v-if="isSeeMoreHotProductsButtonEnable"
                            :loading="isGetHotProductsStart"
                            @click="getHotProducts"
                            >See More</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card flat color="transparent">
                    <v-card-title class="display-1 font-weight-bold">
                        New Products 🚀🚀
                    </v-card-title>
                    <v-card-text>
                        <v-row dense>
                            <template v-for="(product, index) in newProducts">
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
                        v-if="isGetNewProductsStart"
                    ></custom-loading-spinner-component>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            class="text-capitalize"
                            depressed
                            v-if="isSeeMoreNewProductsButtonEnable"
                            :loading="isGetNewProductsStart"
                            @click="getNewProducts"
                            >See More</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import {
    GET_HOT_PRODUCTS,
    GET_PRODUCT_CATEGORIES,
} from "@/store/types/product-store-type";
import GlobalProductPreviewComponent from "@/components/global/product-preview-component";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";

export default {
    components: {
        CustomRouterLinkComponent,
        CustomLoadingSpinnerComponent,
        GlobalProductPreviewComponent,
    },

    data() {
        return {
            isGetHotProductsStart: false,
            hotProducts: [],
            hotProductsPaginationOptions: {
                page: 1,
                perPage: 6,
                totalCount: 0,
            },
            isGetNewProductsStart: false,
            newProducts: [],
            newProductsPaginationOptions: {
                page: 1,
                perPage: 6,
                totalCount: 0,
            },
            categories: [],
            isGetCategoriesStart: false,
            currentSlideGroup: null,
        };
    },

    computed: {
        isSeeMoreHotProductsButtonEnable() {
            return (
                !this.isGetHotProductsStart &&
                this.hotProducts.length <
                    this.hotProductsPaginationOptions.totalCount
            );
        },

        isSeeMoreNewProductsButtonEnable() {
            return (
                !this.isGetNewProductsStart &&
                this.newProducts.length <
                    this.newProductsPaginationOptions.totalCount
            );
        },
    },

    methods: {
        async getHotProducts() {
            this.isGetHotProductsStart = true;
            const payload = {
                page: this.hotProductsPaginationOptions.page,
                perPage: this.hotProductsPaginationOptions.perPage,
            };
            const { data } = await this.$store.dispatch(
                GET_HOT_PRODUCTS,
                payload
            );
            const products = data.products;
            this.hotProductsPaginationOptions.totalCount =
                data.total_count || 0;
            if (products.length === this.hotProductsPaginationOptions.perPage) {
                this.hotProducts = [...this.hotProducts, ...products];
                this.hotProductsPaginationOptions.page += 1;
                this.isGetHotProductsStart = false;
                return;
            }
            this.hotProducts = [...this.hotProducts, ...products];
            this.isGetHotProductsStart = false;
        },

        async getNewProducts() {
            this.isGetNewProductsStart = true;
            const payload = {
                page: this.newProductsPaginationOptions.page,
                perPage: this.newProductsPaginationOptions.perPage,
            };
            const { data } = await this.$store.dispatch(
                GET_HOT_PRODUCTS,
                payload
            );
            const products = data.products;
            this.newProductsPaginationOptions.totalCount =
                data.total_count || 0;
            if (products.length === this.newProductsPaginationOptions.perPage) {
                this.newProducts = [...this.newProducts, ...products];
                this.newProductsPaginationOptions.page += 1;
                this.isGetNewProductsStart = false;
                return;
            }
            this.newProducts = [...this.newProducts, ...products];
            this.isGetNewProductsStart = false;
        },

        async getCategories() {
            this.isGetCategoriesStart = true;
            const { data } = await this.$store.dispatch(GET_PRODUCT_CATEGORIES);
            this.categories = data;
            this.isGetCategoriesStart = false;
        },
    },

    async created() {
        await this.getCategories();
        await this.getHotProducts();
        await this.getNewProducts();
    },
};
</script>
