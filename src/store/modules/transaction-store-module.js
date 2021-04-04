import transactionRepository from "@/repositories/transaction-repository";
import { GET_SHOP_TRANSACTIONS } from "@/store/types/transaction-store-type";

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
    },
};

export default transactionStoreModule;
