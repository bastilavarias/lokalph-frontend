import axiosService from "@/services/axios-service";

const chatRepository = {
    async initiateChat(formData) {
        const response = await this.axios.post("/chat/room", formData);
        return response.data;
    },
};

export default chatRepository;
