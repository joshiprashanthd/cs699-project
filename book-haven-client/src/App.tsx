import { Route, Routes } from "react-router-dom"
import { Layout } from "./components/layout/Layout"
import { Home } from "./pages/Home"
import { Search } from "./pages/Search"
import { UserProfile } from "./pages/UserProfile"
import { BookDetail } from "./pages/BookDetail"

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/book/:id" element={<BookDetail />} />
                <Route path="/users/:userId" element={<UserProfile />} />
                <Route path="/search" element={<Search />} />
            </Route>
        </Routes>
    )
}
