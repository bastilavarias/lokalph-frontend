import axiosService from "@/services/axios-service";

const transactionRepository = {
    async getShopTransactions({ shopId, page, perPage }) {
        const response = await axiosService.get(
            `/transaction/shop/${shopId}?page=${page}&per_page=${perPage}`
        );
        return response.data;
    },
};

export default transactionRepository;
