<template>
    <v-card outlined>
        <v-list-item three-line>
            <v-list-item-avatar :size="50">
                <v-img :src="imageUrl"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title class="font-weight-bold text-truncate">{{
                    name
                }}</v-list-item-title>
                <v-list-item-subtitle class="text-truncate">{{
                    introduction
                }}</v-list-item-subtitle>
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
                        <span class="primary--text font-weight-bold">99</span>
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
                        <span class="primary--text font-weight-bold">99</span>
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
                        <span class="primary--text font-weight-bold">4.5</span>
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
                <v-icon small class="mr-1">mdi-map-marker-outline</v-icon>
                <span>{{ address }}</span>
            </div>
            <div class="d-flex align-center mb-2">
                <v-icon small class="mr-1">mdi-phone-outline</v-icon>
                <span>{{ contactNumber }}</span>
            </div>
            <div class="d-flex align-center" v-if="storeOwnerName">
                <v-icon small class="mr-1">mdi-account-outline</v-icon>
                <span>{{ storeOwnerName }}</span>
            </div>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn outlined color="primary" class="text-capitalize"
                >View Shop</v-btn
            >
        </v-card-actions>
    </v-card>
</template>

<script>
import commonUtility from "@/common/utility";

export default {
    name: "global-shop-preview-component",

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

        introduction: {
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
