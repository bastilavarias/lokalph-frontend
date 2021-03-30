import { CREATE_OFFER, GET_SHOP_OFFERS } from "@/store/types/offer-store-type";
import offerRepository from "@/repositories/offer-repository";

const offerStoreModule = {
    actions: {
        async [CREATE_OFFER](
            _,
            { shopId, productId, quantity, totalPrice, note, shippingMethodId }
        ) {
            try {
                const payload = {
                    shop_id: shopId,
                    product_id: productId,
                    total_price: totalPrice,
                    quantity,
                    note,
                    shipping_method_id: shippingMethodId,
                };
                return await offerRepository.createOffer(payload);
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_SHOP_OFFERS](
            _,
            { shopId, dateFrom, dateTo, page, perPage }
        ) {
            try {
                return await offerRepository.getShopOffers({
                    shopId,
                    dateFrom,
                    dateTo,
                    page,
                    perPage,
                });
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default offerStoreModule;
