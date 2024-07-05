import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from '../api/usuarios';

const ActivityMonitor: React.FC = () => {
    console.log('Componente ActivityMonitor montado'); 
    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log('Iniciando cierre de sesión');
        try {
            await logout();
            Cookies.remove('authToken');
            localStorage.setItem('logoutMessage', 'Sesión cerrada por inactividad');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const startInactivityTimer = () => {
        console.log('Iniciando temporizador de inactividad');
        const timerId = setTimeout(() => {
            const userResponse = window.confirm('Tu sesión se cerrará por inactividad en 10 minutos. ¿Deseas seguir conectado?');
            if (userResponse) {
                clearTimeout(timerId);
                startInactivityTimer();
            } else {
                setTimeout(handleLogout, 10000);
            }
        }, 20000);
        return timerId;
    };

    useEffect(() => {
        const timerId = startInactivityTimer();
        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return null;
};

export default ActivityMonitor;