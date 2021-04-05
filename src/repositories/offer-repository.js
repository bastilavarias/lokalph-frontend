import axiosService from "@/services/axios-service";

const offerRepository = {
    async createOffer(payload) {
        const response = await axiosService.post("/offer", payload);
        return response.data;
    },

    async getShopOffers({ shopId, dateFrom, dateTo, page, perPage }) {
        const response = await axiosService.get(
            `/offer/shop/${shopId}/${dateFrom}/${dateTo}?page=${page}&per_page=${perPage}`
        );
        return response.data;
    },

    async cancelOffer(payload) {
        const response = await axiosService.put("/offer/cancel", payload);
        return response.data;
    },

    async acceptOffer(payload) {
        const response = await axiosService.put("/offer/accept", payload);
        return response.data;
    },

    async getAccountOffers({ accountId, page, perPage }) {
        const response = await axiosService.get(
            `/offer/account/${accountId}?page=${page}&per_page=${perPage}`
        );
        return response.data;
    },
};

export default offerRepository;
