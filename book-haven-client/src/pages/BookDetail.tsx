import {
    Box,
    Button,
    HStack,
    VStack,
    Text,
    Image,
    TabList,
    Tab,
    TabPanels,
    Tabs,
    TabPanel,
    Heading,
    Flex,
    Textarea,
    Spinner,
    Container,
    Icon,
} from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Book } from "../types/Book"
import booksService from "../services/books.service"
import useAuth from "../hooks/useAuth"
import libraryService from "../services/library.service"
import { FaCheckCircle, FaMinusCircle, FaPlusCircle, FaStar } from "react-icons/fa"
import { BsStar, BsXCircleFill } from "react-icons/bs"
import { UserBookDetail } from "../types/UserBookDetail"
import { Review } from "../components/Review/Review"
import StarRating from "../components/Rating/Rating"
import React from "react"
import { BookReview } from "../types/BookReview"

const DescriptionTabPanel: React.FC<{ book: Book; onReviewSave: () => void }> = ({
    book,
    onReviewSave,
}) => {
    const auth = useAuth()

    return (
        <TabPanel overflow="scroll" h="full" p={6} minWidth={"750px"}>
            <Heading size="xl">{book.title}</Heading>
            <Heading fontWeight={400}>By {book.authors.split(";").join(" and ")}</Heading>
            <Box my={4}>
                <Heading fontWeight={600} size="lg" mb={2}>
                    Description
                </Heading>
                <Text fontSize={14}>{book.description}</Text>
            </Box>
            <HStack borderRadius={8} bg="gray.200" w="full" p={2} mb={4}>
                <VStack flex="1">
                    <Text fontSize={14} fontWeight="bold" color="purple.600" mb={-2}>
                        Number of Pages
                    </Text>
                    <Text>{book.numPages}</Text>
                </VStack>
                <VStack flex="1">
                    <Text fontSize={14} fontWeight="bold" color="purple.600" mb={-2}>
                        Year Published
                    </Text>
                    <Text>{book.publishedYear}</Text>
                </VStack>
                <VStack flex="1">
                    <Text fontSize={14} fontWeight="bold" color="purple.600" mb={-2}>
                        Genre
                    </Text>
                    <Text>{book.genre}</Text>
                </VStack>
                <VStack flex="1">
                    <Text fontSize={14} fontWeight="bold" color="purple.600" mb={-2}>
                        Average Rating
                    </Text>
                    <Text>{book.averageRating}</Text>
                </VStack>
                <VStack flex="1">
                    <Text fontSize={14} fontWeight="bold" color="purple.600" mb={-2}>
                        Ratings Count
                    </Text>
                    <Text>{book.ratingsCount}</Text>
                </VStack>
            </HStack>
            {auth?.user && <GiveReview bookId={book.bookId} onReviewSave={onReviewSave} />}
        </TabPanel>
    )
}

const GiveReview: React.FC<{ bookId: number; onReviewSave: () => void }> = ({
    bookId,
    onReviewSave,
}) => {
    const [rating, setRating] = useState<number>(0)
    const [reviewText, setReviewText] = useState<string>("")
    const [error, setError] = useState<string>()

    const onReviewTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setReviewText(e.target.value)
    }

    const onSubmitReview = () => {
        booksService
            .addBookReview(bookId, rating * 1.0, reviewText)
            .then((review) => {
                onReviewSave()
            })
            .catch((err) => {
                setError("Something went wrong!")
            })
    }

    return (
        <Box w="full">
            <Heading mb={2}>Give a review</Heading>
            {error && <Text color={"red"}>{error}</Text>}
            <StarRating rating={rating} setRating={setRating} />
            <Textarea
                bg="gray.50"
                variant="filled"
                placeholder="Give your review about this book..."
                borderRadius={8}
                maxLength={2000}
                h="40"
                w="full"
                fontSize={14}
                mb={2}
                value={reviewText}
                onChange={onReviewTextChange}
                resize={"none"}
            />
            <Flex align="center" justify="end">
                <Button onClick={onSubmitReview}>Submit</Button>
            </Flex>
        </Box>
    )
}

