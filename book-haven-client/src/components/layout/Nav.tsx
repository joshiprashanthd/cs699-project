import { Container, Flex, Link, Text, Image, HStack, Icon } from "@chakra-ui/react"
import { FaUser } from "react-icons/fa"
import { LoginButton } from "../LoginButton/LoginButton"
import { NavMenu } from "./NavMenu"
import { Search } from "../Search/Search"
import useAuth from "../../hooks/useAuth"

export const Nav = () => {
    const auth = useAuth()

    return (
        <Flex as="nav">
            <Container centerContent maxW="container.lg">
                <Flex
                    justify="space-between"
                    minW="full"
                    align="center"
                    h="16"
                    my={4}
                    py={2}
                    px={4}
                    bg="gray.100"
                    border="gray.400"
                    borderRadius={16}
                >
                    <Link href={"/"} _hover={{ textDecoration: "none" }}>
                        <Flex>
                            <Image
                                src="https://marla.ie/wp-content/uploads/2016/09/bookhaven.jpg"
                                alt="Book Haven"
                                height={"50px"}
                                width={"50px"}
                                borderRadius={"8px"}
                            />
                            <Text
                                fontSize={20}
                                fontWeight={700}
                                color="purple.500"
                                marginTop={"10px"}
                                marginLeft={"10px"}
                            >
                                Book Haven
                            </Text>
                        </Flex>
                    </Link>
                    <Search />
                    <HStack align="center" spacing={4}>
                        {auth?.user ? <NavMenu /> : <LoginButton />}
                    </HStack>
                </Flex>
            </Container>
        </Flex>
    )
}
