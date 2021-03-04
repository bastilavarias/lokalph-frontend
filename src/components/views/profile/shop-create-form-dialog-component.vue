<template>
    <v-dialog width="480" persistent v-model="isOpenLocal">
        <v-card>
            <v-card-title>
                <span>Create a new Shop</span>
                <v-spacer></v-spacer>
                <v-btn icon @click="isOpenLocal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-subtitle>Lorem ipsum dolor sit amet.</v-card-subtitle>
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
                        ></v-text-field>
                        <v-text-field
                            label="Secret Key"
                            outlined
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            color="primary"
                            block
                            depressed
                            @click="createShop"
                            :loading="isCreateShopStart"
                        >
                            <span class="text-capitalize mr-2"
                                >Create Shop</span
                            >
                            <v-icon>mdi-storefront</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import CustomPlacesComponent from "@/components/custom/places-component";
import { SHOP_CREATE } from "@/store/types/shop-store-type";

const defaultForm = {
    name: null,
    introduction: null,
    address: null,
    contactNumber: null,
};

export default {
    name: "profile-shop-create-form-dialog-component",
    components: { CustomPlacesComponent },
    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
            form: Object.assign({}, defaultForm),
            defaultForm,
            isCreateShopStart: false,
            isErrorAlertOpen: false,
            errorAlertMessage: null,
        };
    },

    watch: {
        isOpen(value) {
            this.isOpenLocal = value;
        },

        isOpenLocal(value) {
            this.$emit("update:isOpen", value);
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
            };
            const {
                success,
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
                console.log(data);
                this.isOpenLocal = false;
                this.isCreateShopStart = false;
            }
        },
    },
};
</script>
