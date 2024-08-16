import { Button, Flex, Heading, VStack } from "@chakra-ui/react"
import React, { useState } from "react"
import { YearFilter } from "./YearFilter"
import { GenreFilter } from "./GenreFilter"
import { useNavigate, useSearchParams } from "react-router-dom"

export const Filter = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [filters, setFilters] = useState({
        genre: "All",
        startYear: 2000,
        endYear: 2023,
    })

    const setYearRange = (startYear: number, endYear: number) => {
        setFilters((prev) => ({
            ...prev,
            startYear,
            endYear,
        }))
    }

    const setGenre = (genre: string) => {
        setFilters((prev) => ({
            ...prev,
            genre,
        }))
    }

    const onApply = () => {
        let url = `/search?q=${searchParams.get("q")}`
        url += `&genre=${filters.genre}`
        url += `&startYear=${filters.startYear}`
        url += `&endYear=${filters.endYear}`
        navigate(url, { replace: true })
    }

    return (
        <VStack spacing={4} bg="gray.100" borderRadius={16} minW="72" p={4} align="start">
            <Flex justify="space-between" align="center" w="full">
                <Heading size="md" fontWeight="semibold">
                    Filters
                </Heading>
                <Button variant="primary" onClick={onApply}>
                    Apply
                </Button>
            </Flex>
            <YearFilter
                startYear={filters.startYear}
                endYear={filters.endYear}
                setYearRange={setYearRange}
            />
            <GenreFilter genre={filters.genre} setGenre={setGenre} />
        </VStack>
    )
}
