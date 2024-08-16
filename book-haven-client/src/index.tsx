import * as React from "react"
import * as ReactDOM from "react-dom/client"
import { App } from "./App"
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { theme } from "./components/ui/Theme"
import { AuthProvider } from "./contexts/AuthProvider"

const container = document.getElementById("root")
if (!container) throw new Error("Failed to find the root element")
const root = ReactDOM.createRoot(container)

root.render(
    <Router>
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </AuthProvider>
        </ChakraProvider>
    </Router>
)
