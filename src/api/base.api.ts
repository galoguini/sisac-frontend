import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

console.log('BASE_URL', BASE_URL);

export const apiURL = axios.create({
    baseURL: BASE_URL
});