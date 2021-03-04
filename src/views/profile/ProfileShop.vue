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
                v-if="isOwner"
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
import { GET_ACCOUNT_DETAILS_BY_EMAIL } from "@/store/types/account-store-type";
export default {
    components: { ProfileShopCreateFormDialogComponent },

    data() {
        return {
            isCreateShopOpen: false,
            account: null,
            isGetAccountDetailsStart: false,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },

        isOwner() {
            if (!this.user) return false;
            if (!this.account) return false;
            return this.account.id === this.user.id;
        },
    },

    methods: {
        async getAccountDetails() {
            const email = this.$route.params.email || null;
            if (!email) return this.$router.go(-1);
            this.isGetAccountDetailsStart = true;
            const { success, data, error } = await this.$store.dispatch(
                GET_ACCOUNT_DETAILS_BY_EMAIL,
                email
            );
            this.isGetAccountDetailsStart = false;
            if (error) return this.$router.go(-1);
            if (success) {
                this.account = Object.assign({}, data);
            }
        },
    },

    async created() {
        await this.getAccountDetails();
    },
};
</script>
