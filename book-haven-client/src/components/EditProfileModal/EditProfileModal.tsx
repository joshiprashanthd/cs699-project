import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    ModalHeader,
    Button,
    FormLabel,
    Input,
    VStack,
    Textarea,
} from "@chakra-ui/react"
import React, { useEffect } from "react"
import { useState } from "react"
import usersService from "../../services/users.service"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

export const EditProfileModal = ({
    isOpen,
    onClose,
    onDetailsUpdated,
}: {
    isOpen: boolean
    onClose: () => void
    onDetailsUpdated: () => void
}) => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [formState, setFormState] = useState({
        firstname: auth?.user?.firstName ?? "",
        lastname: auth?.user?.lastName ?? "",
        aboutMe: auth?.user?.aboutMe ?? "",
    })

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const onSave = () => {
        const userId = Number(auth?.user?.userId)
        usersService
            .updateUser(userId, formState.firstname, formState.lastname, formState.aboutMe)
            .then((user) => {
                auth?.setUser(user)
                onDetailsUpdated()
                onClose()
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius={16} bg="gray.100" border="gray.400">
                <ModalHeader>Edit Profile</ModalHeader>
                <ModalCloseButton onClick={onClose} />
                <ModalBody>
                    <VStack spacing={4}>
                        <FormControl w="full">
                            <FormLabel fontWeight="semibold" mb={2} fontSize="14">
                                First Name
                            </FormLabel>
                            <Input
                                value={formState.firstname}
                                variant="filled"
                                name="firstname"
                                type="text"
                                placeholder="..."
                                onChange={onFormChange}
                            />
                        </FormControl>
                        <FormControl w="full">
                            <FormLabel fontWeight="semibold" mb={2} fontSize="14">
                                Last Name
                            </FormLabel>
                            <Input
                                value={formState.lastname}
                                variant="filled"
                                name="lastname"
                                type="text"
                                placeholder="..."
                                onChange={onFormChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontWeight="semibold" mb={2} fontSize="14">
                                About Me
                            </FormLabel>
                            <Textarea
                                value={formState.aboutMe}
                                bg="gray.50"
                                variant="filled"
                                name="aboutMe"
                                placeholder="..."
                                borderRadius={8}
                                maxLength={400}
                                maxHeight="100px"
                                onChange={onFormChange}
                                resize={"none"}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button variant="secondary" mr={4} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
