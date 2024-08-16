export interface Book {
    bookId: number
    title: string
    subtitle?: string
    genre: string
    authors: string
    description: string
    publishedYear: number
    numPages: number
    imageUrl: string
    averageRating: number
    ratingsCount: number
}
