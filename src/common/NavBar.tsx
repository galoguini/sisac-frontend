import { AppBar, Box, Button, Container, Grid, Stack, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuth, logout } from '../api/usuarios';

export const NavBar: React.FC<{}> = () => {
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
            navigate('/');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="sticky">
                <Toolbar>
                    <Container maxWidth="xl">
                        <Grid container direction="row" justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Typography>SIBAC</Typography>
                            </Grid>
                            <Grid item>
                                <Stack direction="row" spacing={2}>
                                    {!isAuthenticated ? (
                                        <>
                                            <Button variant="contained" onClick={() => navigate("login")}>Login</Button>
                                            <Button variant="outlined" onClick={() => navigate("registro")}>Registro</Button>
                                        </>
                                    ) : (
                                        <Button variant="contained" onClick={handleLogout}>Logout</Button>
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