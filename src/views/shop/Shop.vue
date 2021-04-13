<template>
    <div>
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
                                            src="http://www.clker.com/cliparts/S/e/P/6/M/t/shop-front-icon.svg"
                                        ></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title class="headline"
                                            >Expee</v-list-item-title
                                        >
                                        <v-list-item-subtitle
                                            >Created a year
                                            ago</v-list-item-subtitle
                                        >
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
                                        <span class="text-truncate"
                                            >406 Santa Fe Tondo Manila</span
                                        >
                                    </v-list-item-icon>
                                </v-list-item>
                                <v-list-item dense>
                                    <v-list-item-icon>
                                        <v-icon class="mr-1"
                                            >mdi-phone-outline</v-icon
                                        >
                                        <span class="text-truncate"
                                            >09212709683</span
                                        >
                                    </v-list-item-icon>
                                </v-list-item>
                                <v-list-item dense>
                                    <v-list-item-icon>
                                        <v-icon class="mr-1"
                                            >mdi-account-outline</v-icon
                                        >
                                        <span class="text-truncate"
                                            >Sebastian Curtis Lavarias</span
                                        >
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-title>About Shop</v-card-title>
            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
                mollitia perferendis recusandae? Aut minima modi placeat quidem
                ut. Amet autem delectus eius est eveniet inventore iste nam,
                necessitatibus, officiis omnis quaerat quidem repellendus sint
                vitae voluptate. Assumenda consectetur deleniti, dolore eveniet
                ex facere incidunt odio pariatur quae, sed ut voluptas.
            </v-card-text>
            <v-tabs fixed-tabs v-model="tab">
                <template v-for="(tab, index) in tabs">
                    <v-tab :key="index">
                        <v-icon class="mr-1">{{ tab.icon }}</v-icon>
                        <span class="text-capitalize">{{ tab.text }}</span>
                    </v-tab>
                </template>
            </v-tabs>
        </v-card>
        <v-tabs-items v-model="tab">
            <v-tab-item>
                <router-view></router-view>
            </v-tab-item>
        </v-tabs-items>
    </div>
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
                    text: "Home",
                    icon: "mdi-storefront-outline",
                },

                {
                    text: "Product",
                    icon: "mdi-cart-outline",
                },

                {
                    text: "Review",
                    icon: "mdi-comment-quote-outline",
                },
            ];
        },
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
