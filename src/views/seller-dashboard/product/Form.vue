<template>
    <seller-dashboard-form-card-component outlined>
        <template v-slot:title>Create a new Product</template>
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <custom-image-input-component
                        label="Images"
                        outlined
                        operation="create"
                    ></custom-image-input-component>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        outlined
                        label="Title"
                        :counter="100"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-textarea
                        outlined
                        label="Description"
                        :counter="400"
                    ></v-textarea>
                </v-col>
                <v-col cols="12">
                    <v-autocomplete outlined label="Category"></v-autocomplete>
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
export default {
    components: {
        CustomStocksInputComponent,
        CustomImageInputComponent,
        SellerDashboardFormCardComponent,
    },
};
</script>
