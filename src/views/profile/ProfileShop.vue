<template>
    <v-card outlined>
        <v-card-title>
            <span>Shops</span>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                depressed
                :to="{ name: 'seller-dashboard-shop' }"
                class="text-capitalize"
                v-if="isOwner"
                >Manage
            </v-btn>
        </v-card-title>
        <v-card-text>
            <v-row dense>
                <template v-for="(shop, index) in shops">
                    <v-col :key="index" cols="12" md="6">
                        <global-shop-preview-component
                            :image-url="shop.image_url"
                            :name="shop.name"
                            :introduction="shop.introduction"
                            :created-at="shop.created_at"
                            :address="shop.address.value"
                            :contact-number="shop.contact_number"
                            :store-owner="shop.account"
                        ></global-shop-preview-component>
                    </v-col>
                </template>
            </v-row>
            <infinite-loading @infinite="getShops" v-if="this.account">
                <template v-slot:spinner>
                    <custom-loading-spinner-component></custom-loading-spinner-component>
                </template>
                <template v-slot:no-more>
                    <span></span>
                </template>
                <template v-slot:no-results>
                    <div class="text-center py-5">
                        <span class="font-italic">No shops available.</span>
                    </div>
                </template>
            </infinite-loading>
        </v-card-text>
        <profile-shop-create-form-dialog-component
            :is-open.sync="isCreateShopOpen"
        ></profile-shop-create-form-dialog-component>
    </v-card>
</template>

<script>
import ProfileShopCreateFormDialogComponent from "@/components/views/profile/shop-create-form-dialog-component";
import { GET_ACCOUNT_DETAILS_BY_EMAIL } from "@/store/types/account-store-type";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";
import { GET_SHOP_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
import GlobalShopPreviewComponent from "@/components/global/shop-preview-component";
export default {
    components: {
        GlobalShopPreviewComponent,
        CustomLoadingSpinnerComponent,
        ProfileShopCreateFormDialogComponent,
    },

    data() {
        return {
            isCreateShopOpen: false,
            account: null,
            isGetAccountDetailsStart: false,
            shops: [],
            page: 1,
            perPage: 5,
        };
    },

    computed: {
        user() {
            return this.$store.state.authentication.user;
        },

        isOwner() {
            return (
                this.user && this.account && this.user.id === this.account.id
            );
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

        async getShops($state) {
            const payload = {
                accountId: this.account.id,
                page: this.page,
                perPage: this.perPage,
                sort: "desc",
            };
            const { data } = await this.$store.dispatch(
                GET_SHOP_ACCOUNT_SHOPS,
                payload
            );
            const shops = data.shops;
            if (shops.length === this.perPage) {
                this.shops = [...this.shops, ...shops];
                $state.loaded();
                this.page += 1;
                return;
            }
            this.shops = [...this.shops, ...shops];
            $state.complete();
        },
    },

    async created() {
        await this.getAccountDetails();
    },
};
</script>
