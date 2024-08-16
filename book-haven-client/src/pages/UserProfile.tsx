import { Box, Text, HStack, VStack, Heading, SimpleGrid, Avatar, Container } from "@chakra-ui/react"
import { LocationPinIcon } from "../components/ui/icons/LocationPinIcon"
import { MailIcon } from "../components/ui/icons/MailIcon"
import { EditProfileButton } from "../components/EditProfileButton/EditProfileButton"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { User } from "../types/User"
import usersService from "../services/users.service"
import useAuth from "../hooks/useAuth"
import { UserBookDetail } from "../types/UserBookDetail"
import libraryService from "../services/library.service"
import { BookCard } from "../components/BookCard/BookCard"

export const UserProfile: React.FC = () => {
    const auth = useAuth()
    const { userId } = useParams()
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState<boolean>(true)
    const [library, setLibrary] = useState<UserBookDetail[]>([])
    const [error, setError] = useState<string>()

    const fetchUserLibrary = async () => {
        try {
            const fetchedBooks = await libraryService.getLibraryByUserId(Number(userId))
            setLibrary(fetchedBooks)
        } catch (err) {
            setError("Uh Oh! Could not fetch books in the library right now. Please Try again...")
        } finally {
            setLoading(false)
        }
    }

    const fetchUser = async () => {
        try {
            const fetchedUser = await usersService.getUserById(Number(userId))
            setUser(fetchedUser)
            fetchUserLibrary()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [userId])

    const onDetailsUpdated = () => {
        fetchUser()
    }

    const colors = ["blue", "green", "purple", "orange", "cyan", "teal"]

    return (
        <Box as="section" w="full">
            <HStack align="start" spacing={4}>
                <VStack borderRadius={16} bg="gray.100" p={6} w="20vw" align="start" shadow="lg">
                    <Container centerContent marginBottom={5}>
                        <Avatar
                            bg={`${colors[Math.floor(Math.random() * colors.length)]}.200`}
                            name={`${user?.firstName} ${user?.lastName}`}
                            size="2xl"
                        />
                    </Container>
                    <Heading size="lg">{`${user?.firstName} ${user?.lastName}`}</Heading>
                    {user?.aboutMe && (
                        <VStack align="start" spacing="-4">
                            <Text fontWeight="bold">About ME</Text>
                            <Text fontSize="14">{user?.aboutMe}</Text>
                        </VStack>
                    )}
                    <HStack align="center" spacing={2}>
                        <LocationPinIcon size={18} />
                        <Text fontSize="14">India</Text>
                    </HStack>
                    <HStack spacing={2}>
                        <MailIcon size={18} />
                        <Text fontSize="14">{user?.email}</Text>
                    </HStack>
                    {auth?.user?.userId == userId && (
                        <EditProfileButton onDetailsUpdated={onDetailsUpdated} />
                    )}
                </VStack>
                <Box as="main" w="full" marginLeft={"20px"}>
                    <Heading size="xl" mb={8} fontWeight="extrabold" letterSpacing="tight">
                        {user?.firstName}'s Library
                    </Heading>
                    <SimpleGrid columns={3} gap={4} marginLeft={"20px"}>
                        {library.map((bookEntry) => {
                            return (
                                <BookCard
                                    key={bookEntry.book.bookId}
                                    book={bookEntry.book}
                                    hasRead={bookEntry.hasRead}
                                    isFavorite={bookEntry.bookmarked}
                                />
                            )
                        })}
                    </SimpleGrid>
                    {library.length === 0 && <Text fontSize={18}>No Books added Yet!</Text>}
                </Box>
            </HStack>
        </Box>
    )
}
