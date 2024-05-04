import { AppBar, Box, Button, Container, Grid, Stack, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth, logout } from '../api/usuarios';
import { useNotification } from "../context/notification.context";

export const NavBar: React.FC<{}> = () => {
    const { getSuccess, getError } = useNotification();
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = checkAuth();
        setIsAuthenticated(authStatus);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setIsAuthenticated(false);
            getSuccess('Sesión cerrada con éxito');
            navigate('/');
        } catch (error) {
            getError('Error al cerrar sesión');
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Stack direction="row" spacing={2}>
                                    {/* <Typography>SIBAC</Typography> */}
                                    <Button variant="text" onClick={() => navigate("/")}>Home</Button>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" spacing={2}>
                                    {!isAuthenticated ? (
                                        <>
                                            <Button variant="contained" onClick={() => navigate("login")}>Login</Button>
                                            <Button variant="outlined" onClick={() => navigate("registro")}>Registro</Button>
                                        </>
                                    ) : (
                                        <>
                                        <Button variant="contained" onClick={() => navigate("perfil")}>Perfil</Button>
                                        <Button variant="text" onClick={handleLogout}>Logout</Button>
                                        </>
                                    )}
                                </Stack>
                            </Grid>
                        </Grid>
                    </Container>
                </Toolbar>
            </AppBar>
        </Box>
    );
}