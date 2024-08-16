import { axiosWithoutAuth } from "../utils/customAxios"

const authService = {
    login: async (email: string, password: string): Promise<string> => {
        const response = await axiosWithoutAuth.post("/users/login", { email, password })
        const tokenResponse = response.data

        return tokenResponse.token
    },
    register: async (
        firstName: string,
        email: string,
        password: string,
        lastName?: string
    ): Promise<string> => {
        const response = await axiosWithoutAuth.post("/users/register", {
            firstName,
            lastName,
            email,
            password,
        })
        const tokenResponse = response.data

        return tokenResponse.token
    },
}

export default authService
