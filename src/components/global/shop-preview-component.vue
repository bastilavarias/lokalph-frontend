<template>
    <custom-router-link-component :to="{ name: 'shop-view', params: { slug } }">
        <v-hover v-slot="{ hover }">
            <v-card outlined :elevation="hover ? 10 : 0">
                <v-list-item two-line-line>
                    <v-list-item-avatar :size="50">
                        <v-img :src="imageUrl"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            <custom-router-link-component
                                :to="{ name: 'shop-view', params: { slug } }"
                            >
                                <span
                                    class="black--text font-weight-bold text-truncate"
                                    >{{ name }}</span
                                >
                            </custom-router-link-component>
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Created {{ formatRelativeTime(createdAt) }}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-card-text>
                    <div class="d-flex justify-space-around align-center">
                        <div>
                            <div class="d-flex justify-center align-center">
                                <v-icon small color="primary" class="mr-1"
                                    >mdi-cart-outline</v-icon
                                >
                                <span class="primary--text font-weight-bold">{{
                                    totalProducts
                                }}</span>
                            </div>
                            <div class="d-flex justify-center align-center">
                                <span>Products</span>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-center align-center">
                                <v-icon small color="primary" class="mr-1"
                                    >mdi-shopping-outline</v-icon
                                >
                                <span class="primary--text font-weight-bold">{{
                                    totalOrders
                                }}</span>
                            </div>
                            <div class="d-flex justify-center align-center">
                                <span>Orders</span>
                            </div>
                        </div>
                        <div>
                            <div class="d-flex justify-center align-center">
                                <v-icon small color="primary" class="mr-1"
                                    >mdi-star-outline</v-icon
                                >
                                <span class="primary--text font-weight-bold">{{
                                    rating.toFixed(1)
                                }}</span>
                            </div>
                            <div class="d-flex justify-center align-center">
                                <span>Ratings</span>
                            </div>
                        </div>
                    </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <div class="d-flex align-center mb-2">
                        <v-icon small class="mr-1"
                            >mdi-map-marker-outline</v-icon
                        >
                        <span>{{ address }}</span>
                    </div>
                    <div class="d-flex align-center mb-2">
                        <v-icon small class="mr-1">mdi-phone-outline</v-icon>
                        <span>{{ contactNumber }}</span>
                    </div>
                    <div class="d-flex align-center" v-if="storeOwnerName">
                        <v-icon small class="mr-1">mdi-account-outline</v-icon>
                        <custom-router-link-component
                            :to="{
                                name: 'profile-view',
                                params: { email: storeOwner.email },
                            }"
                        >
                            <span
                                class="black--text font-weight-bold text-truncate"
                                :title="storeOwnerName"
                                >{{ storeOwnerName }}</span
                            >
                        </custom-router-link-component>
                    </div>
                </v-card-text>
            </v-card>
        </v-hover>
    </custom-router-link-component>
</template>

<script>
import commonUtility from "@/common/utility";
import CustomRouterLinkComponent from "@/components/custom/router-link-component";

export default {
    name: "global-shop-preview-component",
    components: { CustomRouterLinkComponent },
    mixins: [commonUtility],

    props: {
        imageUrl: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        createdAt: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        contactNumber: {
            type: String,
            required: true,
        },

        storeOwner: {
            type: Object,
            required: true,
        },

        slug: {
            type: String,
            required: true,
        },

        totalProducts: {
            type: Number,
            required: true,
        },

        totalOrders: {
            type: Number,
            required: true,
        },

        rating: {
            type: Number,
            required: true,
        },
    },

    computed: {
        storeOwnerName() {
            const { first_name, last_name } = this.storeOwner.profile;
            return last_name
                ? `${first_name} ${last_name}`
                : `${first_name}` || null;
        },
    },
};
</script>
