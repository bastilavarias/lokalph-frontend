<template>
    <v-card outlined>
        <v-card-title>
            <span>Shops</span>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                depressed
                v-if="isOwner && isCustomer"
                @click="isCreateFirstShopDialogOpen = true"
            >
                <span class="text-capitalize mr-1">Create</span>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
                color="primary"
                depressed
                :to="{ name: 'seller-dashboard-shop' }"
                class="text-capitalize"
                v-if="isOwner && isSeller"
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
                        <span class="font-italic">
                            {{
                                shops.length === 0 ? "No shops available." : ""
                            }}
                        </span>
                    </div>
                </template>
            </infinite-loading>
        </v-card-text>
        <profile-view-create-first-shop-form-dialog-component
            :is-open.sync="isCreateFirstShopDialogOpen"
        ></profile-view-create-first-shop-form-dialog-component>
    </v-card>
</template>

<script>
import { GET_ACCOUNT_DETAILS_BY_EMAIL } from "@/store/types/account-store-type";
import CustomLoadingSpinnerComponent from "@/components/custom/loading-spinner-component";
import { GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
import GlobalShopPreviewComponent from "@/components/global/shop-preview-component";
import ProfileViewCreateFirstShopFormDialogComponent from "@/components/views/profile/create-first-shop-form-dialog-component";
export default {
    components: {
        ProfileViewCreateFirstShopFormDialogComponent,
        GlobalShopPreviewComponent,
        CustomLoadingSpinnerComponent,
    },

    data() {
        return {
            isCreateShopOpen: false,
            account: null,
            isGetAccountDetailsStart: false,
            shops: [],
            scrollOptions: {
                page: 1,
                perPage: 5,
            },
            isCreateFirstShopDialogOpen: false,
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

        isCustomer() {
            return this.user.account_type.id === 1;
        },

        isSeller() {
            return this.user.account_type.id === 2;
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
                page: this.scrollOptions.page,
                perPage: this.scrollOptions.perPage,
                sort: "desc",
            };
            const { data } = await this.$store.dispatch(
                GET_ACCOUNT_SHOPS,
                payload
            );
            const shops = data.shops;
            if (shops.length === this.scrollOptions.perPage) {
                this.shops = [...this.shops, ...shops];
                $state.loaded();
                this.scrollOptions.page += 1;
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
