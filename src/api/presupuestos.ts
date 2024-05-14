import Cookies from "js-cookie";
import { apiURL } from "./base.api";

export const agregarPresupuesto = async (cliente: string, fecha: string, vencimiento: string, moneda: string, cantidad: number, precio: string, observaciones: string, producto: string) => {
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

export const getPresupuestos = async (palabra_clave: string, fecha_inicio: string, fecha_fin: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.get(`presupuestos/listar/?palabra_clave=${palabra_clave}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const eliminarPresupuesto = async (numero_presupuesto: number) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.delete(`presupuestos/eliminar/${numero_presupuesto}/`, {
            headers: {  
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getDetallePresupuesto = async (numero_presupuesto: number) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.get(`presupuestos/detalle/${numero_presupuesto}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}