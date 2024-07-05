import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRouter } from './Router';
import { NotificationProvider, useNotification } from './context/notification.context';
import ActivityMonitor from './common/ActivityMonitor';
import { checkAuth } from './api/usuarios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { getInfo } = useNotification();

    useEffect(() => {
        const authenticate = async () => {
            const authStatus = await checkAuth();
            setIsAuthenticated(authStatus);
            setIsLoading(false);
        };

        authenticate();
    }, []);

    if (isLoading) {
        getInfo('Obteniendo información de sesión...');
        return <div>Cargando...</div>;
    }

    return (
        <NotificationProvider>
            <BrowserRouter>
                {isAuthenticated && <ActivityMonitor />}
                <AppRouter />
            </BrowserRouter>
        </NotificationProvider>
    );
}

export default App;