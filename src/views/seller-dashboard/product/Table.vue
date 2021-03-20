<template>
    <v-card outlined>
        <v-card-title>
            <div class="d-flex align-center">
                <span class="mr-1">Product Management</span>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            text
                            v-bind="attrs"
                            v-on="on"
                            :loading="isGetShopsStart"
                            small
                        >
                            <span
                                class="mr-1 font-weight-bold"
                                v-if="selectedShop"
                                >{{ selectedShop.name }}</span
                            >
                            <span
                                v-if="!selectedShop"
                                class="mr-1 text-capitalize font-italic"
                                >Select Shop</span
                            >
                            <v-icon>mdi-chevron-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <template v-for="(shop, index) in shops">
                            <v-list-item
                                :key="index"
                                @click="selectedShop = shop"
                                >{{ shop.name }}</v-list-item
                            >
                        </template>
                    </v-list>
                </v-menu>
            </div>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn
                        color="primary"
                        depressed
                        :to="{
                            name: 'seller-dashboard-product-form',
                            params: {
                                operation: 'create',
                                params: { operation: 'create' },
                            },
                        }"
                        v-on="on"
                    >
                        <span class="mr-1 text-capitalize">Create</span>
                        <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <span>Create a new Product</span>
            </v-tooltip>
        </v-card-title>
        <v-data-table></v-data-table>
    </v-card>
</template>

<script>
import { GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";

export default {
    data() {
        return {
            shops: [],
            isGetShopsStart: false,
            selectedShop: null,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },

    methods: {
        async getShops() {
            const payload = {
                accountId: this.user.id,
                perPage: 999,
            };
            this.isGetShopsStart = true;
            const { data } = await this.$store.dispatch(
                GET_ACCOUNT_SHOPS,
                payload
            );
            this.isGetShopsStart = false;
            this.shops = data.shops;
        },
    },

    async created() {
        await this.getShops();
    },
};
</script>
