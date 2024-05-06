import Cookies from "js-cookie";
import { apiURL } from "./base.api";

export const agregarPresupuesto = async (cliente: string, fecha: string, vencimiento: string, moneda: string, cantidad: number, precio: number, observaciones: string, producto: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.post("presupuestos/agregar/", { cliente, fecha, vencimiento, moneda, cantidad, precio, observaciones, producto }, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getPresupuestos = async (palabra_clave: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.get(`presupuestos/listar/?palabra_clave=${palabra_clave}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}