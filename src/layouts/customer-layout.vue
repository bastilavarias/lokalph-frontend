<template>
    <v-app>
        <v-system-bar app color="secondary" dark :height="40">
            <v-container>
                <v-row justify="space-between" align="center">
                    <v-spacer></v-spacer>
                    <div v-if="isAuthenticated">
                        <v-btn text tile>
                            <v-icon :size="20" color="white"
                                >mdi-heart-outline</v-icon
                            >
                        </v-btn>
                        <v-btn text tile>
                            <v-icon :size="20" color="white"
                                >mdi-message-outline</v-icon
                            >
                        </v-btn>
                        <v-menu offset-y open-on-hover>
                            <template v-slot:activator="{ on }">
                                <v-btn text v-on="on" tile>
                                    <v-avatar :size="25">
                                        <v-img
                                            :src="user.profile.image_url"
                                        ></v-img>
                                    </v-avatar>
                                    <span class="text-capitalize mr-1">{{
                                        user.profile.first_name
                                    }}</span>
                                    <v-icon :size="20" color="white">
                                        mdi-chevron-down
                                    </v-icon>
                                </v-btn>
                            </template>
                            <v-list>
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
                    <v-spacer></v-spacer>
                    <v-text-field
                        hide-details
                        dense
                        single-line
                        label="Search for a Product"
                        outlined
                        filled
                        append-icon="mdi-magnify"
                    >
                    </v-text-field>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" depressed>
                        <v-icon>mdi-cart</v-icon>
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

export default {
    name: "customer-layout",

    components: { GlobalRegisterDialogComponent, GlobalLoginDialogComponent },

    computed: {
        isAuthenticated() {
            return this.$store.state.authentication.isAuthenticated;
        },

        user() {
            return this.$store.state.authentication.user;
        },
    },

    methods: {
        openLoginDialog() {
            this.$store.commit(GLOBAL_SET_IS_LOGIN_DIALOG_OPEN, true);
        },

        openRegisterDialog() {
            this.$store.commit(GLOBAL_SET_IS_REGISTER_DIALOG_OPEN, true);
        },

        logout() {
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
