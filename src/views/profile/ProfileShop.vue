<template>
    <v-card outlined>
        <v-card-title>
            <span class="font-weight-bold headline">Shops</span>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                depressed
                class="text-capitalize"
                @click="isCreateShopOpen = true"
                >Create Shop</v-btn
            >
        </v-card-title>
        <profile-shop-create-form-dialog-component
            :is-open.sync="isCreateShopOpen"
        ></profile-shop-create-form-dialog-component>
    </v-card>
</template>

<script>
import ProfileShopCreateFormDialogComponent from "@/components/views/profile/shop-create-form-dialog-component";
export default {
    components: { ProfileShopCreateFormDialogComponent },
    data() {
        return {
            isCreateShopOpen: false,
        };
    },
};
</script>
