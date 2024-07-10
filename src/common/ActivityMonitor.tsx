import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/usuarios';
import { useAuth } from '../context/auth.context';
import { useNotification } from '../context/notification.context';

const WARNING_TIMEOUT = 3000000;
const FINAL_LOGOUT_TIMEOUT = 600000;

const ActivityMonitor: React.FC = () => {
    const navigate = useNavigate();
    const { performLogout } = useAuth();
    const { getWarning } = useNotification();
    const warningTimerId = useRef<ReturnType<typeof setTimeout> | null>(null);
    const finalLogoutTimerId = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleLogout = async () => {
        try {
            await logout();
            performLogout();
            localStorage.setItem('logoutMessage', 'Sesión cerrada por inactividad');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const showWarning = () => {
        getWarning('Tu sesión se cerrará por inactividad en 10 minutos.');
    };

    const resetInactivityTimer = () => {
        if (warningTimerId.current) {
            clearTimeout(warningTimerId.current);
        }
        if (finalLogoutTimerId.current) {
            clearTimeout(finalLogoutTimerId.current);
        }
        warningTimerId.current = setTimeout(showWarning, WARNING_TIMEOUT);
        finalLogoutTimerId.current = setTimeout(handleLogout, WARNING_TIMEOUT + FINAL_LOGOUT_TIMEOUT);
    };

    useEffect(() => {
        const events = ['click', 'mousemove', 'keypress', 'scroll', 'touchstart'];

        const handleUserActivity = () => {
            resetInactivityTimer();
        };

        events.forEach((event) => {
            window.addEventListener(event, handleUserActivity);
        });

        resetInactivityTimer();

        return () => {
            if (warningTimerId.current) {
                clearTimeout(warningTimerId.current);
            }
            if (finalLogoutTimerId.current) {
                clearTimeout(finalLogoutTimerId.current);
            }
            events.forEach((event) => {
                window.removeEventListener(event, handleUserActivity);
            });
        };
    }, []);

    return null;
};

export default ActivityMonitor;