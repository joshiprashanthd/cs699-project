import { Box, Container, Heading, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { BookCard } from "../components/BookCard/BookCard"
import { useEffect, useState } from "react"
import { Book } from "../types/Book"
import booksService from "../services/books.service"
import useAuth from "../hooks/useAuth"
import { UserBookDetail } from "../types/UserBookDetail"
import libraryService from "../services/library.service"

export const Home = () => {
    const auth = useAuth()
    const [books, setBooks] = useState<Book[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>()
    const [userLibrary, setUserLibrary] = useState<UserBookDetail[]>([])
    const [isLibraryLoading, setIsLibraryLoading] = useState<boolean>(false)

    const fetchUserLibrary = async () => {
        const userId = auth?.user?.userId
        setIsLibraryLoading(true)
        if (userId) {
            try {
                const library = await libraryService.getLibraryByUserId(userId)
                setUserLibrary(library)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLibraryLoading(false)
            }
        }
    }

    const fetchBooks = async () => {
        try {
            const fetchedBooks = await booksService.getAllBooks()
            setBooks(fetchedBooks)
        } catch (err) {
            setError("Uh Oh! Could not fetch books right now. Please Try again...")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
        if (auth?.user) {
            fetchUserLibrary()
        }
    }, [auth?.user])

    return (
        <Box as="main" w="full">
            {auth?.user && (
                <Box marginBottom={10}>
                    <Heading size="xl" mb={8} fontWeight="extrabold" letterSpacing="tight">
                        My Favourite Books
                    </Heading>
                    {isLibraryLoading && (
                        <Container centerContent>
                            <Spinner size="xl" />
                        </Container>
                    )}
                    {!isLibraryLoading && (
                        <>
                            {userLibrary.filter((bh) => bh.bookmarked === true).length === 0 && (
                                <Text>
                                    No Favorites Yet! Head on over to any Book Detail to add your
                                    favorite books
                                </Text>
                            )}
                            <SimpleGrid columns={4} gap={4} marginLeft={"20px"}>
                                {userLibrary
                                    .filter((bh) => bh.bookmarked === true)
                                    .map((bh) => {
                                        return <BookCard key={bh.book.bookId} book={bh.book} />
                                    })}
                            </SimpleGrid>
                        </>
                    )}
                </Box>
            )}
            <Heading size="xl" mb={8} fontWeight="extrabold" letterSpacing="tight">
                Top Rated Books
            </Heading>
            {loading && (
                <Container centerContent>
                    <Spinner size="xl" />
                </Container>
            )}
            {!loading && error && <Text>{error}</Text>}
            {!loading && !error && (
                <SimpleGrid columns={4} gap={4} marginLeft={"20px"}>
                    {books.map((book) => {
                        return <BookCard key={book.bookId} book={book} />
                    })}
                </SimpleGrid>
            )}
        </Box>
    )
}
