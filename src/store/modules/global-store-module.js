import { GLOBAL_SET_IS_LOGIN_DIALOG_OPEN } from "@/store/types/global-store-type";

const globalStoreModule = {
    state: {
        isLoginDialogOpen: false,
    },

    mutations: {
        [GLOBAL_SET_IS_LOGIN_DIALOG_OPEN](state, isOpen) {
            state.isLoginDialogOpen = isOpen;
        },
    },
};

export default globalStoreModule;
