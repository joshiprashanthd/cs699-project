import { Button, Menu, MenuButton, MenuItem, MenuList, Text, VStack } from "@chakra-ui/react"
import { ChevronDown } from "../ui/icons/ChevronDown"

export const GenreFilter = ({
    genre,
    setGenre,
}: {
    genre: string
    setGenre: (arg: string) => void
}) => {
    const options = [
        "Fiction",
        "Juvenile Fiction",
        "Biography & Autobiography",
        "History",
        "Literary Criticism",
        "Philosophy",
        "Comics & Graphic Novels",
        "Religion",
        "Drama",
        "Juvenile Nonfiction",
        "Poetry",
        "Science",
        "Literary Collections",
        "Business & Economics",
        "Social Science",
        "Performing Arts",
        "Cooking",
        "Art",
        "Body, Mind & Spirit",
        "Travel",
    ]

    return (
        <VStack align="start" w="full">
            <Text fontSize="14">Select genre</Text>
            <Menu>
                <MenuButton
                    w="full"
                    as={Button}
                    rightIcon={<ChevronDown />}
                    variant="tertiary"
                    textTransform="none"
                    fontWeight="medium"
                >
                    {genre}
                </MenuButton>
                <MenuList>
                    {options.map((item) => (
                        <MenuItem key={item} onClick={() => setGenre(item)}>
                            {item}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
        </VStack>
    )
}
