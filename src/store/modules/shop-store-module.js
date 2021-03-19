import { SHOP_CREATE, GET_ACCOUNT_SHOPS } from "@/store/types/shop-store-type";
import shopRepository from "@/repositories/shop-repository";

const shopStoreModule = {
    actions: {
        async [SHOP_CREATE](
            _,
            {
                name,
                introduction,
                address,
                contactNumber,
                publishableKey,
                secretKey,
            }
        ) {
            try {
                const payload = {
                    name: name.toString(),
                    introduction: introduction.toString(),
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
                    contact_number: contactNumber.toString(),
                    publishable_key: publishableKey,
                    secret_key: secretKey,
                };
                return await shopRepository.createShop(payload);
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_ACCOUNT_SHOPS](_, { accountId, page, perPage, search }) {
            try {
                const payload = {
                    accountId,
                    page,
                    per_page: perPage,
                    search,
                };
                return await shopRepository.getAccountShops(payload);
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default shopStoreModule;
