import { GET_SHOP_OFFERS } from "@/store/types/offer-store-type";
import transactionRepository from "@/repositories/transaction-repository";

const transactionStoreModule = {
    actions: {
        async [GET_SHOP_OFFERS](_, { shopId, page, perPage }) {
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
