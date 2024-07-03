import axios from "axios"

const BASE_URL = "https://web-production-d54a.up.railway.app/api/v1/"

export const apiURL = axios.create({
    baseURL: BASE_URL
})