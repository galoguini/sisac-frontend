import Cookies from "js-cookie";
import { apiURL } from "./base.api";

export const agregarEmpresa = async (nombre_empresa: string, nombre_fantasia: string, categoria_fiscal: string, tipo_cuenta: string, cuit: string, nro_ingresos_brutos: string, fecha_inicio_actividad: string, pais: string, direccion: string, provincia: string, localidad: string, telefono: string, email: string, CBU: string, logo: File) => {
    try {
        const token = Cookies.get('authToken');

        const formData = new FormData();
        formData.append('nombre_empresa', nombre_empresa);
        formData.append('nombre_fantasia', nombre_fantasia);
        formData.append('categoria_fiscal', categoria_fiscal);
        formData.append('tipo_cuenta', tipo_cuenta);
        formData.append('cuit', cuit);
        formData.append('nro_ingresos_brutos', nro_ingresos_brutos);
        formData.append('fecha_inicio_actividad', fecha_inicio_actividad);
        formData.append('direccion', direccion);
        formData.append('pais', pais);
        formData.append('provincia', provincia);
        formData.append('localidad', localidad);
        formData.append('telefono', telefono);
        formData.append('email', email);
        formData.append('CBU', CBU);
        if (logo) {
            formData.append('logo', logo, logo.name);
        }

        const response = await apiURL.post("empresas/agregar/", formData, {
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