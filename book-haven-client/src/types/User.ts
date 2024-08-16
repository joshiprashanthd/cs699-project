export interface User {
    userId: number
    firstName: string
    lastName?: string
    email: string
    isAdmin: boolean
    dateJoined: number
    aboutMe?: string
}
