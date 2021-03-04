import axiosService from "@/services/axios-service";

const accountRepository = {
    async getDetailsByEmail(email) {
        const response = await axiosService.get(`/account/email/${email}`);
        return response.data;
    },
};

export default accountRepository;
