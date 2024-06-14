import axios from "axios"

// const BASE_URL = "https://galoguini.pythonanywhere.com/api/v1/"
const BASE_URL = "http://127.0.0.1:8000/api/v1/"

export const apiURL = axios.create({
    baseURL: BASE_URL
})