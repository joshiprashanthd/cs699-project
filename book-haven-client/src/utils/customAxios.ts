import axios from "axios"
import { parseJSON } from "./customJsonParser"

export const axiosWithAuth = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

export const axiosWithoutAuth = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosWithAuth.interceptors.request.use((config) => {
    const token = parseJSON(localStorage.getItem("token"))
    if (token !== null) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
