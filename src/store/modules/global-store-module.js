import {
    GLOBAL_SET_IS_LOGIN_DIALOG_OPEN,
    GLOBAL_SET_IS_REGISTER_DIALOG_OPEN,
} from "@/store/types/global-store-type";

const globalStoreModule = {
    state: {
        isLoginDialogOpen: false,
        isRegisterDialogOpen: false,
    },

    mutations: {
        [GLOBAL_SET_IS_LOGIN_DIALOG_OPEN](state, isOpen) {
            state.isLoginDialogOpen = isOpen;
        },

        [GLOBAL_SET_IS_REGISTER_DIALOG_OPEN](state, isOpen) {
            state.isRegisterDialogOpen = isOpen;
        },
    },
};

export default globalStoreModule;
