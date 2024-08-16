import React, { useState } from "react"
import { Radio, HStack, Box } from "@chakra-ui/react"
import { StarIcon } from "../ui/icons/StarIcon"

export default function StarRating({
    rating,
    setRating,
}: {
    rating: number
    setRating: (arg: number) => void
}) {
    // count:  number of stars you want, pass as props
    //size: size of star that you want

    const [hover, setHover] = useState<number | null>(null)
    return (
        <HStack spacing={"2px"} mb={4}>
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1
                return (
                    <Box
                        as="label"
                        key={index}
                        color={ratingValue <= (hover || rating) ? "rgb(128, 90, 213)" : "gray.400"}
                        onMouseEnter={() => setHover(ratingValue)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => setRating(ratingValue)}
                    >
                        <StarIcon
                            size={24}
                            fill={index < rating ? "rgb(128, 90, 213)" : undefined}
                            strokeColor={index < rating ? "rgb(128, 90, 213)" : undefined}
                        />
                    </Box>
                )
            })}
        </HStack>
    )
}
