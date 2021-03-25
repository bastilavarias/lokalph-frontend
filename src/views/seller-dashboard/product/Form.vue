<template>
    <seller-dashboard-form-card-component outlined>
        <template v-slot:title>Create a new Product</template>
        <v-card-text>
            <v-row dense>
                <v-col cols="12" v-if="isErrorAlertOpen">
                    <v-alert type="error">
                        {{ errorAlertMessage }}
                    </v-alert>
                </v-col>
                <v-col cols="12">
                    <span class="subtitle-2">Shop Information</span>
                </v-col>
                <v-col cols="12">
                    <v-autocomplete
                        outlined
                        label="Shop *"
                        :loading="isGetShopsStart"
                        :items="shops"
                        item-value="id"
                        item-text="name"
                        v-model="form.shopId"
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
                        label="Images *"
                        outlined
                        operation="create"
                        :images.sync="form.images"
                    ></custom-image-input-component>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        outlined
                        label="Name *"
                        v-model="form.name"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <span class="subtitle-2">Description *</span>
                </v-col>
                <v-col cols="12">
                    <custom-rich-text-editor-component
                        :editor-content.sync="form.description"
                    ></custom-rich-text-editor-component>
                </v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12"></v-col>
                <v-col cols="12">
                    <v-autocomplete
                        outlined
                        label="Category *"
                        :loading="isGetProductCategoriesStart"
                        :items="categories"
                        item-text="label"
                        item-value="id"
                        v-model="form.categoryId"
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
                        label="Price per unit *"
                        v-model="form.price"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <custom-stock-input-component
                        label="Stock *"
                        :stock.sync="form.stock"
                    ></custom-stock-input-component>
                </v-col>
                <v-col cols="12">
                    <v-select
                        outlined
                        label="Condition *"
                        :loading="isGetProductConditionsStart"
                        :items="conditions"
                        item-value="id"
                        item-text="label"
                        v-model="form.conditionId"
                    ></v-select>
                </v-col>
                <v-col cols="12">
                    <v-select
                        outlined
                        label="Preferred Shipping Method *"
                        persistent-hint
                        hint="You can select multiple shipping methods."
                        :loading="isGetProductShippingMethodsStart"
                        :items="shippingMethods"
                        item-value="id"
                        item-text="label"
                        v-model="form.shippingMethodIds"
                        multiple
                    ></v-select>
                </v-col>

                <v-col cols="12">
                    <custom-combobox-component
                        label="Keywords"
                        outlined
                        hint="You can add up to 3 keywords"
                        persistent-hint
                        :items.sync="form.keywords"
                        :limit="3"
                    ></custom-combobox-component>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn
                block
                color="primary"
                depressed
                @click="createProduct"
                :loading="isCreateProductStart"
                :disabled="!isFormValid"
            >
                <span class="text-capitalize mr-2">Create Product</span>
                <v-icon>mdi-cart</v-icon>
            </v-btn>
        </v-card-actions>
    </seller-dashboard-form-card-component>
</template>
<script>
import SellerDashboardFormCardComponent from "@/components/global/seller-dashboard-content-card-component";
import CustomImageInputComponent from "@/components/custom/image-input-component";
import CustomComboboxComponent from "@/components/custom/combobox-component";
import {
    CREATE_PRODUCT,
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCT_CONDITIONS,
    GET_PRODUCT_SHIPPING_METHODS,
} from "@/store/types/product-store-type";
import { GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
import CustomRichTextEditorComponent from "@/components/custom/rich-text-editor-component";
import CustomStockInputComponent from "@/components/custom/stock-input-component";
import { GLOBAL_SET_SNACKBAR_CONFIGS } from "@/store/types/global-store-type";

const defaultForm = {
    shopId: null,
    images: [],
    name: null,
    description: null,
    categoryId: null,
    price: null,
    stock: 1,
    conditionId: null,
    shippingMethodIds: [],
    keywords: [],
};

export default {
    components: {
        CustomStockInputComponent,
        CustomRichTextEditorComponent,
        CustomComboboxComponent,
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
            form: Object.assign({}, defaultForm),
            defaultForm,
            isCreateProductStart: false,
            isErrorAlertOpen: false,
            errorAlertMessage: null,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },

        isFormValid() {
            const {
                shopId,
                images,
                name,
                description,
                categoryId,
                price,
                stock,
                conditionId,
                shippingMethodIds,
            } = this.form;
            return (
                shopId &&
                images.length > 0 &&
                name &&
                description &&
                categoryId &&
                price &&
                stock > 0 &&
                conditionId &&
                shippingMethodIds.length > 0
            );
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

        async createProduct() {
            const payload = {
                shopId: this.form.shopId || null,
                images: this.form.images || [],
                name: this.form.name || null,
                description: this.form.description || null,
                categoryId: this.form.categoryId || null,
                price: this.form.price || null,
                stock: this.form.stock || null,
                conditionId: this.form.conditionId || null,
                shippingMethodIds: this.form.shippingMethodIds || [],
                keywords: this.form.keywords || [],
            };
            this.isCreateProductStart = true;
            const {
                success,
                success_message,
                error,
                error_message,
                data,
            } = await this.$store.dispatch(CREATE_PRODUCT, payload);
            if (error) {
                this.isErrorAlertOpen = true;
                this.errorAlertMessage = error_message;
                this.isCreateProductStart = false;
                return;
            }
            if (success) {
                this.isErrorAlertOpen = false;
                this.errorAlertMessage = null;
                this.isCreateShopStart = false;
                this.$store.commit(GLOBAL_SET_SNACKBAR_CONFIGS, {
                    isOpen: true,
                    text: success_message,
                    color: "success",
                });
                this.form = Object.assign({}, this.defaultForm);
                this.isCreateProductStart = false;
            }
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