export const ReviewsTabPanel: React.FC<{ bookId: number; refreshReviews: boolean }> = ({
    bookId,
    refreshReviews,
}) => {
    const [reviews, setReviews] = useState<BookReview[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        const fetchBookReviews = async () => {
            try {
                setLoading(true)
                const fetchedReviews = await booksService.getBookReviews(bookId)
                console.log(fetchedReviews)
                setReviews(fetchedReviews)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchBookReviews()
    }, [refreshReviews])

    return (
        <TabPanel w="full" minWidth={"750px"}>
            {loading && <Spinner size={"lg"} />}
            {!loading &&
                reviews.map((review) => {
                    return <Review key={review.bookReviewId} review={review} />
                })}
            {!loading && reviews.length === 0 && (
                <Box>
                    <Text color={"orange.500"}>
                        No Reviews found for this book yet! Be the first one to submit a review.
                    </Text>
                </Box>
            )}
        </TabPanel>
    )
}

export const BookDetail: React.FC = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const { id } = useParams()
    const [bookDetail, setBookDetail] = useState<Book>()
    const [loading, setLoading] = useState<boolean>(true)
    const [adding, setAdding] = useState<boolean>(false)
    const [removing, setRemoving] = useState<boolean>(false)
    const [tabIndex, setTabIndex] = useState<number>(0)
    const [refreshReviews, setRefreshReviews] = useState<boolean>(false)
    const [userLibrary, setUserLibrary] = useState<UserBookDetail[]>([])
    const [isBookInLibrary, setIsBookInLibrary] = useState<boolean>(false)
    const [isBookRead, setIsBookRead] = useState<boolean>(false)
    const [isBookFavorited, setIsBookFavorited] = useState<boolean>(false)
    const [isLibraryLoading, setIsLibraryLoading] = useState<boolean>(false)

    const fetchBookDetails = async (bookId: number) => {
        setLoading(true)
        try {
            const fetchedBook = await booksService.getBookDetailById(bookId)
            setBookDetail(fetchedBook)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const fetchUserLibrary = async () => {
        const userId = auth?.user?.userId
        setIsLibraryLoading(true)
        if (userId) {
            try {
                const library = await libraryService.getLibraryByUserId(userId)
                setUserLibrary(library)
                library.forEach((bh) => {
                    if (bh.book.bookId === Number(bookId)) {
                        setIsBookInLibrary(true)
                        setIsBookRead(bh.hasRead)
                        setIsBookFavorited(bh.bookmarked)
                    }
                })
            } catch (err) {
                console.error(err)
            } finally {
                setIsLibraryLoading(false)
            }
        }
    }

    const bookId = id

    useEffect(() => {
        if (!bookId) {
            navigate("/not-found", { replace: true })
        }

        fetchBookDetails(Number(bookId))
        if (auth?.user) {
            fetchUserLibrary()
        }
    }, [bookId, auth?.user])

    const onAddToLibrary = () => {
        setAdding(true)
        libraryService
            .addBookToUserLibrary(Number(bookId))
            .then((addedBook) => {
                setUserLibrary((prev) => [addedBook, ...prev])
                setIsBookInLibrary(true)
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setAdding(false)
            })
    }

    const onRemoveFromLibrary = () => {
        setRemoving(true)
        libraryService
            .removeBookFromLibrary(Number(bookId))
            .then(() => {
                setUserLibrary((prev) => prev.filter((bh) => bh.book.bookId !== Number(bookId)))
                setIsBookInLibrary(false)
                setIsBookRead(false)
                setIsBookFavorited(false)
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                setRemoving(false)
            })
    }

    const onToggleFavouriteBook = () => {
        const bookEntry = userLibrary.find((bh) => bh.book.bookId === Number(bookId))
        if (bookEntry) {
            libraryService.updateBookInLibrary(
                Number(bookId),
                bookEntry.hasRead,
                !bookEntry.bookmarked
            )
            const updatedLibrary: UserBookDetail[] = []
            userLibrary.forEach((bh) => {
                if (bh.book.bookId === Number(bookId)) {
                    updatedLibrary.push({
                        ...bh,
                        bookmarked: !bh.bookmarked,
                    })
                    setIsBookFavorited(!bh.bookmarked)
                } else {
                    updatedLibrary.push(bh)
                }
            })

            setUserLibrary(updatedLibrary)
        }
    }

    const onToggleReadBook = () => {
        const bookEntry = userLibrary.find((bh) => bh.book.bookId === Number(bookId))
        if (bookEntry) {
            libraryService.updateBookInLibrary(
                Number(bookId),
                !bookEntry.hasRead,
                bookEntry.bookmarked
            )
            const updatedLibrary: UserBookDetail[] = []
            userLibrary.forEach((bh) => {
                if (bh.book.bookId === Number(bookId)) {
                    updatedLibrary.push({
                        ...bh,
                        hasRead: !bh.hasRead,
                    })
                    setIsBookRead(!bh.hasRead)
                } else {
                    updatedLibrary.push(bh)
                }
            })

            setUserLibrary(updatedLibrary)
        }
    }

    const onReviewSave = () => {
        setTabIndex(1)
        setRefreshReviews(true)
    }

    return (
        <>
            {(loading || isLibraryLoading) && (
                <Container centerContent>
                    <Spinner size="xl" />
                </Container>
            )}
            {!loading && !isLibraryLoading && bookDetail && (
                <Box as="section" w="full">
                    <HStack align="start" spacing={4}>
                        <VStack
                            borderRadius={16}
                            bg="gray.100"
                            p={6}
                            w="20vw"
                            align="start"
                            shadow="md"
                        >
                            <Box mx="auto" mb={4} minW="40">
                                <Image
                                    src={bookDetail?.imageUrl}
                                    objectFit="fill"
                                    borderRadius={16}
                                    w="40"
                                />
                            </Box>
                            {auth?.user && isBookInLibrary && (
                                <>
                                    <Button
                                        isLoading={removing}
                                        loadingText={"Removing"}
                                        variant="primary"
                                        w="full"
                                        onClick={onRemoveFromLibrary}
                                    >
                                        <HStack spacing={2}>
                                            <Icon as={FaMinusCircle} size={18} />
                                            <Text>Remove from library</Text>
                                        </HStack>
                                    </Button>
                                    <Button
                                        isLoading={removing}
                                        variant="primary"
                                        w="full"
                                        onClick={onToggleReadBook}
                                    >
                                        <HStack spacing={2}>
                                            <Icon
                                                as={isBookRead ? BsXCircleFill : FaCheckCircle}
                                                size={18}
                                            />
                                            <Text>{isBookRead && "Not"} Read ?</Text>
                                        </HStack>
                                    </Button>
                                    <Button
                                        isLoading={removing}
                                        variant="primary"
                                        w="full"
                                        onClick={onToggleFavouriteBook}
                                    >
                                        <HStack spacing={2}>
                                            <Icon
                                                as={isBookFavorited ? BsStar : FaStar}
                                                size={18}
                                            />
                                            <Text>{isBookFavorited && "Un"}Favourite</Text>
                                        </HStack>
                                    </Button>
                                </>
                            )}
                            {auth?.user && !isBookInLibrary && (
                                <Button
                                    isLoading={adding}
                                    loadingText={"Adding"}
                                    variant="primary"
                                    w="full"
                                    onClick={onAddToLibrary}
                                >
                                    <HStack spacing={2}>
                                        <Icon as={FaPlusCircle} size={18} />
                                        <Text>Add to library</Text>
                                    </HStack>
                                </Button>
                            )}
                            {!auth?.user && (
                                <Button
                                    w="full"
                                    colorScheme={"gray"}
                                    isDisabled={true}
                                    title="Please login to Add this to your library!"
                                >
                                    <HStack spacing={2}>
                                        <Icon as={FaPlusCircle} size={18} />
                                        <Text>Add to library</Text>
                                    </HStack>
                                </Button>
                            )}
                        </VStack>
                        <Tabs
                            isFitted
                            w="full"
                            index={tabIndex}
                            onChange={(index) => {
                                setTabIndex(index)
                            }}
                        >
                            <VStack
                                flex="1"
                                bg="gray.100"
                                borderRadius={16}
                                minH="100vh"
                                maxH="100vh"
                                overflow="hidden"
                                align="start"
                                shadow="md"
                            >
                                <TabList p={2} border="none" w="full">
                                    <Tab
                                        _selected={{
                                            backgroundColor: "purple.500",
                                            color: "white",
                                            fontWeight: "bold",
                                            borderRadius: 8,
                                            shadow: "md",
                                        }}
                                    >
                                        Info
                                    </Tab>
                                    <Tab
                                        _selected={{
                                            backgroundColor: "purple.500",
                                            color: "white",
                                            fontWeight: "bold",
                                            borderRadius: 8,
                                            shadow: "md",
                                        }}
                                    >
                                        Reviews
                                    </Tab>
                                </TabList>
                                <VStack h="full" overflow="scroll">
                                    <TabPanels>
                                        <DescriptionTabPanel
                                            book={bookDetail}
                                            onReviewSave={onReviewSave}
                                        />
                                        <ReviewsTabPanel
                                            bookId={Number(bookId)}
                                            refreshReviews={refreshReviews}
                                        />
                                    </TabPanels>
                                </VStack>
                            </VStack>
                        </Tabs>
                    </HStack>
                </Box>
            )}
        </>
    )
}
