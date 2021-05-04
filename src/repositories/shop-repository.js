import axiosService from "@/services/axios-service";

const shopRepository = {
    async createShop(payload) {
        const response = await axiosService.post("/shop", payload);
        return response.data;
    },

    async getAccountShops({ accountId, page, per_page, search }) {
        const url = `/shop/account/${accountId}?page=${page}${
            per_page ? `&per_page=${per_page}` : ""
        }${search ? `&search=${search}` : ""}`;
        const response = await axiosService.get(url);
        return response.data;
    },

    async getShopDetailsBySlug(slug) {
        const response = await axiosService.get(`/shop/slug/${slug}`);
        return response.data;
    },

    async searchShops({ page, per_page, search }) {
        const url = `/shop/search?page=${page}${
            per_page ? `&per_page=${per_page}` : ""
        }${search ? `&search=${axiosService.joinQuerySpace(search)}` : ""}`;
        const response = await axiosService.get(url);
        return response.data;
    },
};

export default shopRepository;
