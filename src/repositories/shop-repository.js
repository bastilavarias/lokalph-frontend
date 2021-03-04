import axiosService from "@/services/axios-service";

const shopRepository = {
    async createShop(payload) {
        const response = await axiosService.post("/shop", payload);
        return response.data;
    },
};

export default shopRepository;
