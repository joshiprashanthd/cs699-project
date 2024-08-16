import { menuAnatomy } from "@chakra-ui/anatomy"
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react"

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
    button: {},
    list: {
        fontSize: 14,
        p: "2",
        borderRadius: 8,
        minW: "40",
        shadow: "md",
        borderColor: "gray.100",
        borderWidth: "1px",
    },
    item: {
        borderRadius: 4,
        _hover: {
            bg: "gray.100",
        },
    },
    groupTitle: {},
    command: {},
    divider: {},
})
export const Menu = defineMultiStyleConfig({ baseStyle })
