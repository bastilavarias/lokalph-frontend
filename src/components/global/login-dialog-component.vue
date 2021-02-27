<template>
    <v-dialog
        persistent
        width="480"
        transition="dialog-top-transition"
        v-model="isLoginDialogOpenLocal"
    >
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-btn @click="isLoginDialogOpenLocal = false" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-title class="font-weight-bold">
                Log in to Lokal PH
            </v-card-title>
            <v-card-subtitle>Lorem ipsum dolor sit amet.</v-card-subtitle>
            <v-card-text>
                <v-row dense>
                    <v-col cols="12">
                        <v-text-field outlined label="Email"></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            outlined
                            label="Password"
                            type="password"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            block
                            color="secondary"
                            depressed
                            class="text-capitalize"
                            large
                            >Login</v-btn
                        >
                    </v-col>
                    <v-col cols="12"></v-col>
                    <v-col cols="12">
                        <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12">
                        <div class="text-center">
                            <span class="body-2"
                                >Don't have an account?
                                <span
                                    class="primary--text font-weight-bold text-decoration-underline"
                                    >Register here.</span
                                ></span
                            >
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { GLOBAL_SET_IS_LOGIN_DIALOG_OPEN } from "@/store/types/global-store-type";

export default {
    name: "global-login-dialog-component",

    data() {
        return {
            isLoginDialogOpenLocal: false,
        };
    },

    computed: {
        isLoginDialogOpen() {
            return this.$store.state.global.isLoginDialogOpen;
        },
    },

    watch: {
        isLoginDialogOpen(isOpen) {
            console.log(isOpen);
            this.isLoginDialogOpenLocal = isOpen;
        },

        isLoginDialogOpenLocal(isOpen) {
            this.$store.commit(GLOBAL_SET_IS_LOGIN_DIALOG_OPEN, isOpen);
        },
    },
};
</script>
