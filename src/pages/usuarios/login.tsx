import React from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography, Link } from "@mui/material";
import { useNotification } from "../../context/notification.context";
import { LoginValidate } from "../../utils/usuariosForm";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { login } from '../../api/usuarios';

type LoginType = {
    username: string;
    password: string;
};

export const LoginPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();
    const formik = useFormik<LoginType>({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: LoginValidate,
        onSubmit: async (values: LoginType) => {
            try {
                await login(values.username, values.password);
                getSuccess("Login exitoso");
                navigate('/');
            } catch (error: any) {
                if (error && error.message && error.message.includes('Network Error')) {
                    getError('No se está pudiendo establecer conexión');
                } else if (error && error.response && error.response.status === 400) {
                    getError('Usuario o contraseña inválido');
                } else {
                    getError('Error en el inicio de sesión inesperado');
                }
            }
        }
    });

    return (
        <Container maxWidth="sm">
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "50vh" }}>
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography sx={{ mt: 1, mb: 1 }} variant="h5">Sistema de Administración Contable</Typography>
                        <Box component="form" onSubmit={formik.handleSubmit}>
                            <TextField name="username"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="CUIL"
                                inputProps={{ maxLength: 11 }}
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && formik.errors.username}
                            />
                            <TextField name="password"
                                margin="normal"
                                type="password"
                                fullWidth
                                label="Contraseña"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1, mb: 2, fontSize: '20px' }} >Iniciar sesión</Button>
                            <Link onClick={() => navigate("/registro")} underline="hover">
                                {'¿No tenes cuenta? Regístrate'}
                            </Link>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}