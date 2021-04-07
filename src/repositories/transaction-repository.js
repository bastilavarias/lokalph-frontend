import axiosService from "@/services/axios-service";

const transactionRepository = {
    async getShopTransactions({ shopId, page, perPage }) {
        const response = await axiosService.get(
            `/transaction/shop/${shopId}?page=${page}&per_page=${perPage}`
        );
        return response.data;
    },

    async getAccountTransactions(page, perPage) {
        const response = await axiosService.get(
            `/transaction/account?page=${page}&per_page=${perPage}`
        );
        return response.data;
    },

    async cancelTransaction(payload) {
        const response = await axiosService.put("/transaction/cancel", payload);
        return response.data;
    },
};

export default transactionRepository;
