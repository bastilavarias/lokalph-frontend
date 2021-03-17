<template>
    <seller-dashboard-form-card-component outlined>
        <template v-slot:title>Create a new Product</template>
        <v-card-text>
            <v-row dense>
                <v-col cols="12">
                    <custom-image-input-component
                        label="Images"
                        outlined
                    ></custom-image-input-component>
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
export default {
    components: { CustomImageInputComponent, SellerDashboardFormCardComponent },
};
</script>
