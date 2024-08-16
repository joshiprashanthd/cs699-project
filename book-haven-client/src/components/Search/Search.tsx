import { Flex, IconButton, Input } from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { SearchIcon } from "../ui/icons/SearchIcon"

export const Search = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const [query, setQuery] = useState(searchParams.get("q") || "")

    const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setQuery(e.target.value)
    }

    const onSearch = () => {
        navigate(`/search?q=${query}`)
    }

    const onKeyDown = (e: any) => {
        if (e.keyCode == 13) {
            onSearch()
        }
    }

    return (
        <Flex
            justify="space-between"
            h="10"
            align="center"
            pl={4}
            bg="gray.50"
            borderRadius={8}
            width={350}
        >
            <Input
                variant="unstyled"
                placeholder="Search"
                onChange={onChangeQuery}
                onKeyDown={onKeyDown}
                value={query}
            />
            <IconButton
                size="icon"
                variant="tertiary"
                aria-label="search-button"
                icon={<SearchIcon />}
                onClick={onSearch}
            />
        </Flex>
    )
}
