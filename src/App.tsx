import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { AppRouter } from './Router';
import { NotificationProvider } from './context/notification.context';
import ActivityMonitor from './common/ActivityMonitor';
import { useAuth } from './context/auth.context';

function App() {
    const { isAuthenticated } = useAuth();

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
