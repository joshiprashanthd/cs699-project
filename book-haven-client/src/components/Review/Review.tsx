import { Box, HStack, VStack, Text, Flex, Link, Avatar } from "@chakra-ui/react"
import { UserIcon } from "../ui/icons/UserIcon"
import { StarIcon } from "../ui/icons/StarIcon"
import React, { useEffect, useState } from "react"
import { BookReview } from "../../types/BookReview"
import { User } from "../../types/User"
import usersService from "../../services/users.service"

export const Review: React.FC<{ review: BookReview }> = ({ review }) => {
    const [userDetail, setUserDetail] = useState<User>()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await usersService.getUserById(review.userId)
                setUserDetail(fetchedUser)
            } catch (err) {
                console.error(err)
            }
        }

        fetchUser()
    }, [])

    const colors = ["yellow", "blue", "green", "purple", "gray", "orange"]

    return (
        <Box borderRadius={16} bg="gray.50" p={4} minWidth={"750px"} margin={"10px"}>
            <VStack align="start">
                <Flex mb={2} justify="space-between" w="full">
                    <HStack>
                        <Avatar
                            bg={`${colors[Math.floor(Math.random() * colors.length)]}.200`}
                            name={`${userDetail?.firstName} ${userDetail?.lastName}`}
                        />
                        <Link href={`/users/${userDetail?.userId}`}>
                            <Text fontSize={14} fontWeight={600} color="purple.500">
                                {`${userDetail?.firstName} ${userDetail?.lastName}`}
                            </Text>
                        </Link>
                    </HStack>

                    <HStack>
                        <Text>{review.rating}</Text>
                        <StarIcon
                            size={18}
                            fill="rgb(128, 90, 213)"
                            strokeColor="rgb(128, 90, 213)"
                        />
                    </HStack>
                </Flex>
                <Box>
                    <Text fontSize={14}>{review.reviewText}</Text>
                </Box>
            </VStack>
        </Box>
    )
}
