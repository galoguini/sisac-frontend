import axios from "axios";

const BASE_URL = "https://dolarapi.com/";

const apiURL = axios.create({
    baseURL: BASE_URL
})

export const getDolarTarjeta = async () => {
    try {
        const response = await apiURL.get("v1/dolares/tarjeta");
        return response.data;
    } catch (error) {
        throw error;
    }
}