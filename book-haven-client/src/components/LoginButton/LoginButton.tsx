import { Button, useDisclosure } from "@chakra-ui/react"
import { AuthModal } from "../AuthModal/AuthModal"

export const LoginButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen}>Login</Button>
            <AuthModal isOpen={isOpen} onClose={onClose} />
        </>
    )
}
