import Cookies from "js-cookie";
import { apiURL } from "./base.api";

export const agregarEmpresa = async (nombre_empresa: string, nombre_fantasia: string, categoria_fiscal: string, tipo_cuenta: string, cuit: string, nro_ingresos_brutos: string, fecha_inicio_actividad: string, pais: string, direccion: string, provincia: string, localidad: string, telefono: string, email: string, CBU: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.post("empresas/agregar/", { nombre_empresa, nombre_fantasia, categoria_fiscal, tipo_cuenta, cuit, nro_ingresos_brutos, fecha_inicio_actividad, direccion, pais, provincia, localidad, telefono, email, CBU }, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getEmpresa = async () => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.get("empresas/listado/", {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editEmpresa = async (nombre_empresa: string, nombre_fantasia: string, categoria_fiscal: string, tipo_cuenta: string, cuit: string, nro_ingresos_brutos: string, fecha_inicio_actividad: string, pais: string, direccion: string, provincia: string, localidad: string, telefono: string, email: string, CBU: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.put("empresas/editar/", { nombre_empresa, nombre_fantasia, categoria_fiscal, tipo_cuenta, cuit, nro_ingresos_brutos, fecha_inicio_actividad, direccion, pais, provincia, localidad, telefono, email, CBU }, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const seleccionarEmpresa = async () => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.post(`empresas/seleccionar/`, {}, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}