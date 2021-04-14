<template>
    <div>
        <shop-view-tabs-skeleton-loader
            v-if="isGetShopDetailsStart"
        ></shop-view-tabs-skeleton-loader>
        <div v-if="!isGetShopDetailsStart">
            <v-card outlined>
                <v-card-text>
                    <v-row>
                        <v-col cols="12" md="5">
                            <v-card
                                height="130"
                                width="100%"
                                :style="{ position: 'relative' }"
                                rounded
                                flat
                                dark
                            >
                                <div
                                    class="name-card-background custom-black-overlay"
                                    :style="{
                                        backgroundImage: `url(${require('@/assets/images/red-background-hero.webp')})`,
                                    }"
                                >
                                    <v-list-item two-line>
                                        <v-list-item-avatar :size="100">
                                            <v-img
                                                :src="shop.image_url"
                                            ></v-img>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title
                                                class="headline"
                                                >{{
                                                    shop.name
                                                }}</v-list-item-title
                                            >
                                            <v-list-item-subtitle>{{
                                                formatRelativeTime(
                                                    shop.created_at
                                                )
                                            }}</v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </div>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="7">
                            <v-row dense>
                                <v-col cols="6">
                                    <v-list-item dense>
                                        <v-list-item-icon>
                                            <v-icon color="primary" class="mr-1"
                                                >mdi-cart-outline</v-icon
                                            >
                                            <span
                                                ><span
                                                    class="font-weight-bold primary--text"
                                                    >99</span
                                                >
                                                Products</span
                                            >
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item dense>
                                        <v-list-item-icon>
                                            <v-icon color="primary" class="mr-1"
                                                >mdi-shopping-outline</v-icon
                                            >
                                            <span
                                                ><span
                                                    class="font-weight-bold primary--text"
                                                    >99</span
                                                >
                                                Orders</span
                                            >
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item dense>
                                        <v-list-item-icon>
                                            <v-icon color="primary" class="mr-1"
                                                >mdi-star-outline</v-icon
                                            >
                                            <span
                                                class="font-weight-bold primary--text"
                                                >5 Star</span
                                            >
                                        </v-list-item-icon>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="6">
                                    <v-list-item dense>
                                        <v-list-item-icon>
                                            <v-icon class="mr-1"
                                                >mdi-map-marker-outline</v-icon
                                            >
                                            <span
                                                class="text-truncate"
                                                :title="shop.address.value"
                                                >{{ shop.address.value }}</span
                                            >
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item dense>
                                        <v-list-item-icon>
                                            <v-icon class="mr-1"
                                                >mdi-phone-outline</v-icon
                                            >
                                            <span
                                                class="text-truncate"
                                                :title="shop.contact_number"
                                                >{{ shop.contact_number }}</span
                                            >
                                        </v-list-item-icon>
                                    </v-list-item>
                                    <v-list-item
                                        dense
                                        class="align-content-center align-center"
                                    >
                                        <v-list-item-icon>
                                            <v-icon class="mr-1"
                                                >mdi-account-outline</v-icon
                                            >
                                            <custom-router-link-component
                                                :to="{
                                                    name: 'profile-view',
                                                    params: {
                                                        email:
                                                            shop.account.email,
                                                    },
                                                }"
                                            >
                                                <span
                                                    class="primary--text font-weight-bold text-truncate"
                                                    :title="`${shop.account.profile.first_name} ${shop.account.profile.last_name}`"
                                                    >{{
                                                        shop.account.profile
                                                            .first_name
                                                    }}
                                                    {{
                                                        shop.account.profile
                                                            .last_name
                                                    }}</span
                                                >
                                            </custom-router-link-component>
                                        </v-list-item-icon>
                                    </v-list-item>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-card-text>
                <div v-if="shop.introduction">
                    <v-card-title>About Shop</v-card-title>
                    <v-card-text>
                        {{ shop.introduction }}
                    </v-card-text>
                </div>
                <v-tabs fixed-tabs v-model="tab">
                    <template v-for="(tab, index) in tabs">
                        <v-tab :key="index" :to="tab.to" exact>
                            <v-icon class="mr-1">{{ tab.icon }}</v-icon>
                            <span class="text-capitalize">{{ tab.text }}</span>
                        </v-tab>
                    </template>
                </v-tabs>
            </v-card>
            <v-tabs-items v-model="tab">
                <router-view></router-view>
            </v-tabs-items>
        </div>
    </div>
</template>

<script>
import { GET_SHOP_DETAILS_BY_SLUG } from "@/store/types/shop-store-type";
import ShopViewTabsSkeletonLoader from "@/components/views/shop/tabs-skeleton-loader";
import commonUtility from "@/common/utility";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";

export default {
    components: { CustomRouterLinkComponent, ShopViewTabsSkeletonLoader },

    data() {
        return {
            tab: null,
            isGetShopDetailsStart: false,
            shop: null,
        };
    },

    mixins: [commonUtility],

    computed: {
        tabs() {
            return [
                {
                    text: "Home",
                    icon: "mdi-storefront-outline",
                    to: { name: "shop-view", params: { slug: this.shop.slug } },
                },

                {
                    text: "Product",
                    icon: "mdi-cart-outline",
                    to: {
                        name: "shop-product-view",
                        params: { slug: this.shop.slug },
                    },
                },

                {
                    text: "Review",
                    icon: "mdi-comment-quote-outline",
                    to: {
                        name: "shop-review-view",
                        params: { slug: this.shop.slug },
                    },
                },
            ];
        },

        shopSlug() {
            return this.$route.params.slug;
        },
    },

    methods: {
        async getShopDetails() {
            this.isGetShopDetailsStart = true;
            const { data } = await this.$store.dispatch(
                GET_SHOP_DETAILS_BY_SLUG,
                this.shopSlug
            );
            console.log(data);
            this.shop = Object.assign({}, data);
            this.isGetShopDetailsStart = false;
        },
    },

    async created() {
        if (!this.shopSlug) return this.$router.go(-1);
        await this.getShopDetails();
    },
};
</script>

<style lang="css" scoped>
.name-card-background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
