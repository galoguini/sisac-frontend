import axios from "axios"

const BASE_URL = "https://galoguini.pythonanywhere.com/api/v1/"

export const apiURL = axios.create({
    baseURL: BASE_URL
})