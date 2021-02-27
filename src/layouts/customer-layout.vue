<template>
    <v-app>
        <v-system-bar app color="secondary" dark :height="40">
            <v-container>
                <v-row justify="space-between" align="center">
                    <v-spacer></v-spacer>
                    <div>
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

export default {
    name: "customer-layout",
    components: { GlobalLoginDialogComponent },
    methods: {
        openLoginDialog() {
            this.$store.commit(GLOBAL_SET_IS_LOGIN_DIALOG_OPEN, true);
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
