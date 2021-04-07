import transactionRepository from "@/repositories/transaction-repository";
import {
    GET_ACCOUNT_TRANSACTIONS,
    GET_SHOP_TRANSACTIONS,
} from "@/store/types/transaction-store-type";

const transactionStoreModule = {
    actions: {
        async [GET_SHOP_TRANSACTIONS](_, { shopId, page, perPage }) {
            try {
                return await transactionRepository.getShopTransactions({
                    shopId,
                    page,
                    perPage,
                });
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_ACCOUNT_TRANSACTIONS](_, { page, perPage }) {
            try {
                return await transactionRepository.getAccountTransactions(
                    page,
                    perPage
                );
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default transactionStoreModule;
