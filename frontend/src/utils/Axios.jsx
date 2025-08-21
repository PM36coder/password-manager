import axios  from "axios";

export const API = axios.create({
    baseURL: "https://password-manager-10ux.onrender.com/api",
    withCredentials: true
})