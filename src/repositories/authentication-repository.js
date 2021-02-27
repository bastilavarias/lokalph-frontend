import axiosService from "@/services/axios-service";

const authenticationRepository = {
    async login(email, password) {
        const response = await axiosService.post("/authentication/log-in", {
            email,
            password,
        });
        return response.data;
    },

    async validateUser() {
        const response = await axiosService.get(
            "/authentication/validate-user"
        );
        return response.data;
    },

    async register({ firstName, lastName, birthDate, password, email }) {
        const payload = {
            first_name: firstName,
            last_name: lastName,
            birth_date: birthDate,
            password,
            email,
        };
        const response = await axiosService.post(
            "/authentication/register",
            payload
        );
        return response.data;
    },
};

export default authenticationRepository;
