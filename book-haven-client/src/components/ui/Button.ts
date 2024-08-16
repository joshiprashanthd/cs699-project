import { defineStyleConfig } from "@chakra-ui/react"

export const Button = defineStyleConfig({
    baseStyle: {
        borderRadius: 8,
        textTransform: "uppercase",
        fontWeight: "semibold",
    },
    sizes: {
        small: {
            h: 8,
            p: 4,
            fontSize: 12,
        },
        normal: {
            h: 10,
            p: 4,
            fontSize: 14,
        },
        icon: {
            minH: 10,
            minW: 10,
            p: 4,
        },
    },
    variants: {
        primary: {
            backgroundColor: "purple.500",
            color: "white",
            _hover: {
                backgroundColor: "purple.400",
            },
        },
        secondary: {
            backgroundColor: "none",
            borderWidth: 2,
            borderColor: "purple.400",
            _hover: {
                backgroundColor: "purple.50",
            },
        },
        tertiary: {
            backgroundColor: "gray.50",
            color: "black",
            _hover: {
                backgroundColor: "gray.200",
            },
        },
    },
    defaultProps: {
        size: "normal",
        variant: "primary",
    },
})
