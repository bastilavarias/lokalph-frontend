import axiosService from "@/services/axios-service";

const shopRepository = {
    async getProductCategories() {
        const response = await axiosService.get("/product/categories");
        return response.data;
    },

    async getProductConditions() {
        const response = await axiosService.get("/product/conditions");
        return response.data;
    },

    async getProductShippingMethods() {
        const response = await axiosService.get("/product/shipping-methods");
        return response.data;
    },

    async createProduct(formData) {
        const response = await axiosService.post("/product/", formData);
        return response.data;
    },
};

export default shopRepository;
