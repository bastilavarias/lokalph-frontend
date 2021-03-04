<template>
    <v-dialog
        persistent
        width="480"
        transition="dialog-top-transition"
        v-model="isRegisterDialogOpenLocal"
    >
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-btn @click="isRegisterDialogOpenLocal = false" icon>
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-title class="font-weight-bold">
                Register to Lokal PH
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
                        <span class="subtitle-2">Information</span>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            outlined
                            label="First Name"
                            v-model="form.firstName"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field
                            outlined
                            label="Last Name"
                            v-model="form.lastName"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <custom-birthday-picker-component
                            outlined
                            label="Birth Date"
                            :birth-date.sync="form.birthDate"
                        ></custom-birthday-picker-component>
                    </v-col>
                    <v-col cols="12">
                        <span class="subtitle-2">Log in credentials</span>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            outlined
                            label="Email"
                            v-model="form.email"
                            type="email"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            outlined
                            label="Password"
                            type="password"
                            v-model="form.password"
                            @keyup.enter="register"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-btn
                            block
                            color="secondary"
                            depressed
                            class="text-capitalize"
                            large
                            :loading="isRegisterStart"
                            @click="register"
                            >Register</v-btn
                        >
                    </v-col>
                    <v-col cols="12"></v-col>
                    <v-col cols="12">
                        <v-divider></v-divider>
                    </v-col>
                    <v-col cols="12">
                        <div class="text-center">
                            <span class="body-2"
                                >Have an account?
                                <span
                                    class="primary--text font-weight-bold text-decoration-underline"
                                    @click="openLoginDialog"
                                    :style="{ cursor: 'pointer' }"
                                    >Log in now.</span
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
import {
    GLOBAL_SET_IS_LOGIN_DIALOG_OPEN,
    GLOBAL_SET_IS_REGISTER_DIALOG_OPEN,
} from "@/store/types/global-store-type";
import {
    AUTHENTICATION_LOGIN,
    AUTHENTICATION_REGISTER,
} from "@/store/types/authentication-store-type";
import CustomBirthdayPickerComponent from "@/components/custom/birthday-picker-component";

const defaultForm = {
    firstName: null,
    lastName: null,
    birthDate: null,
    email: null,
    password: null,
};

export default {
    name: "global-register-dialog-component",
    components: { CustomBirthdayPickerComponent },
    data() {
        return {
            isRegisterDialogOpenLocal: false,
            isRegisterStart: false,
            form: Object.assign({}, defaultForm),
            isErrorAlertOpen: false,
            errorAlertMessage: null,
        };
    },

    computed: {
        isRegisterDialogOpen() {
            return this.$store.state.global.isRegisterDialogOpen;
        },
    },

    watch: {
        isRegisterDialogOpen(isOpen) {
            this.isRegisterDialogOpenLocal = isOpen;
        },

        isRegisterDialogOpenLocal(isOpen) {
            this.$store.commit(GLOBAL_SET_IS_REGISTER_DIALOG_OPEN, isOpen);
        },
    },

    methods: {
        async register() {
            this.isRegisterStart = true;
            const payload = {
                firstName: this.form.firstName || null,
                lastName: this.form.lastName || null,
                birthDate: this.form.birthDate || null,
                email: this.form.email || null,
                password: this.form.password || null,
            };
            const {
                success,
                error,
                error_message,
            } = await this.$store.dispatch(AUTHENTICATION_REGISTER, payload);
            if (error) {
                this.isErrorAlertOpen = true;
                this.errorAlertMessage = error_message;
                this.isRegisterStart = false;
                return;
            }
            if (success) {
                this.isErrorAlertOpen = false;
                this.errorAlertMessage = null;
                this.isRegisterStart = false;
                this.$store.commit(GLOBAL_SET_IS_REGISTER_DIALOG_OPEN, false);
                this.form = Object.assign({}, defaultForm);
            }
        },

        openLoginDialog() {
            this.$store.commit(GLOBAL_SET_IS_REGISTER_DIALOG_OPEN, false);
            this.$store.commit(GLOBAL_SET_IS_LOGIN_DIALOG_OPEN, true);
        },
    },
};
</script>
