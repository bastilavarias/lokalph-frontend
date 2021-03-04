import { GET_ACCOUNT_DETAILS_BY_EMAIL } from "@/store/types/account-store-type";
import accountRepository from "@/repositories/account-repository";

const accountStoreModule = {
    actions: {
        async [GET_ACCOUNT_DETAILS_BY_EMAIL](_, email) {
            try {
                return await accountRepository.getDetailsByEmail(email);
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default accountStoreModule;
