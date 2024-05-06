import Cookies from "js-cookie";
import { apiURL } from "./base.api";

export const agregarCliente = async (nombre_apellido: string, tipo_identificacion: string, numero_identificacion: string, otro_identificacion: string, condicion_iva: string, pais: string, provincia: string, localidad: string, domicilio: string, email: string, telefono: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.post("clientes/alta/", { nombre_apellido, tipo_identificacion, numero_identificacion, otro_identificacion, condicion_iva, pais, provincia, localidad, domicilio, email, telefono }, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getClientes = async (palabra_clave: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.get(`clientes/listado/?palabra_clave=${palabra_clave}`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const eliminarCliente = async (id: number) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.delete(`clientes/eliminar/${id}/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}