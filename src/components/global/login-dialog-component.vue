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
                    <v-col cols="12" v-if="isErrorAlertOpen">
                        <v-alert type="error">
                            {{ errorAlertMessage }}
                        </v-alert>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            outlined
                            label="Email"
                            v-model="form.email"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            outlined
                            label="Password"
                            type="password"
                            v-model="form.password"
                            @keyup.enter="login"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            block
                            color="secondary"
                            depressed
                            class="text-capitalize"
                            large
                            :loading="isLoginStart"
                            @click="login"
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
import { AUTHENTICATION_LOGIN } from "@/store/types/authentication-store-type";

const defaultForm = {
    email: null,
    password: null,
};

export default {
    name: "global-login-dialog-component",

    data() {
        return {
            isLoginDialogOpenLocal: false,
            isLoginStart: false,
            form: Object.assign({}, defaultForm),
            isErrorAlertOpen: false,
            errorAlertMessage: null,
        };
    },

    computed: {
        isLoginDialogOpen() {
            return this.$store.state.global.isLoginDialogOpen;
        },
    },

    watch: {
        isLoginDialogOpen(isOpen) {
            this.isLoginDialogOpenLocal = isOpen;
        },

        isLoginDialogOpenLocal(isOpen) {
            this.$store.commit(GLOBAL_SET_IS_LOGIN_DIALOG_OPEN, isOpen);
        },
    },

    methods: {
        async login() {
            this.isLoginStart = true;
            const payload = {
                email: this.form.email,
                password: this.form.password,
            };
            const {
                success,
                error,
                error_message,
            } = await this.$store.dispatch(AUTHENTICATION_LOGIN, payload);
            if (error) {
                this.isErrorAlertOpen = true;
                this.errorAlertMessage = error_message;
                this.isLoginStart = false;
                return;
            }
            if (success) {
                this.isErrorAlertOpen = false;
                this.errorAlertMessage = null;
                this.isLoginStart = false;
                this.$store.commit(GLOBAL_SET_IS_LOGIN_DIALOG_OPEN, false);
                this.form = Object.assign({}, defaultForm);
            }
        },
    },
};
</script>
