import Cookies from 'js-cookie';
import { apiURL } from "./base.api"

export const login = async (username: string, password: string) => {
    try {
        const response = await apiURL.post("usuarios/login/", { username, password });
        Cookies.set('authToken', response.data.token);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const registro = async (username: string, first_name: string, last_name:string, email: string, celular: string, password: string) => {
    try {
        const response = await apiURL.post("usuarios/registro/", { username, first_name, last_name, email, celular, password});
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logout = async () => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.post("usuarios/logout/", {}, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        Cookies.remove('authToken');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const checkAuth = () => {
    const token = Cookies.get('authToken');
    return token ? true : false;
};

export const getUser = async () => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.get("usuarios/perfil/", {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const editUser = async (first_name: string, last_name: string, email: string, celular: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.put("usuarios/editar_perfil/", { first_name, last_name, email, celular }, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateSMTPInfo = async (email_smtp: string, smtp_app_password: string) => {
    try {
        const token = Cookies.get('authToken');
        const response = await apiURL.put("usuarios/update_smtp_info/", { email_smtp, smtp_app_password }, {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const enviarEmail = async (emailDetails: { destinatario: string; asunto: string; mensaje: string; }, blob: Blob) => {
    try {
        const token = Cookies.get('authToken');
        const formData = new FormData();
        formData.append("destinatario", emailDetails.destinatario);
        formData.append("asunto", emailDetails.asunto);
        formData.append("mensaje", emailDetails.mensaje);
        formData.append("pdf", blob);

        const response = await apiURL.post("/usuarios/send-email/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Token ${token}`
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error enviando email", error);
        throw error;
    }
};