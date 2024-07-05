import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRouter } from './Router';
import { NotificationProvider } from './context/notification.context';
import ActivityMonitor from './common/ActivityMonitor';
import { checkAuth } from './api/usuarios';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const authenticate = async () => {
            const authStatus = await checkAuth();
            console.log('Auth status:', authStatus);
            setIsAuthenticated(authStatus);
            setIsLoading(false);
        };

        authenticate();
    }, []);

    if (isLoading) {
        console.log('Obteniendo información de sesión...');
        return <div>Obteniendo información de sesión...</div>;
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
