import { Box, Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import { useSearchParams } from "react-router-dom"
import { Filter } from "../components/Filter/Filter"
import { BookCard } from "../components/BookCard/BookCard"
import { useEffect, useState } from "react"
import { Book } from "../types/Book"
import booksService from "../services/books.service"

export const Search = () => {
    const [searchParams] = useSearchParams()
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()

    const searchTerm = searchParams.get("q") ?? undefined
    const genre = searchParams.get("genre") ?? undefined
    const startYear = searchParams.get("startYear") ?? undefined
    const endYear = searchParams.get("endYear") ?? undefined

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await booksService.getAllBooks(
                    searchTerm,
                    genre,
                    startYear,
                    endYear
                )
                setFilteredBooks(fetchedBooks)
            } catch (err) {
                setError("Uh Oh! Could not fetch books right now. Please Try again...")
            } finally {
                setLoading(false)
            }
        }

        fetchBooks()
    }, [searchTerm, genre, startYear, endYear])

    return (
        <Flex as="section" w="full">
            <Flex align="start" gap={8}>
                <Filter />
                <Flex flex="1">
                    <Box>
                        <Heading size="lg" mb={8}>
                            Search Results for: {searchTerm}
                        </Heading>
                        <SimpleGrid columns={3} gap={4} marginLeft={"20px"}>
                            {filteredBooks.map((book) => {
                                return <BookCard key={book.bookId} book={book} />
                            })}
                        </SimpleGrid>
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
}
