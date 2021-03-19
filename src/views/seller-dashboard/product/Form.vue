<template>
    <seller-dashboard-form-card-component outlined>
        <template v-slot:title>Create a new Product</template>
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <span class="subtitle-2">Shop Information</span>
                </v-col>
                <v-col cols="12">
                    <v-autocomplete
                        outlined
                        label="Shop"
                        :loading="isGetShopsStart"
                        :items="shops"
                        item-value="id"
                        item-text="name"
                    >
                        <template v-slot:item="{ item }">
                            <v-list-item-avatar :size="50">
                                <v-img :src="item.image_url"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    item.name
                                }}</v-list-item-title>
                                <v-list-item-subtitle>
                                    {{ item.introduction }}
                                </v-list-item-subtitle>
                                <v-list-item-subtitle>
                                    {{ item.address.value }}
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </template>
                    </v-autocomplete>
                </v-col>
                <v-col cols="12">
                    <span class="subtitle-2">Product Details</span>
                </v-col>
                <v-col cols="12">
                    <custom-image-input-component
                        label="Images"
                        outlined
                        operation="create"
                    ></custom-image-input-component>
                </v-col>
                <v-col cols="12">
                    <v-text-field outlined label="Title"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <span class="subtitle-2">Description</span>
                </v-col>
                <v-col cols="12">
                    <custom-rich-text-editor-component></custom-rich-text-editor-component>
                </v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12">
                    <v-autocomplete
                        outlined
                        label="Category"
                        :loading="isGetProductCategoriesStart"
                        :items="categories"
                        item-text="label"
                        item-value="id"
                    >
                        <template v-slot:item="{ item }">
                            <v-list-item-avatar :size="50">
                                <v-img :src="item.image_url"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    item.label
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </template>
                    </v-autocomplete>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        type="number"
                        outlined
                        label="Price per unit"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <custom-stocks-input-component></custom-stocks-input-component>
                </v-col>
                <v-col cols="12">
                    <v-select
                        outlined
                        label="Condition"
                        :loading="isGetProductConditionsStart"
                        :items="conditions"
                        item-value="id"
                        item-text="label"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-select
                        outlined
                        label="Preferred Shipping Method"
                        persistent-hint
                        hint="You can select multiple shipping methods."
                        :loading="isGetProductShippingMethodsStart"
                        :items="shippingMethods"
                        item-value="id"
                        item-text="label"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <custom-combobox-component
                        label="Keywords"
                        outlined
                        hint="You can add up to 3 keywords"
                        persistent-hint
                    ></custom-combobox-component>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn block color="primary" depressed>
                <span class="text-capitalize mr-2">Create Product</span>
                <v-icon>mdi-cart</v-icon>
            </v-btn>
        </v-card-actions>
    </seller-dashboard-form-card-component>
</template>
<script>
import SellerDashboardFormCardComponent from "@/components/global/seller-dashboard-content-card-component";
import CustomImageInputComponent from "@/components/custom/image-input-component";
import CustomStocksInputComponent from "@/components/custom/stocks-input-component";
import CustomComboboxComponent from "@/components/custom/combobox-component";
import {
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCT_CONDITIONS,
    GET_PRODUCT_SHIPPING_METHODS,
} from "@/store/types/product-store-type";
import { GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
import CustomRichTextEditorComponent from "@/components/custom/rich-text-editor-component";
export default {
    components: {
        CustomRichTextEditorComponent,
        CustomComboboxComponent,
        CustomStocksInputComponent,
        CustomImageInputComponent,
        SellerDashboardFormCardComponent,
    },

    data() {
        return {
            categories: [],
            isGetProductCategoriesStart: false,
            shops: [],
            isGetShopsStart: false,
            conditions: [],
            isGetProductConditionsStart: false,
            shippingMethods: [],
            isGetProductShippingMethodsStart: false,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },
    },

    methods: {
        async getProductCategories() {
            this.isGetProductCategoriesStart = true;
            const { data } = await this.$store.dispatch(GET_PRODUCT_CATEGORIES);
            this.categories = data;
            this.isGetProductCategoriesStart = false;
        },

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

        async getProductConditions() {
            this.isGetProductConditionsStart = true;
            const { data } = await this.$store.dispatch(GET_PRODUCT_CONDITIONS);
            this.conditions = data;
            this.isGetProductConditionsStart = false;
        },

        async getProductShippingMethods() {
            this.isGetProductShippingMethodsStart = true;
            const { data } = await this.$store.dispatch(
                GET_PRODUCT_SHIPPING_METHODS
            );
            this.shippingMethods = data;
            this.isGetProductShippingMethodsStart = false;
        },
    },

    async created() {
        await this.getShops();
        await this.getProductCategories();
        await this.getProductConditions();
        await this.getProductShippingMethods();
    },
};
</script>
