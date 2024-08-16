import { defineStyleConfig } from "@chakra-ui/react"

export const Heading = defineStyleConfig({
    baseStyle: {
        fontFamily: "Inter",
    },
    sizes: {
        md: {
            fontSize: 18,
            fontWeight: "semibold",
        },
        lg: {
            fontSize: 24,
            fontWeight: "semibold",
        },
    },
    defaultProps: {
        size: "md",
    },
})
