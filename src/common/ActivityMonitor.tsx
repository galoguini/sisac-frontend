import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { logout } from '../api/usuarios';

const ActivityMonitor: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
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
        const timerId = setTimeout(() => {
            const userResponse = window.confirm('Tu sesión se cerrará por inactividad en 10 minutos. ¿Deseas seguir conectado?');
            if (userResponse) {
                clearTimeout(timerId);
                startInactivityTimer();
            } else {
                setTimeout(handleLogout, 30000);
            }
        }, 30000);
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