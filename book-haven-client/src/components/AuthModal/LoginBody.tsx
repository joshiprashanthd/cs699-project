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
import React, { useState } from "react"
import authService from "../../services/auth.service"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import useAuth from "../../hooks/useAuth"

export const LoginBody = ({ setState }: { setState: (state: "login" | "signup") => void }) => {
    const auth = useAuth()
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    })

    const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }))
    }
    const login = async () => {
        setErrorMessage("")
        try {
            const token = await authService.login(formState.email, formState.password)
            if (token && token.trim().length > 0) {
                console.log("Token: ", token)
                auth?.setUserAuthToken(token)
                navigate("/", { replace: true })
            }
        } catch (err) {
            auth?.setUserAuthToken(undefined)
            if (err instanceof AxiosError) {
                const errMsg = err.response?.data.error
                console.error(errMsg)
                setErrorMessage("Invalid email or password")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ModalHeader>Login</ModalHeader>
            <ModalBody>
                <VStack spacing={4}>
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
                    <FormControl w="full" isInvalid={errorMessage.length > 0}>
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
                        {errorMessage.length > 0 && (
                            <FormErrorMessage>{errorMessage}</FormErrorMessage>
                        )}
                    </FormControl>
                </VStack>

                <Button w="full" mt={4} onClick={login} isLoading={loading}>
                    Login
                </Button>

                <Text fontSize={12} as="div" mx="auto" w="fit-content" mt={2}>
                    Create new account by{" "}
                    <Link onClick={() => setState("signup")} fontSize={12} fontWeight="semibold">
                        Signup
                    </Link>
                </Text>
            </ModalBody>
            <ModalFooter></ModalFooter>
        </>
    )
}
