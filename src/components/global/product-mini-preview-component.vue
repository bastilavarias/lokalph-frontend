<template>
    <v-card outlined>
        <div :style="{ position: 'relative' }">
            <v-img
                src="https://lookingfourapp.s3-ap-southeast-1.amazonaws.com/d_ii/ii_29483_235ffaa3e1a35d595489b9a20c8ba6fa3e56b1bae8993a43a8ada098681c4a3f.jpg"
                width="100%"
                height="auto"
            ></v-img>
            <div class="floating-product-meta">
                <v-chip small color="secondary">Product Category</v-chip>
            </div>
            <div class="floating-heart-button">
                <v-btn fab small>
                    <v-icon color="grey">mdi-heart</v-icon>
                </v-btn>
            </div>
        </div>
        <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">Product Name</span>
                        </template>
                        <span>Product Name</span>
                    </v-tooltip>
                </v-list-item-title>
                <v-list-item-subtitle>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span
                                v-bind="attrs"
                                v-on="on"
                                class="primary--text font-weight-bold"
                                >PHP 30, 000</span
                            >
                        </template>
                        <span>Product Name</span>
                    </v-tooltip>
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-card-text> product description </v-card-text>
        <v-divider></v-divider>
        <v-list-item two-line>
            <v-list-item-avatar :size="50">
                <v-img
                    src="http://www.clker.com/cliparts/S/e/P/6/M/t/shop-front-icon.svg"
                ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-subtitle> Shop Name </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
    </v-card>
</template>

<script>
export default {
    name: "global-product-mini-preview-component",
};
</script>

<style scoped>
.floating-product-meta {
    position: absolute;
    top: 2%;
    left: 3%;
    transform: translate(2%, 3%);
}

.floating-heart-button {
    position: absolute;
    bottom: -5%;
    right: 3%;
    transform: translate(-5%, 3%);
}
</style>
