import { Outlet } from "react-router-dom"
import { Nav } from "./Nav"
import { Container } from "@chakra-ui/react"

export const Layout = () => {
    return (
        <div>
            <Nav />
            <Container centerContent maxW="container.lg" marginBottom={20}>
                <Outlet />
            </Container>
        </div>
    )
}
