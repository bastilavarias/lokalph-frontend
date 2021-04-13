import axiosService from "@/services/axios-service";

const reviewRepository = {
    async createReview(formData) {
        const result = await axiosService.post("/review", formData);
        return result.data;
    },

    async getProductReviews({ productId, page, perPage, search }) {
        const url = `/review/product/${productId}?page=${page}${
            perPage ? `&per_page=${perPage}` : ""
        }${search ? `&search=${search}` : ""}`;
        const result = await axiosService.get(url);
        return result.data;
    },
};

export default reviewRepository;
