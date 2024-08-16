import { createContext, useEffect, useState } from "react"
import { User } from "../types/User"
import useLocalStorage from "../hooks/useLocalStorage"
import usersService from "../services/users.service"
import { UserBookDetail } from "../types/UserBookDetail"

type AuthContextType = {
    user?: User
    accessToken?: string
    setUserAuthToken: (token?: string) => void
    setUser: (user: User) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>()
    const [accessToken, setAccessToken] = useLocalStorage<string | undefined>("token", undefined)
    const [userLibrary, setUserLibrary] = useState<UserBookDetail[]>([])

    useEffect(() => {
        if (accessToken && !user) {
            getAuthUser()
        }
    }, [accessToken, user])

    const getAuthUser = async () => {
        try {
            const response = await usersService.getCurrentUser()
            setUser(response)
        } catch (err) {
            console.error(err)
        }
    }

    const setUserAuthToken = (token?: string) => {
        if (token) {
            setAccessToken(token)
            getAuthUser()
        } else {
            setAccessToken(undefined)
            setUser(undefined)
            setUserLibrary([])
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                setUserAuthToken,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
