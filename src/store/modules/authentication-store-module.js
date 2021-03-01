import {
    AUTHENTICATION_LOGIN,
    AUTHENTICATION_REGISTER,
    AUTHENTICATION_SET_AUTHENTICATION,
    AUTHENTICATION_SET_LOGOUT,
    AUTHENTICATION_VALIDATE_USER,
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

        [AUTHENTICATION_SET_LOGOUT](state) {
            state.isAuthenticated = false;
            state.user = null;
            cookieService.remove("access_token");
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
                    accessToken: result.data.access_token,
                    user: result.data.user,
                };
                commit(AUTHENTICATION_SET_AUTHENTICATION, payload);
                return result;
            } catch (error) {
                return error.response.data;
            }
        },

        async [AUTHENTICATION_VALIDATE_USER]({ commit }) {
            const accessToken = cookieService.get("access_token");
            if (!accessToken) return commit(AUTHENTICATION_SET_LOGOUT);
            try {
                axiosService.setHeader();
                const result = await authenticationRepository.validateUser();
                const payload = {
                    accessToken: result.data.access_token,
                    user: result.data.user,
                };
                commit(AUTHENTICATION_SET_AUTHENTICATION, payload);
            } catch (_) {
                commit(AUTHENTICATION_SET_LOGOUT);
            }
        },

        async [AUTHENTICATION_REGISTER](
            { commit },
            { firstName, lastName, birthDate, password, email }
        ) {
            try {
                const result = await authenticationRepository.register({
                    firstName,
                    lastName,
                    birthDate,
                    password,
                    email,
                });
                const payload = {
                    accessToken: result.data.access_token,
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
