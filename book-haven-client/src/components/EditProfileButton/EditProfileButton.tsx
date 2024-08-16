import { Button, useDisclosure } from "@chakra-ui/react"
import { EditProfileModal } from "../EditProfileModal/EditProfileModal"

export const EditProfileButton: React.FC<{ onDetailsUpdated: () => void }> = ({
    onDetailsUpdated,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} w="full">
                Edit Profile
            </Button>
            <EditProfileModal
                isOpen={isOpen}
                onClose={onClose}
                onDetailsUpdated={onDetailsUpdated}
            />
        </>
    )
}
