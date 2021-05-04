import productRepository from "@/repositories/product-repository";
import {
    CREATE_PRODUCT,
    CREATE_PRODUCT_INQUIRY,
    GET_PRODUCT_CATEGORIES,
    GET_PRODUCT_CONDITIONS,
    GET_SHOP_PRODUCT_DETAILS_BY_SLUG,
    GET_PRODUCT_SHIPPING_METHODS,
    GET_SHOP_PRODUCTS,
    GET_PRODUCT_INQUIRIES,
    CREATE_PRODUCT_INQUIRY_REPLY,
    GET_PRODUCT_INQUIRY_REPLY,
    CREATE_PRODUCT_VIEW,
    GET_PRODUCT_VIEWS,
    CREATE_PRODUCT_LIKE,
    GET_PRODUCT_LIKES,
    DELETE_PRODUCT_LIKE,
    SEARCH_PRODUCTS,
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

        async [CREATE_PRODUCT](
            _,
            {
                shopId,
                images,
                name,
                description,
                categoryId,
                price,
                stock,
                conditionId,
                shippingMethodIds,
                keywords,
            }
        ) {
            try {
                const formData = new FormData();
                formData.append("shop_id", shopId);
                formData.append("name", name);
                formData.append("description", description);
                formData.append("stock", stock);
                formData.append("price", price);
                formData.append("product_category_id", categoryId);
                formData.append("product_condition_id", conditionId);
                if (images.length > 0) {
                    images.map((image) => formData.append("images", image));
                }
                if (shippingMethodIds.length > 0) {
                    shippingMethodIds.map((id) =>
                        formData.append("shipping_method_ids[]", id)
                    );
                } else {
                    formData.append("shipping_method_ids", []);
                }
                if (keywords.length > 0) {
                    keywords.map((keyword) =>
                        formData.append("keywords[]", keyword)
                    );
                } else {
                    formData.append("keywords", []);
                }
                //    Will remove in future
                if (price) formData.append("sale_price", price);
                return await productRepository.createProduct(formData);
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_SHOP_PRODUCTS](_, { shopId, page, perPage, search }) {
            try {
                const payload = {
                    shopId,
                    page,
                    per_page: perPage,
                    search,
                };
                return await productRepository.getShopProducts(payload);
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_SHOP_PRODUCT_DETAILS_BY_SLUG](_, { shopId, slug }) {
            try {
                return await productRepository.getShopProductDetailsBySlug(
                    shopId,
                    slug
                );
            } catch (error) {
                return error.response.data;
            }
        },

        async [CREATE_PRODUCT_INQUIRY](_, { productId, message }) {
            try {
                const payload = {
                    product_id: productId,
                    message,
                };
                return await productRepository.createProductInquiry(payload);
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_PRODUCT_INQUIRIES](_, { productId, page, perPage }) {
            try {
                const payload = {
                    productId,
                    page,
                    per_page: perPage,
                };
                return await productRepository.getProductInquiries(payload);
            } catch (error) {
                return error.response.data;
            }
        },

        async [CREATE_PRODUCT_INQUIRY_REPLY](
            _,
            { productId, inquiryId, message }
        ) {
            try {
                const payload = {
                    product_inquiry_id: inquiryId,
                    product_id: productId,
                    message,
                };
                return await productRepository.createProductInquiryReply(
                    payload
                );
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_PRODUCT_INQUIRY_REPLY](_, inquiryId) {
            try {
                return await productRepository.getProductInquiryReply(
                    inquiryId
                );
            } catch (error) {
                return error.response.data;
            }
        },

        async [CREATE_PRODUCT_VIEW](_, productId) {
            try {
                const payload = {
                    product_id: productId,
                };
                return await productRepository.createProductView(payload);
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_PRODUCT_VIEWS](_, productId) {
            try {
                return await productRepository.getProductViews(productId);
            } catch (error) {
                return error.response.data;
            }
        },

        async [CREATE_PRODUCT_LIKE](_, productId) {
            try {
                const payload = {
                    product_id: productId,
                };
                return await productRepository.createProductLike(payload);
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_PRODUCT_LIKES](_, productId) {
            try {
                return await productRepository.getProductLikes(productId);
            } catch (error) {
                return error.response.data;
            }
        },

        async [DELETE_PRODUCT_LIKE](_, productId) {
            try {
                return await productRepository.deleteProductLike(productId);
            } catch (error) {
                return error.response.data;
            }
        },

        async [SEARCH_PRODUCTS](_, { search, page, perPage }) {
            try {
                const payload = {
                    search,
                    page,
                    per_page: perPage,
                };
                return await productRepository.searchProducts(payload);
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default productStoreModule;
