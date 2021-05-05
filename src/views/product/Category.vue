<template>
    <section>
        <v-row dense>
            <v-col cols="12" md="4">
                <v-list rounded dense>
                    <v-subheader>Categories</v-subheader>
                    <custom-loading-spinner-component
                        v-if="isGetCategoriesStart"
                    ></custom-loading-spinner-component>
                    <v-list-item-group
                        v-model="selectedCategoryIndex"
                        color="primary"
                        mandatory
                    >
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
                <v-card-title v-if="selectedCategory"
                    >Results for "<span
                        class="primary--text font-weight-bold"
                        >{{ selectedCategory.label }}</span
                    >"</v-card-title
                >
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

export default {
    components: { CustomLoadingSpinnerComponent },

    data() {
        return {
            selectedCategoryIndex: 0,
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

        selectedCategory() {
            if (this.categories.length === 0) return null;
            return this.categories.find(
                (_, index) => index === this.selectedCategoryIndex
            );
        },
    },

    watch: {
        categories(value) {
            if (value.length > 0) {
                const categoryIndex = value
                    .map((category) => category.name)
                    .indexOf(this.category);
                if (categoryIndex < 1) return this.$router.go(-1);
                this.selectedCategoryIndex = categoryIndex;
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
            console.log(products);
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
