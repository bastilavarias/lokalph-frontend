<template>
    <section>
        <v-row dense>
            <v-col cols="12" md="4">
                <v-list rounded dense>
                    <v-subheader>Categories</v-subheader>
                    <custom-loading-spinner-component
                        v-if="isGetCategoriesStart"
                    ></custom-loading-spinner-component>
                    <v-list-item-group color="primary" mandatory>
                        <template v-for="(category, index) in categories">
                            <v-list-item
                                :key="index"
                                :to="{
                                    name: 'product-category-view',
                                    params: { name: category.name },
                                }"
                            >
                                <v-list-item-avatar :size="25">
                                    <v-img :src="category.image_url"></v-img>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{ category.label }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-col>
            <v-col cols="3" md="8">
                <v-card-title v-if="noResults && selectedCategory">
                    No results for "<span
                        class="primary--text font-weight-bold"
                        >{{ selectedCategory.label }}</span
                    >"
                </v-card-title>
                <v-card-title
                    v-if="
                        !isGetProductsStart && hasProducts && selectedCategory
                    "
                    >Products related to "<span
                        class="primary--text font-weight-bold"
                        >{{ selectedCategory.label }}</span
                    >"</v-card-title
                >
                <!--                <v-card-title v-if="selectedCategory"-->
                <!--                    >Results for "<span-->
                <!--                        class="primary&#45;&#45;text font-weight-bold"-->
                <!--                        >{{ selectedCategory.label }}</span-->
                <!--                    >"</v-card-title-->
                <!--                >-->
                <v-card flat>
                    <v-card-text>
                        <v-row dense>
                            <template v-for="(product, index) in products">
                                <v-col cols="12" md="6" :key="index">
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
                        <custom-loading-spinner-component
                            v-if="isGetProductsStart"
                        ></custom-loading-spinner-component>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            class="text-capitalize"
                            depressed
                            v-if="isSeeMoreProductsButtonEnable"
                            :loading="isGetProductsStart"
                            @click="getProducts"
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
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCTS_BY_CATEGORY,
    SEARCH_PRODUCTS,
} from "@/store/types/product-store-type";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";
import GlobalProductPreviewComponent from "@/components/global/product-preview-component";

export default {
    components: {
        GlobalProductPreviewComponent,
        CustomLoadingSpinnerComponent,
    },

    data() {
        return {
            categories: [],
            isGetCategoriesStart: false,
            paginationOptions: {
                page: 1,
                perPage: 6,
                totalCount: 0,
            },
            isGetProductsStart: false,
            products: [],
        };
    },

    computed: {
        category() {
            return this.$route.params.name;
        },

        hasProducts() {
            return this.products.length > 0;
        },

        isSeeMoreProductsButtonEnable() {
            return (
                !this.isGetProductsStart &&
                this.products.length < this.paginationOptions.totalCount
            );
        },

        noResults() {
            return !this.isGetProductsStart && !this.hasProducts;
        },

        selectedCategory() {
            if (!this.category) return null;
            return this.categories.find(
                (category) => category.name === this.category
            );
        },
    },

    watch: {
        async category(value) {
            if (value) {
                this.paginationOptions = Object.assign(
                    {},
                    {
                        page: 1,
                        perPage: 6,
                        totalCount: 0,
                    }
                );
                this.products = [];
                await this.getProducts();
            }
        },
    },

    methods: {
        async getCategories() {
            this.isGetCategoriesStart = true;
            const { data } = await this.$store.dispatch(GET_PRODUCT_CATEGORIES);
            this.categories = data;
            this.isGetCategoriesStart = false;
        },

        async getProducts() {
            this.isGetProductsStart = true;
            const payload = {
                page: this.paginationOptions.page,
                perPage: this.paginationOptions.perPage,
                name: this.category,
            };
            const { data } = await this.$store.dispatch(
                GET_PRODUCTS_BY_CATEGORY,
                payload
            );
            const products = data.products;
            this.paginationOptions.totalCount = data.total_count || 0;
            if (products.length === this.paginationOptions.perPage) {
                this.products = [...this.products, ...products];
                this.paginationOptions.page += 1;
                this.isGetProductsStart = false;
                return;
            }
            this.products = [...this.products, ...products];
            this.isGetProductsStart = false;
        },
    },

    async created() {
        if (!this.category) return this.$router.go(-1);
        await this.getCategories();
        await this.getProducts();
    },
};
</script>
