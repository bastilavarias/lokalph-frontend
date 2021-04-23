import { INITIATE_CHAT } from "@/store/types/chat-store-type";
import chatRepository from "@/repositories/chat-repository";

const chatStoreModule = {
    actions: {
        async [INITIATE_CHAT](
            _,
            { shopId, accountId, message, productId, image }
        ) {
            try {
                const formData = new FormData();
                formData.append("message", message);
                formData.append("shop_id", shopId);
                formData.append("account_id", accountId);
                formData.append("product_id", productId);
                formData.append("is_sent_by", "customer");
                if (image) formData.append("image", image);
                return await chatRepository.initiateChat(formData);
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default chatStoreModule;
