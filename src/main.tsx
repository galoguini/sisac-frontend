import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ThemeConfig } from './config/theme.config';
import { AuthProvider } from './context/auth.context';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeConfig>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeConfig>
  </React.StrictMode>,
);
