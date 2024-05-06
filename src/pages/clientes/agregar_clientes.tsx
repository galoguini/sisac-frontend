import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notification.context";
import { useFormik } from "formik";
import { clientesValidate } from "../../utils/clientesForm";
import { agregarCliente } from "../../api/clientes";
import { Box, Button, Container, Grid, InputAdornment, MenuItem, Paper, TextField, Typography } from "@mui/material";

type ClienteType = {
    nombre_apellido: string;
    tipo_identificacion: string;
    numero_identificacion: string;
    otro_identificacion: string;
    condicion_iva: string;
    pais: string;
    provincia: string;
    localidad: string;
    domicilio: string;
    email: string;
    telefono: string;
};

export const AgregarClientesPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();

    const IDENTIFICACION = [
        'CUIL',
        'CUIT',
        'DNI',
        'PASAPORTE',
        'OTRO',
    ]

    const CONDICION = [
        'RESPONSABLE INSCRIPTO',
        'MONOTRIBUTISTA',
        'EXTERIOR',
        'CONSUMIDOR FINAL',
        'IVA NO ALCANZADO',
    ]

    const formik = useFormik({
        initialValues: {
            nombre_apellido: '',
            tipo_identificacion: '',
            numero_identificacion: '',
            otro_identificacion: '',
            condicion_iva: '',
            pais: '',
            provincia: '',
            localidad: '',
            domicilio: '',
            email: '',
            telefono: '',
        },
        validationSchema: clientesValidate,
        onSubmit: async (values: ClienteType) => {
            try {
                await agregarCliente(values.nombre_apellido, values.tipo_identificacion, values.numero_identificacion, values.otro_identificacion, values.condicion_iva, values.pais, values.provincia, values.localidad, values.domicilio, values.email, values.telefono);
                getSuccess("Cliente agregado correctamente");
                navigate('/clientes');
            } catch (error: any) {
                if (error && error.message && error.message.includes('Network Error')) {
                    getError('No se está pudiendo establecer conexión');
                } else {
                    getError('Error inesperado al agregar el cliente');
                }
            }
        }
    });

    return (
        <Container sx={{ mt: 9 }} maxWidth="sm">
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "50vh" }}>
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography variant="h4">Agregar producto</Typography>
                        <Box component="form" onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Nombre y apellido"
                                name="nombre_apellido"
                                value={formik.values.nombre_apellido}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nombre_apellido && Boolean(formik.errors.nombre_apellido)}
                                helperText={formik.touched.nombre_apellido && formik.errors.nombre_apellido}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                select
                                label="Tipo de identificación"
                                name="tipo_identificacion"
                                value={formik.values.tipo_identificacion}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    if (e.target.value !== 'OTRO') {
                                        formik.setFieldValue('otro_identificacion', 'NO APLICA');
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tipo_identificacion && Boolean(formik.errors.tipo_identificacion)}
                                helperText={formik.touched.tipo_identificacion && formik.errors.tipo_identificacion}
                            >
                                {IDENTIFICACION.map((tipo) => (
                                    <MenuItem key={tipo} value={tipo}>
                                        {tipo}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {formik.values.tipo_identificacion === 'OTRO' && (
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    label="Otro tipo de identificación"
                                    name="otro_identificacion"
                                    value={formik.values.otro_identificacion}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.otro_identificacion && Boolean(formik.errors.otro_identificacion)}
                                    helperText={formik.touched.otro_identificacion && formik.errors.otro_identificacion}
                                />
                            )}
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Número de identificación"
                                name="numero_identificacion"
                                value={formik.values.numero_identificacion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.numero_identificacion && Boolean(formik.errors.numero_identificacion)}
                                helperText={formik.touched.numero_identificacion && formik.errors.numero_identificacion}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                select
                                label="Condición IVA"
                                name="condicion_iva"
                                value={formik.values.condicion_iva}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.condicion_iva && Boolean(formik.errors.condicion_iva)}
                                helperText={formik.touched.condicion_iva && formik.errors.condicion_iva}
                            >
                                {CONDICION.map((tipo) => (
                                    <MenuItem key={tipo} value={tipo}>
                                        {tipo}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="País"
                                name="pais"
                                value={formik.values.pais}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.pais && Boolean(formik.errors.pais)}
                                helperText={formik.touched.pais && formik.errors.pais}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Provincia"
                                name="provincia"
                                value={formik.values.provincia}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.provincia && Boolean(formik.errors.provincia)}
                                helperText={formik.touched.provincia && formik.errors.provincia}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Localidad"
                                name="localidad"
                                value={formik.values.localidad}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.localidad && Boolean(formik.errors.localidad)}
                                helperText={formik.touched.localidad && formik.errors.localidad}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Domicilio"
                                name="domicilio"
                                value={formik.values.domicilio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.domicilio && Boolean(formik.errors.domicilio)}
                                helperText={formik.touched.domicilio && formik.errors.domicilio}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Teléfono"
                                name="telefono"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                                helperText={formik.touched.telefono && formik.errors.telefono}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+</InputAdornment>,
                                }}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1, fontSize: '20px' }} >Agregar cliente</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
