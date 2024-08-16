import {
    Avatar,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/react"
import React from "react"
import { UserIcon } from "../ui/icons/UserIcon"
import { LibraryIcon } from "../ui/icons/LibraryIcon"
import { LogoutIcon } from "../ui/icons/LogoutIcon"
import { MenuIcon } from "../ui/icons/MenuIcon"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

export const NavMenu: React.FC = () => {
    const auth = useAuth()
    const navigate = useNavigate()
    const onLogout = () => {
        // logout logic
        auth?.setUserAuthToken(undefined)
        navigate("/", { replace: true })
    }

    return (
        <Menu>
            <MenuButton>
                <Avatar
                    bg={`purple.500`}
                    color={"white"}
                    name={`${auth?.user?.firstName} ${auth?.user?.lastName}`}
                    size={"md"}
                />
            </MenuButton>
            <MenuList borderRadius={8} fontSize={14} minW="40">
                <MenuItem
                    as={Link}
                    href={`/users/${auth?.user?.userId}`}
                    _hover={{ textDecoration: "none" }}
                    icon={<UserIcon size={18} />}
                >
                    Your Profile
                </MenuItem>
                {/* <MenuItem
                    as={Link}
                    href="/library"
                    _hover={{ textDecoration: "none" }}
                    icon={<LibraryIcon size={18} />}
                >
                    Your Library
                </MenuItem> */}
                <MenuDivider />
                <MenuItem icon={<LogoutIcon size={18} />} onClick={onLogout}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    )
}
