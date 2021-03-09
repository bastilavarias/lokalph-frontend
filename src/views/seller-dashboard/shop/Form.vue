<template>
    <seller-dashboard-form-card-component outlined>
        <template v-slot:title>Create a new Shop</template>
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
                    <v-text-field
                        label="Name"
                        outlined
                        v-model="form.name"
                        autofocus
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        outlined
                        label="About the Shop"
                        v-model="form.introduction"
                    ></v-textarea>
                </v-col>
                <v-col cols="12">
                    <span class="subtitle-2">Shop Contact</span>
                </v-col>
                <v-col cols="12">
                    <custom-places-component
                        outlined
                        label="Address"
                        :place.sync="form.address"
                    ></custom-places-component>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Contact Number"
                        outlined
                        type="tel"
                        v-model="form.contactNumber"
                    ></v-text-field>
                </v-col>
                <template v-if="!doesUserHasStripe">
                    <v-col cols="12">
                        <div class="d-flex justify-space-between align-center">
                            <span class="subtitle-2">Stripe Details</span>
                            <v-spacer></v-spacer>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn small icon v-bind="attrs" v-on="on">
                                        <v-icon>mdi-information-variant</v-icon>
                                    </v-btn>
                                </template>
                                <span
                                    >Read why we need your Stripe Details</span
                                >
                            </v-tooltip>
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            label="Publishable Key"
                            outlined
                            v-model="form.publishableKey"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            label="Secret Key"
                            outlined
                            v-model="form.secretKey"
                        ></v-text-field>
                    </v-col>
                </template>
                <v-col cols="12">
                    <v-btn
                        color="primary"
                        block
                        depressed
                        @click="createShop"
                        :loading="isCreateShopStart"
                    >
                        <span class="text-capitalize mr-2">Create Shop</span>
                        <v-icon>mdi-storefront</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-text>
    </seller-dashboard-form-card-component>
</template>

<script>
import CustomPlacesComponent from "@/components/custom/places-component";
import { SHOP_CREATE } from "@/store/types/shop-store-type";
import { GLOBAL_SET_SNACKBAR_CONFIGS } from "@/store/types/global-store-type";
import SellerDashboardFormCardComponent from "@/components/global/seller-dashboard-content-card-component";

const defaultForm = {
    name: null,
    introduction: null,
    address: null,
    contactNumber: null,
    publishableKey: null,
    secretKey: null,
};

export default {
    components: {
        SellerDashboardFormCardComponent,
        CustomPlacesComponent,
    },

    data() {
        return {
            form: Object.assign({}, defaultForm),
            defaultForm,
            isCreateShopStart: false,
            isErrorAlertOpen: false,
            errorAlertMessage: null,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },

        doesUserHasStripe() {
            return this.user.stripe;
        },
    },

    methods: {
        async createShop() {
            this.isCreateShopStart = true;
            const payload = {
                name: this.form.name || null,
                introduction: this.form.introduction || null,
                address: this.form.address || null,
                contactNumber: this.form.contactNumber || null,
                publishableKey: this.form.publishableKey || null,
                secretKey: this.form.secretKey || null,
            };
            const {
                success,
                success_message,
                data,
                error,
                error_message,
            } = await this.$store.dispatch(SHOP_CREATE, payload);
            if (error) {
                this.isErrorAlertOpen = true;
                this.errorAlertMessage = error_message;
                this.isCreateShopStart = false;
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
                await this.$router.go(-1);
            }
        },
    },
};
</script>
