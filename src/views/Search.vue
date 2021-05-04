<template>
    <section>
        <v-row dense>
            <v-col cols="12">
                <v-card flat>
                    <v-card-subtitle
                        >Shops related to "<span
                            class="primary--text font-weight-bold"
                            >{{ search }}</span
                        >"</v-card-subtitle
                    >
                    <v-card-text>
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
