import axiosService from "@/services/axios-service";

const shopRepository = {
    async createShop(payload) {
        const response = await axiosService.post("/shop", payload);
        return response.data;
    },

    async getAccountShops({ accountId, page, per_page }) {
        const url = `/shop/account/${accountId}?page=${page}${
            per_page ? `&per_page=${per_page}` : ""
        }`;
        const response = await axiosService.get(url);
        return response.data;
    },
};

export default shopRepository;
