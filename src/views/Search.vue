<template>
    <section>
        <v-row dense>
            <v-col cols="12">
                <v-card flat>
                    <v-card-subtitle
                        >Shops related to "<span
                            class="primary--text font-weight-bold"
                            >Query</span
                        >"</v-card-subtitle
                    >
                    <v-card-text>
                        <v-row dense>
                            <template v-for="n in 3">
                                <v-col cols="12" :key="n">
                                    <global-shop-search-preview-component></global-shop-search-preview-component>
                                </v-col>
                            </template>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" class="text-capitalize" depressed
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
import { GET_PRODUCT_REVIEWS } from "@/store/types/review-store-type";
import { SEARCH_SHOPS } from "@/store/types/shop-store-type";
export default {
    components: { GlobalShopSearchPreviewComponent },

    data() {
        return {
            shopsPaginationOptions: {
                page: 1,
                perPage: 3,
                totalCount: 0,
            },
            isGetShopsStart: false,
            shops: [],
        };
    },

    computed: {
        search() {
            return this.$route.query.search;
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
    },

    async created() {
        if (!this.search) await this.$router.go(-1);
        await this.getShops();
    },
};
</script>
