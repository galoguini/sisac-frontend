import { AppBar, Box, Button, Container, Grid, Menu, MenuItem, Stack, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth, logout } from '../api/usuarios';
import { useNotification } from "../context/notification.context";
import { Home } from "@mui/icons-material";

export const NavBar: React.FC<{}> = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                                    {!isAuthenticated ? (
                                        <>
                                            <Button variant="contained" onClick={() => navigate("/")} size="large" startIcon={<Home />}>SIBAC</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="contained" onClick={() => navigate("/")} size="small" startIcon={<Home />}>SIBAC</Button>
                                            <Button variant="outlined" aria-controls="simple-menu" aria-haspopup="true" size="large" onClick={handleClick}>
                                                Ventas
                                            </Button>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleClose}
                                            >
                                                <MenuItem onClick={() => { navigate('/presupuestos'); handleClose(); }}>Presupuestos</MenuItem>
                                                <MenuItem onClick={() => { navigate('/clientes'); handleClose(); }}>Clientes</MenuItem>
                                                <MenuItem onClick={() => { navigate('/productos'); handleClose(); }}>Productos</MenuItem>
                                            </Menu>
                                        </>
                                    )}
                                </Stack>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" spacing={2}>
                                    {!isAuthenticated ? (
                                        <>
                                            <Button variant="contained" size="large" onClick={() => navigate("login")}>Login</Button>
                                            <Button variant="outlined" size="small" onClick={() => navigate("registro")}>Registro</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="outlined" size="large" onClick={() => navigate("empresa_provisional")}>Mi Empresa</Button>
                                            <Button variant="outlined" size="large" onClick={() => navigate("perfil")}>Mi Perfil</Button>
                                            <Button variant="contained" size="small" color="error" onClick={handleLogout}>Logout</Button>
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