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
                            <v-list-item :key="index">
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
            <v-col cols="3" md="9">
                <v-card-title
                    >Results for
                    <span class="primary--text font-weight-bold"></span
                ></v-card-title>
            </v-col>
        </v-row>
    </section>
</template>

<script>
import { GET_PRODUCT_CATEGORIES } from "@/store/types/product-store-type";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";

export default {
    components: { CustomLoadingSpinnerComponent },

    data() {
        return {
            selectedCategoryIndex: 0,
            categories: [],
            isGetCategoriesStart: false,
        };
    },

    computed: {
        category() {
            return this.$route.params.name;
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
    },

    async created() {
        await this.getCategories();
    },
};
</script>
