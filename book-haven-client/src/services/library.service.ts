import { UserBookDetail } from "../types/UserBookDetail"
import { axiosWithAuth } from "../utils/customAxios"

const libraryService = {
    getUserLibrary: async (): Promise<UserBookDetail[]> => {
        const response = await axiosWithAuth.get("/library")
        const userBooks: UserBookDetail[] = response.data

        return userBooks
    },
    getLibraryByUserId: async (userId: number): Promise<UserBookDetail[]> => {
        const response = await axiosWithAuth.get(`/library/user/${userId}`)
        const userBooks: UserBookDetail[] = response.data

        return userBooks
    },
    addBookToUserLibrary: async (bookId: number): Promise<UserBookDetail> => {
        const response = await axiosWithAuth.post("/library", { bookId })
        const addedBook: UserBookDetail = response.data

        return addedBook
    },
    removeBookFromLibrary: async (bookId: number): Promise<boolean> => {
        const response = await axiosWithAuth.delete(`/library/${bookId}`)
        const success: boolean = response.data.success

        return success
    },
    updateBookInLibrary: async (bookId: number, hasRead: boolean, isFavourite: boolean) => {
        const response = await axiosWithAuth.put(`/library/${bookId}`, {
            hasRead,
            bookmarked: isFavourite,
        })
        const success: boolean = response.data.success

        return success
    },
}

export default libraryService
