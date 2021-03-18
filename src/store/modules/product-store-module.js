import productRepository from "@/repositories/product-repository";
import { GET_PRODUCT_CATEGORIES } from "@/store/types/product-store-type";

const productStoreModule = {
    actions: {
        async [GET_PRODUCT_CATEGORIES]() {
            try {
                return await productRepository.getProductCategories();
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default productStoreModule;
