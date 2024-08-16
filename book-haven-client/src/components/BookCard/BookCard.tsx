import {
    Badge,
    Card,
    CardBody,
    CardFooter,
    Center,
    Divider,
    HStack,
    Heading,
    Icon,
    Image,
    Link,
    Text,
    VStack,
} from "@chakra-ui/react"
import { Book } from "../../types/Book"
import { StarIcon } from "../ui/icons/StarIcon"
import { FaCheckCircle, FaPlusCircle, FaStar } from "react-icons/fa"

interface BookCardProps {
    book: Book
    hasRead?: boolean
    isFavorite?: boolean
}

export const BookCard: React.FC<BookCardProps> = ({ book, hasRead, isFavorite }) => {
    return (
        <Card>
            <CardBody>
                <Center>
                    <Link href={`/book/${book.bookId}`} zIndex="100">
                        <Image
                            src={book.imageUrl}
                            alt={book.title}
                            borderRadius={8}
                            objectFit="cover"
                            _groupHover={{
                                shadow: "2xl",
                            }}
                            shadow="lg"
                            mb={4}
                        />
                        <Heading size="md">{book.title}</Heading>
                        <Text fontSize={14}>By {book.authors.split(";")[0]}</Text>
                    </Link>
                </Center>
                <VStack marginTop={3}>
                    <HStack>
                        {isFavorite && (
                            <Badge ml="1" p={1} borderRadius={5} colorScheme="green">
                                <Icon as={FaStar} size={10} mr={1} />
                                Favorite
                            </Badge>
                        )}
                        {hasRead && (
                            <Badge ml="1" p={1} borderRadius={5} colorScheme="green">
                                <Icon as={FaCheckCircle} size={10} mr={1} />
                                Read
                            </Badge>
                        )}
                    </HStack>
                    <HStack>
                        <Text fontSize={14}>Rating:</Text>
                        {[...Array(book.averageRating)].map(() => (
                            <StarIcon
                                size={18}
                                fill="rgb(128, 90, 213)"
                                strokeColor="rgb(128, 90, 213)"
                            />
                        ))}
                    </HStack>
                </VStack>
            </CardBody>
            {/* <CardFooter></CardFooter> */}
        </Card>
    )
}
