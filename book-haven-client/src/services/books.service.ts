import { Book } from "../types/Book"
import { BookReview } from "../types/BookReview"
import { axiosWithAuth, axiosWithoutAuth } from "../utils/customAxios"

const booksService = {
    getAllBooks: async (
        searchTerm?: string,
        genre?: string,
        startYear?: string,
        endYear?: string
    ): Promise<Book[]> => {
        const queryParams = []
        if (searchTerm && searchTerm.length > 0) {
            queryParams.push(`title=${searchTerm}`)
        }
        if (genre && genre !== "All") {
            queryParams.push(`genre=${genre}`)
        }
        if (startYear) {
            queryParams.push(`startYear=${startYear}`)
        }
        if (endYear) {
            queryParams.push(`endYear=${endYear}`)
        }

        let url = "/books"
        if (queryParams.length > 0) {
            url += "?" + queryParams.join("&")
        }

        const response = await axiosWithAuth.get(url)
        const books: Book[] = response.data

        return books
    },
    getBookDetailById: async (bookId: number): Promise<Book> => {
        const response = await axiosWithAuth.get(`/books/${bookId}`)
        const book: Book = response.data

        return book
    },
    addBookReview: async (
        bookId: number,
        rating: number,
        reviewText: string
    ): Promise<BookReview> => {
        const response = await axiosWithAuth.post(`/books/${bookId}/reviews`, {
            rating,
            reviewText,
        })
        const review: BookReview = response.data

        return review
    },
    getBookReviews: async (bookId: number): Promise<BookReview[]> => {
        const response = await axiosWithAuth.get(`/books/${bookId}/reviews`)
        const reviews: BookReview[] = response.data

        return reviews
    },
}

export default booksService
