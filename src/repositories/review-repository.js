import axiosService from "@/services/axios-service";

const reviewRepository = {
    async createReview(formData) {
        const result = await axiosService.post("/review", formData);
        return result.data;
    },
};

export default reviewRepository;
