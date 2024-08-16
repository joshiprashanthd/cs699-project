import { Book } from "./Book"

export interface UserBookDetail {
    book: Book
    hasRead: boolean
    bookmarked: boolean
}
