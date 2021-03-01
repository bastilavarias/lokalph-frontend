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
                    <v-col cols="12">
                        <span class="subtitle-2">Shop Information</span>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Name" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-textarea
                            outlined
                            label="About the Shop"
                        ></v-textarea>
                    </v-col>
                    <v-col cols="12">
                        <span class="subtitle-2">Shop Contact</span>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field label="Address" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            label="Contact Number"
                            outlined
                            type="tel"
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
                        <v-btn color="primary" block depressed>
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
export default {
    name: "profile-shop-create-form-dialog-component",

    props: {
        isOpen: {
            type: Boolean,
            required: true,
        },
    },

    data() {
        return {
            isOpenLocal: this.isOpen,
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
};
</script>
