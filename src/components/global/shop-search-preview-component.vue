<template>
    <custom-router-link-component :to="{ name: 'shop-view', params: { slug } }">
        <v-hover v-slot="{ hover }">
            <v-card outlined :elevation="hover ? 10 : 0">
                <v-row dense>
                    <v-col cols="12" md="6">
                        <v-list-item three-line>
                            <v-list-item-avatar :size="65">
                                <v-img :src="imageUrl"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="font-weight-bold">{{
                                    name
                                }}</v-list-item-title>
                                <v-list-item-subtitle>
                                    <v-icon small class="mr-1"
                                        >mdi-map-marker-outline</v-icon
                                    >
                                    <span>{{ address }}</span>
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    <v-icon small class="mr-1"
                                        >mdi-phone-outline</v-icon
                                    >
                                    <span>{{ contactNumber }}</span>
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card-text
                            class="fill-height d-flex justify-space-between align-content-center align-center"
                        >
                            <div class="text-center">
                                <v-icon class="mr-1" color="primary"
                                    >mdi-cart-outline</v-icon
                                >
                                <span class="d-block"
                                    ><span
                                        class="font-weight-bold primary--text"
                                        >{{ totalProducts }}</span
                                    >
                                    Products</span
                                >
                            </div>
                            <div class="text-center">
                                <v-icon class="mr-1" color="primary"
                                    >mdi-shopping-outline</v-icon
                                >
                                <span class="d-block"
                                    ><span
                                        class="font-weight-bold primary--text"
                                        >{{ totalOrders }}</span
                                    >
                                    Orders</span
                                >
                            </div>
                            <div class="text-center">
                                <v-icon class="mr-1" color="primary"
                                    >mdi-star-outline</v-icon
                                >
                                <span class="d-block"
                                    ><span
                                        class="font-weight-bold primary--text"
                                        >{{ rating.toFixed(1) }}</span
                                    >
                                    Ratings</span
                                >
                            </div>
                        </v-card-text>
                    </v-col>
                </v-row>
            </v-card>
        </v-hover>
    </custom-router-link-component>
</template>

<script>
import CustomRouterLinkComponent from "@/components/custom/router-link-component";
export default {
    name: "global-shop-search-preview-component",
    components: { CustomRouterLinkComponent },
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
};
</script>
