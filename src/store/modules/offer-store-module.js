import {
    ACCEPT_OFFER,
    CANCEL_OFFER,
    CREATE_OFFER,
    GET_ACCOUNT_OFFERS,
    GET_SHOP_OFFERS,
} from "@/store/types/offer-store-type";
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

        async [CANCEL_OFFER](_, { offerId, cancelledBy }) {
            try {
                const payload = {
                    offer_id: offerId,
                    cancelled_by: cancelledBy,
                };
                return await offerRepository.cancelOffer(payload);
            } catch (error) {
                return error.response.data;
            }
        },

        async [ACCEPT_OFFER](_, { offerId, date, time, address }) {
            try {
                const payload = {
                    offer_id: offerId,
                    date,
                    time,
                    address: {
                        value: address.value,
                        name: address.name,
                        county: address.county,
                        city: address.city,
                        suburb: address.suburb,
                        country: address.country,
                        country_code: address.countryCode,
                        type: address.type,
                        latitude: address.latlng.lat.toString(),
                        longitude: address.latlng.lng.toString(),
                        postcode: address.postcode,
                    },
                };
                return await offerRepository.acceptOffer(payload);
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_ACCOUNT_OFFERS](_, { page, perPage }) {
            try {
                return await offerRepository.getAccountOffers(page, perPage);
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default offerStoreModule;
