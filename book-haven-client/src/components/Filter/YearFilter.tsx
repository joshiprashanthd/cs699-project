import {
    Button,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    VStack,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { ChevronDown } from "../ui/icons/ChevronDown"

export const YearFilter = ({
    startYear,
    endYear,
    setYearRange,
}: {
    startYear: number
    endYear: number
    setYearRange: (arg1: number, arg2: number) => void
}) => {
    useEffect(() => {
        if (startYear >= endYear) setYearRange(startYear, startYear)
    }, [startYear])

    return (
        <VStack w="full" align="start">
            <Text fontSize="14">Select year range</Text>
            <HStack w="full">
                <YearMenu
                    selected={startYear}
                    min={2000}
                    max={2023}
                    onChange={(select) => setYearRange(select, endYear)}
                />
                <Text fontSize="sm">To</Text>
                <YearMenu
                    selected={endYear}
                    min={startYear}
                    max={2023}
                    onChange={(select) => setYearRange(startYear, select)}
                />
            </HStack>
        </VStack>
    )
}

const YearMenu = ({
    selected,
    min,
    max,
    onChange,
}: {
    selected: number
    min: number
    max: number
    onChange: (arg: number) => void
}) => {
    const range = []
    for (let i = min; i <= max; i++) {
        range.push(i)
    }

    return (
        <Menu>
            <MenuButton
                as={Button}
                w="full"
                rightIcon={<ChevronDown />}
                variant="tertiary"
                fontWeight="medium"
            >
                {selected}
            </MenuButton>
            <MenuList maxH="64" overflow="scroll" borderRadius={8} w="full">
                {range.map((item) => (
                    <MenuItem key={item} onClick={() => onChange(item)}>
                        {item}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}
