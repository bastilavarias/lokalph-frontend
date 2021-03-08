<template>
    <v-card outlined>
        <v-card-title class="font-weight-bold headline">
            Seller Dashboard
        </v-card-title>
        <v-tabs v-model="tab" fixed-tabs>
            <template v-for="(tab, index) in tabs">
                <v-tab :key="index">
                    <v-icon class="mr-1">{{ tab.icon }}</v-icon>
                    <span class="text-capitalize">{{ tab.text }}</span>
                </v-tab>
            </template>
        </v-tabs>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            tab: null,
        };
    },

    computed: {
        tabs() {
            return [
                {
                    text: "Dashboard",
                    icon: "mdi-view-dashboard",
                },
                {
                    text: "Shops",
                    icon: "mdi-storefront",
                },
                {
                    text: "Products",
                    icon: "mdi-cart",
                },
                {
                    text: "Reviews & Inquiries",
                    icon: "mdi-comment-quote-outline",
                },
                {
                    text: "Orders",
                    icon: "mdi-history",
                },
            ];
        },
    },
};
</script>
