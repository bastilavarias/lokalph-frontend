<template>
    <v-app>
        <v-system-bar app color="accent" dark :height="40">
            <v-container>
                <v-row justify="space-between" align="center">
                    <v-spacer></v-spacer>
                    <div v-if="isAuthenticated">
                        <v-btn
                            text
                            tile
                            :to="{ name: 'customer-dashboard-like' }"
                        >
                            <v-icon :size="20" color="white"
                                >mdi-heart-outline</v-icon
                            >
                        </v-btn>
                        <v-btn
                            text
                            tile
                            :to="{ name: 'customer-dashboard-chat' }"
                        >
                            <v-icon :size="20" color="white"
                                >mdi-message-outline</v-icon
                            >
                        </v-btn>
                        <v-menu offset-y open-on-hover>
                            <template v-slot:activator="{ on }">
                                <v-btn text v-on="on" tile>
                                    <v-avatar :size="25" class="mr-2">
                                        <v-img
                                            :src="user.profile.image_url"
                                        ></v-img>
                                    </v-avatar>
                                    <v-icon :size="20" color="white">
                                        mdi-chevron-down
                                    </v-icon>
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                    two-line
                                    :to="{
                                        name: 'profile-view',
                                        params: { email: user.email },
                                    }"
                                >
                                    <v-list-item-avatar>
                                        <v-img
                                            :src="user.profile.image_url"
                                        ></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{
                                                fullName.length >= 15
                                                    ? `${truncateString(
                                                          user.profile
                                                              .first_name,
                                                          12
                                                      )}`
                                                    : fullName
                                            }}
                                        </v-list-item-title>
                                        <v-list-item-subtitle
                                            >View Profile</v-list-item-subtitle
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-subheader>Actions</v-subheader>

                                <v-list-item
                                    :to="{
                                        name: 'seller-dashboard-view',
                                    }"
                                    v-if="isSeller"
                                >
                                    <v-list-item-icon>
                                        <v-icon color="secondary">
                                            mdi-view-dashboard-outline
                                        </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            class="font-weight-medium"
                                        >
                                            Dashboard</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                                <v-divider v-if="isSeller"></v-divider>
                                <v-list-item @click="logout">
                                    <v-list-item-icon>
                                        <v-icon color="secondary">
                                            mdi-logout
                                        </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            class="font-weight-medium"
                                            >Log out</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <div v-if="!isAuthenticated">
                        <v-btn
                            tile
                            text
                            class="text-capitalize"
                            @click="openRegisterDialog"
                            >Register</v-btn
                        >
                        <v-btn
                            tile
                            text
                            class="text-capitalize"
                            @click="openLoginDialog"
                            >Login</v-btn
                        >
                    </div>
                </v-row>
            </v-container>
        </v-system-bar>
        <v-app-bar app flat color="white" class="custom-toolbar">
            <v-container>
                <v-row justify="space-between" align="center">
                    <v-toolbar-title>
                        <router-link :to="{ name: 'home-view' }">
                            <v-img
                                :src="
                                    require('@/assets/images/navbar-logo.png')
                                "
                                width="150"
                            ></v-img>
                        </router-link>
                    </v-toolbar-title>

                    <v-spacer></v-spacer>
                    <v-text-field
                        hide-details
                        dense
                        single-line
                        label="Search for a Product"
                        rounded
                        filled
                        append-icon="mdi-magnify"
                    >
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        color="primary"
                        depressed
                        :to="{ name: 'customer-dashboard-offer' }"
                    >
                        <v-icon large>mdi-cart-outline</v-icon>
                    </v-btn>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-main>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-main>
        <global-login-dialog-component></global-login-dialog-component>
        <global-register-dialog-component></global-register-dialog-component>
        <global-snackbar></global-snackbar>
    </v-app>
</template>

<script>
import {
    GLOBAL_SET_IS_LOGIN_DIALOG_OPEN,
    GLOBAL_SET_IS_REGISTER_DIALOG_OPEN,
} from "@/store/types/global-store-type";
import GlobalLoginDialogComponent from "@/components/global/login-dialog-component";
import { AUTHENTICATION_SET_LOGOUT } from "@/store/types/authentication-store-type";
import GlobalRegisterDialogComponent from "@/components/global/register-dialog-component";
import GlobalSnackbar from "@/components/global/snackbar-component";
import commonUtility from "@/common/utility";

export default {
    name: "customer-layout",

    mixins: [commonUtility],

    components: {
        GlobalSnackbar,
        GlobalRegisterDialogComponent,
        GlobalLoginDialogComponent,
    },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

        user() {
            return this.$store.state.authentication.user;
        },

        isSeller() {
            return this.user && this.user.account_type.type === "seller";
        },

        fullName() {
            return `${this.user.profile.first_name} ${this.user.profile.last_name}`;
        },
    },

    methods: {
        openLoginDialog() {
            this.$store.commit(GLOBAL_SET_IS_LOGIN_DIALOG_OPEN, true);
        },

        openRegisterDialog() {
            this.$store.commit(GLOBAL_SET_IS_REGISTER_DIALOG_OPEN, true);
        },

        async logout() {
            this.$store.commit(AUTHENTICATION_SET_LOGOUT);
        },
    },
};
</script>

<style scoped>
.custom-toolbar {
    border-width: 0 0 thin !important;
    border-style: solid !important;
    border-color: rgba(0, 0, 0, 0.12) !important;
}
</style>
