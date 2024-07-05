import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNotification } from '../context/notification.context';
import { logout } from '../api/usuarios';

const ActivityMonitor: React.FC = () => {
    const navigate = useNavigate();
    const { getWarning } = useNotification();
    let inactivityTimeout: ReturnType<typeof setTimeout>;
    let warningTimeout: ReturnType<typeof setTimeout>;

    const handleActivity = () => {
        clearTimeout(inactivityTimeout);
        clearTimeout(warningTimeout);
        inactivityTimeout = setTimeout(handleLogout, 60000);
        warningTimeout = setTimeout(showWarning, 30000);
    };

    const showWarning = () => {
        getWarning('Tu sesión se cerrará por inactividad en 10 minutos.');
    };

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

    useEffect(() => {
        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keypress', handleActivity);

        // Start the inactivity timer
        handleActivity();

        return () => {
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keypress', handleActivity);
            clearTimeout(inactivityTimeout);
            clearTimeout(warningTimeout);
        };
    }, []);

    return null;
};

export default ActivityMonitor;

