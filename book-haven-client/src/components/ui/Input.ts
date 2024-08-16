import { defineStyleConfig } from "@chakra-ui/react"

export const Input = defineStyleConfig({
    baseStyle: {
        field: {
            borderRadius: 8,
        },
    },
    sizes: {
        normal: {
            field: {
                h: 10,
                fontSize: 14,
                p: 4,
            },
        },
        big: {
            field: {
                h: 12,
                fontSize: 16,
                p: 4,
            },
        },
    },
    variants: {
        filled: {
            field: {
                backgroundColor: "gray.50",
                _focus: {
                    backgroundColor: "white",
                },
                _placeholder: {
                    color: "gray.800",
                },
            },
        },
        unstyled: {
            field: {
                p: 0,
                border: "none",
                _placeholder: {
                    color: "gray.800",
                },
                _focus: {
                    border: "none",
                    bg: "none",
                },
                _focusVisible: {
                    bg: "none",
                    border: "none",
                },
            },
        },
    },
    defaultProps: {
        size: "normal",
        variant: "filled",
    },
})
