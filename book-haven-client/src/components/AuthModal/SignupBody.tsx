import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Link,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Text,
    VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import authService from "../../services/auth.service"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"

export const SignupBody = ({ setState }: { setState: (state: "login" | "signup") => void }) => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [formState, setFormState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const register = async () => {
        setErrorMessage("")
        try {
            const token = await authService.register(
                formState.firstName,
                formState.email,
                formState.password,
                formState.lastName
            )
            if (token && token.trim().length > 0) {
                console.log("Token: ", token)
                auth?.setUserAuthToken(token)
                navigate("/", { replace: true })
            }
        } catch (err) {
            auth?.setUserAuthToken(undefined)
            if (err instanceof AxiosError) {
                const errMsg = err.response?.data.message
                console.error(errMsg)
                setErrorMessage(errMsg)
            }
        } finally {
            setLoading(false)
        }
    }

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <>
            <ModalHeader>Sign Up</ModalHeader>
            <ModalBody>
                <VStack spacing={4}>
                    <FormControl w="full">
                        <FormLabel fontWeight="semibold" mb={2} fontSize="14">
                            First Name
                        </FormLabel>
                        <Input
                            variant="filled"
                            name="firstName"
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
                            variant="filled"
                            name="lastName"
                            type="text"
                            placeholder="..."
                            onChange={onFormChange}
                        />
                    </FormControl>
                    <FormControl w="full" isInvalid={errorMessage.length > 0}>
                        <FormLabel fontWeight="semibold" mb={2} fontSize="14">
                            Email
                        </FormLabel>
                        <Input
                            variant="filled"
                            name="email"
                            type="email"
                            placeholder="..."
                            onChange={onFormChange}
                        />
                        {errorMessage.length > 0 && (
                            <FormErrorMessage>{errorMessage}</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl w="full">
                        <FormLabel fontWeight="semibold" mb={2} fontSize="14">
                            Password
                        </FormLabel>
                        <Input
                            variant="filled"
                            name="password"
                            type="password"
                            placeholder="..."
                            onChange={onFormChange}
                        />
                    </FormControl>
                </VStack>

                <Button w="full" mt={4} onClick={register} isLoading={loading}>
                    signup
                </Button>

                <Text fontSize={12} as="div" mx="auto" w="fit-content" mt={2}>
                    Already have an account?{" "}
                    <Link onClick={() => setState("login")} fontSize={12} fontWeight="semibold">
                        Login
                    </Link>
                </Text>
            </ModalBody>
            <ModalFooter></ModalFooter>
        </>
    )
}
