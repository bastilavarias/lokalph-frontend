import {
    GLOBAL_SET_IS_LOGIN_DIALOG_OPEN,
    GLOBAL_SET_IS_REGISTER_DIALOG_OPEN,
    GLOBAL_SET_SNACKBAR_CONFIGS,
} from "@/store/types/global-store-type";

const globalStoreModule = {
    state: {
        isLoginDialogOpen: false,
        isRegisterDialogOpen: false,
        snackbarConfigs: null,
    },

    mutations: {
        [GLOBAL_SET_IS_LOGIN_DIALOG_OPEN](state, isOpen) {
            state.isLoginDialogOpen = isOpen;
        },

        [GLOBAL_SET_IS_REGISTER_DIALOG_OPEN](state, isOpen) {
            state.isRegisterDialogOpen = isOpen;
        },

        [GLOBAL_SET_SNACKBAR_CONFIGS](state, configs) {
            state.snackbarConfigs = configs;
        },
    },
};

export default globalStoreModule;
