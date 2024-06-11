import Cookies from "js-cookie";
import { apiURL } from "./base.api";

export const agregarPresupuesto = async (cliente: any, fecha: string, vencimiento: string, moneda: string, observaciones: string, productos: { producto: any, cantidad: number, precio: number, descripcion: string }[]) => {
    try {
        const token = Cookies.get('authToken');
        const productosData = productos.map(producto => (
            {
            producto: producto.producto.id,
            cantidad: producto.cantidad,
            precio: producto.precio,
            descripcion: producto.descripcion
        }));
        const response = await apiURL.post("presupuestos/agregar/", { cliente, fecha, vencimiento, moneda, observaciones, productos: productosData }, {
            headers: {
                Authorization: `Token ${token}`
            }
        });

        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const getPresupuestos = async (palabra_clave: string, fecha_inicio: string, fecha_fin: string, remitido: boolean) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.get(`presupuestos/listar/?palabra_clave=${palabra_clave}&fecha_inicio=${fecha_inicio}&fecha_fin=${fecha_fin}&remitido=${remitido}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const remitirPresupuesto = async (pk: number) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.put(`presupuestos/remitir/${pk}/`, {}, {
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