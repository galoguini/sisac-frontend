import Cookies from "js-cookie";
import { apiURL } from "./base.api";

export const agregarPresupuesto = async () => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.post("presupuestos/agregar/", { }, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPresupuesto = async () => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.get("presupuestos/listar/", {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}