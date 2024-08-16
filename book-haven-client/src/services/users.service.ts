import { User } from "../types/User"
import { axiosWithAuth } from "../utils/customAxios"

const usersService = {
    getCurrentUser: async (): Promise<User> => {
        const response = await axiosWithAuth.get("users/currentUser")
        const currentUser: User = response.data

        return currentUser
    },
    getUserById: async (userId: number): Promise<User> => {
        const response = await axiosWithAuth.get(`users/${userId}`)
        const user: User = response.data

        return user
    },
    updateUser: async (
        userId: number,
        firstName: string,
        lastName: string,
        aboutMe: string
    ): Promise<User> => {
        const response = await axiosWithAuth.put(`users/${userId}`, {
            firstName,
            lastName,
            aboutMe,
        })
        const user: User = response.data

        return user
    },
}

export default usersService
