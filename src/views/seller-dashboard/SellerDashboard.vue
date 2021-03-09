<template>
    <v-row dense>
        <v-col cols="12">
            <v-card outlined>
                <v-card-title class="font-weight-bold headline">
                    Seller Dashboard
                </v-card-title>
                <v-tabs fixed-tabs>
                    <template v-for="(tab, index) in tabs">
                        <v-tab :key="index" :to="tab.to">
                            <v-icon class="mr-1">{{ tab.icon }}</v-icon>
                            <span class="text-capitalize">{{ tab.text }}</span>
                        </v-tab>
                    </template>
                </v-tabs>
            </v-card>
        </v-col>
        <v-col cols="12">
            <v-tabs-items>
                <router-view></router-view>
            </v-tabs-items>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        tabs() {
            return [
                {
                    text: "Dashboard",
                    icon: "mdi-view-dashboard",
                    to: { name: "seller-dashboard-view" },
                },
                {
                    text: "Shops",
                    icon: "mdi-storefront",
                    to: { name: "seller-dashboard-shop" },
                },
                {
                    text: "Products",
                    icon: "mdi-cart",
                    to: { name: "seller-dashboard-product" },
                },
                {
                    text: "Reviews & Inquiries",
                    icon: "mdi-comment-quote-outline",
                    to: { name: "seller-dashboard-review-inquiry" },
                },
                {
                    text: "Orders",
                    icon: "mdi-history",
                    to: { name: "seller-dashboard-order" },
                },
            ];
        },
    },
};
</script>
