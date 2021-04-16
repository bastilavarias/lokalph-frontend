<template>
    <v-row dense>
        <v-col cols="12" md="9">
            <v-row dense>
                <v-col cols="12">
                    <v-card outlined>
                        <v-card-title>Top Selling</v-card-title>
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card outlined>
                        <v-card-title>Reviews from Customers</v-card-title>
                        <v-card-subtitle
                            >Showing {{ reviewsCount }} out of
                            {{ reviewsPaginationOptions.totalCount }}
                            reviews</v-card-subtitle
                        >
                        <v-card-text>
                            <div class="pt-5" v-if="reviewsCount > 0">
                                <v-row dense>
                                    <template
                                        v-for="(review, index) in reviews"
                                    >
                                        <v-col cols="12" :key="index">
                                            <shop-view-review-card-component
                                                :account-first-name="
                                                    review.account.profile
                                                        .first_name
                                                "
                                                :account-email="
                                                    review.account.email
                                                "
                                                :account-image-url="
                                                    review.account.profile
                                                        .image_url
                                                "
                                                :created-at="review.created_at"
                                                :message="review.text"
                                                :rating="review.rating"
                                            ></shop-view-review-card-component>
                                        </v-col>
                                    </template>
                                </v-row>
                            </div>
                            <div
                                class="d-flex justify-center align-center align-content-center py-5"
                                v-if="isGetShopReviewsStart"
                            >
                                <custom-loading-spinner-component></custom-loading-spinner-component>
                            </div>
                            <div
                                class="text-center pt-5"
                                v-if="
                                    !isGetShopReviewsStart && reviewsCount === 0
                                "
                            >
                                <span class="subtitle-1 black--text font-italic"
                                    >No reviews yet.</span
                                >
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                                :disabled="isGetShopReviewsStart"
                                depressed
                                color="primary"
                                class="text-capitalize"
                                @click="getShopReviews"
                                v-if="
                                    reviewsCount <
                                    reviewsPaginationOptions.totalCount
                                "
                                >See More</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" md="3">
            <v-row dense>
                <v-col cols="12">
                    <v-card flat>
                        <v-card-subtitle>New Products</v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import { GET_SHOP_REVIEWS } from "@/store/types/review-store-type";
import { GET_SHOP_DETAILS_BY_SLUG } from "@/store/types/shop-store-type";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";
import ShopViewReviewCardComponent from "@/components/views/shop/review-card-component";

export default {
    components: { ShopViewReviewCardComponent, CustomLoadingSpinnerComponent },
    data() {
        return {
            isGetShopDetailsStart: false,
            shop: null,
            reviewsPaginationOptions: {
                page: 1,
                perPage: 5,
                totalCount: 0,
            },
            isGetShopReviewsStart: false,
            reviews: [],
        };
    },

    computed: {
        shopSlug() {
            return this.$route.params.slug;
        },

        reviewsCount() {
            return this.reviews.length;
        },
    },

    watch: {
        async shop(value) {
            if (value) {
                await this.getShopReviews();
            }
        },
    },

    methods: {
        async getShopDetails() {
            this.isGetShopDetailsStart = true;
            const { data } = await this.$store.dispatch(
                GET_SHOP_DETAILS_BY_SLUG,
                this.shopSlug
            );
            this.shop = Object.assign({}, data);
            this.isGetShopDetailsStart = false;
        },

        async getShopReviews() {
            this.isGetShopReviewsStart = true;
            const payload = {
                shopId: this.shop.id,
                page: this.reviewsPaginationOptions.page,
                perPage: this.reviewsPaginationOptions.perPage,
                search: this.selectedReviewFilter,
            };
            const { data } = await this.$store.dispatch(
                GET_SHOP_REVIEWS,
                payload
            );
            const reviews = data.shop_review;
            this.reviewsPaginationOptions.totalCount = data.total_count || 0;
            if (reviews.length === this.reviewsPaginationOptions.perPage) {
                this.reviews = [...this.reviews, ...reviews];
                this.reviewsPaginationOptions.page += 1;
                this.isGetShopReviewsStart = false;
                return;
            }
            this.reviews = [...this.reviews, ...reviews];
            this.isGetShopReviewsStart = false;
        },
    },

    async created() {
        if (!this.shopSlug) return this.$router.go(-1);
        await this.getShopDetails();
    },
};
</script>
