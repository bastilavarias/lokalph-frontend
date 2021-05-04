<template>
    <v-hover v-slot="{ hover }">
        <v-card outlined :elevation="hover ? 10 : 0">
            <v-row dense>
                <v-col cols="12" md="6">
                    <v-list-item three-line>
                        <v-list-item-avatar :size="65">
                            <v-img
                                src="http://www.clker.com/cliparts/S/e/P/6/M/t/shop-front-icon.svg"
                            ></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title class="font-weight-bold"
                                >Shop Name</v-list-item-title
                            >
                            <v-list-item-subtitle>
                                <v-icon small class="mr-1"
                                    >mdi-map-marker-outline</v-icon
                                >
                                <span>406 Sta Fe St. Tondo, Manila</span>
                            </v-list-item-subtitle>
                            <v-list-item-subtitle>
                                <v-icon small class="mr-1"
                                    >mdi-phone-outline</v-icon
                                >
                                <span>09212709683</span>
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
                                ><span class="font-weight-bold primary--text"
                                    >3</span
                                >
                                Products</span
                            >
                        </div>
                        <div class="text-center">
                            <v-icon class="mr-1" color="primary"
                                >mdi-shopping-outline</v-icon
                            >
                            <span class="d-block"
                                ><span class="font-weight-bold primary--text"
                                    >3</span
                                >
                                Orders</span
                            >
                        </div>
                        <div class="text-center">
                            <v-icon class="mr-1" color="primary"
                                >mdi-star-outline</v-icon
                            >
                            <span class="d-block"
                                ><span class="font-weight-bold primary--text"
                                    >4.1</span
                                >
                                Ratings</span
                            >
                        </div>
                    </v-card-text>
                </v-col>
            </v-row>
        </v-card>
    </v-hover>
</template>

<script>
export default {
    name: "global-shop-search-preview-component",
};
</script>
