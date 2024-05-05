import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, Container, Grid, InputAdornment, Link, Paper, TextField, Typography } from '@mui/material';
import { registro, login } from '../../api/usuarios';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/notification.context';
import { RegistroValidate } from '../../utils/usuariosForm';

type RegistroType = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    celular: string;
    password: string;
    confirmPassword: string;
};

export const RegistroPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();
    const formik = useFormik<RegistroType>({
        initialValues: {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            celular: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: RegistroValidate,
        onSubmit: async (values: RegistroType) => {
            try {
                await registro(values.username, values.firstName, values.lastName, values.email, values.celular, values.password);
                getSuccess('Registro exitoso');
                await login(values.username, values.password);
                navigate('/registro_empresa');
            } catch (error: any) {
                if (error && error.message && error.message.includes('Network Error')) {
                    getError('No se está pudiendo establecer conexión');
                } else if (error && error.response && error.response.status === 400) {
                    getError('Usuario o contraseña inválido');
                } else {
                    getError(`Registro fallido: ${error.message}`);
                }
            }
        }
    });

    return (
        <Container maxWidth="sm">
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "50vh" }}>
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography sx={{ mt: 1, mb: 1 }} variant="h5">Registro de Usuario</Typography>
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
                            <TextField name="firstName"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Nombre"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                            />
                            <TextField name="lastName"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Apellido"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                            />
                            <TextField name="email"
                                margin="normal"
                                type="email"
                                fullWidth
                                label="Correo Electrónico"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField name="celular"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Celular"
                                value={formik.values.celular}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.celular && Boolean(formik.errors.celular)}
                                helperText={formik.touched.celular && formik.errors.celular}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+</InputAdornment>,
                                }}
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
                            <TextField name="confirmPassword"
                                margin="normal"
                                type="password"
                                fullWidth
                                label="Confirmar Contraseña"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1, mb: 2, fontSize: '20px' }} >Registrarse</Button>
                            <Link onClick={() => navigate("/login")} underline="hover">
                                {'¿Ya tenes cuenta? Inicia sesión'}
                            </Link>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
