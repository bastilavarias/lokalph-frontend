<template>
    <v-app>
        <v-system-bar app color="secondary" dark :height="40">
            <v-container>
                <v-row justify="space-between" align="center">
                    <v-spacer></v-spacer>
                    <div v-if="isAuthenticated">
                        <v-menu offset-y open-on-hover>
                            <template v-slot:activator="{ on }">
                                <v-btn small text v-on="on">
                                    <span class="text-capitalize mr-1">{{
                                        user.profile.first_name
                                    }}</span>
                                    <v-icon small> mdi-chevron-down </v-icon>
                                </v-btn>
                            </template>
                            <v-list dense>
                                <v-list-item @click="logout">
                                    <v-list-item-icon>
                                        <v-icon small color="secondary">
                                            mdi-logout
                                        </v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title
                                            >Log out</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>
                    <div v-if="!isAuthenticated">
                        <v-btn small text class="text-capitalize"
                            >Register</v-btn
                        >
                        <v-btn
                            small
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
        <global-login-dialog-component></global-login-dialog-component>
    </v-app>
</template>

<script>
import { GLOBAL_SET_IS_LOGIN_DIALOG_OPEN } from "@/store/types/global-store-type";
import GlobalLoginDialogComponent from "@/components/global/login-dialog-component";
import { AUTHENTICATION_SET_LOGOUT } from "@/store/types/authentication-store-type";

export default {
    name: "customer-layout",

    components: { GlobalLoginDialogComponent },

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
