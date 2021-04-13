import {
    CREATE_REVIEW,
    GET_PRODUCT_REVIEWS,
} from "@/store/types/review-store-type";
import reviewRepository from "@/repositories/review-repository";

const reviewStoreModule = {
    actions: {
        async [CREATE_REVIEW](
            _,
            {
                images,
                productReview,
                productRating,
                shopReview,
                shopRating,
                transactionId,
            }
        ) {
            try {
                const formData = new FormData();
                formData.append("transaction_id", transactionId);
                formData.append("product_review", productReview);
                formData.append("product_rating", productRating);
                formData.append("shop_review", shopReview);
                formData.append("shop_rating", shopRating);
                if (images.length > 0) {
                    images.map((image) => formData.append("images", image));
                }
                return await reviewRepository.createReview(formData);
            } catch (error) {
                return error.response.data;
            }
        },

        async [GET_PRODUCT_REVIEWS](_, { productId, page, perPage, search }) {
            try {
                const payload = {
                    productId,
                    page,
                    perPage,
                    search,
                };
                return await reviewRepository.getProductReviews(payload);
            } catch (error) {
                return error.response.data;
            }
        },
    },
};

export default reviewStoreModule;
