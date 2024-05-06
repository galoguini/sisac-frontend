import Cookies from "js-cookie";
import { apiURL } from "./base.api";

export const agregarProducto = async (nombre: string, codigo_sku: string, codigo_barra: string, categoria: string, tasa_iva: string, unidad_medida: string, precio_venta_usd: number, stock: number, observaciones: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.post("productos/agregar/", { nombre, codigo_sku, codigo_barra, categoria, tasa_iva, unidad_medida, precio_venta_usd, stock, observaciones }, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProductos = async (palabra_clave: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.get(`productos/listado/?palabra_clave=${palabra_clave}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const eliminarProducto = async (id: number) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.delete(`productos/eliminar/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}



