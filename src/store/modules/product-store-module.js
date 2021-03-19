import productRepository from "@/repositories/product-repository";
import {
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCT_CONDITIONS,
    GET_PRODUCT_SHIPPING_METHODS,
} from "@/store/types/product-store-type";

const productStoreModule = {
    actions: {
        async [GET_PRODUCT_CATEGORIES]() {
            try {
                return await productRepository.getProductCategories();
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_PRODUCT_CONDITIONS]() {
            try {
                return await productRepository.getProductConditions();
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_PRODUCT_SHIPPING_METHODS]() {
            try {
                return await productRepository.getProductShippingMethods();
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default productStoreModule;
