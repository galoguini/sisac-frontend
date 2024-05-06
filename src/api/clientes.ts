import Cookies from "js-cookie";
import { apiURL } from "./base.api";

export const agregarCliente = async () => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.post("clientes/alta/", {  }, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getClientes = async () => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.get("clientes/listado/", {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}