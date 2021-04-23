import axiosService from "@/services/axios-service";

const chatRepository = {
    async initiateChat(formData) {
        const response = await axiosService.post("/chat/room", formData);
        return response.data;
    },
};

export default chatRepository;
