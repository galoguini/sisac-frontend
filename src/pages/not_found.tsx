import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                textAlign="center"
            >
                <Typography variant="h1" component="h1" gutterBottom>
                    - 404 -
                </Typography>
                <Typography variant="h4" component="h2" gutterBottom>
                    Página No Encontrada
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    Lo sentimos, la página que estás buscando no existe.
                </Typography>
                <Button sx={{ mt: 2 }} variant="contained" color="primary" onClick={handleGoHome} size="large">
                    Volver al Inicio
                </Button>
            </Box>
        </Container>
    );
};
