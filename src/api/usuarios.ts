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

