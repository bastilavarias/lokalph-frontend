import {
    AUTHENTICATION_LOGIN,
    AUTHENTICATION_SET_AUTHENTICATION,
} from "@/store/types/authentication-store-type";
import authenticationRepository from "@/repositories/authentication-repository";
import cookieService from "@/services/cookie-service";
import axiosService from "@/services/axios-service";

const authenticationStoreModule = {
    state: {
        isAuthenticated: false,
        user: null,
    },

    mutations: {
        [AUTHENTICATION_SET_AUTHENTICATION](state, { accessToken, user }) {
            state.user = user;
            state.isAuthenticated = true;
            cookieService.save("access_token", accessToken);
            axiosService.setHeader();
        },
    },

    actions: {
        async [AUTHENTICATION_LOGIN]({ commit }, { email, password }) {
            try {
                const result = await authenticationRepository.login(
                    email,
                    password
                );
                const payload = {
                    accessToken: result.data.token,
                    user: result.data.user,
                };
                commit(AUTHENTICATION_SET_AUTHENTICATION, payload);
                return result;
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default authenticationStoreModule;
