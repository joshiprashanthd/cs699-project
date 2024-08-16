import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react"
import { useState } from "react"
import { LoginBody } from "./LoginBody"
import { SignupBody } from "./SignupBody"

export const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [state, setState] = useState<"login" | "signup">("login")

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius={16} bg="gray.100" border="gray.400">
                <ModalCloseButton />
                {state === "login" ? (
                    <LoginBody setState={setState} />
                ) : (
                    <SignupBody setState={setState} />
                )}
            </ModalContent>
        </Modal>
    )
}
