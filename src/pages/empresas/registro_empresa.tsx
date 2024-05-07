import React from "react";
import { Box, Button, Container, FormControl, Grid, InputLabel, Paper, Select, TextField, Typography, MenuItem, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import { useNotification } from "../../context/notification.context";
import { agregarEmpresa, seleccionarEmpresa } from "../../api/empresa";
import { EmpresaValidate } from "../../utils/empresasForm";
import { useNavigate } from "react-router-dom";

type EmpresaType = {
    nombre_empresa: string;
    nombre_fantasia: string;
    categoria_fiscal: string;
    tipo_cuenta: string;
    cuit: string;
    nro_ingresos_brutos: string;
    fecha_inicio_actividad: string;
    direccion: string;
    provincia: string;
    localidad: string;
    telefono: string;
    email: string;
    CBU: string;
};

export const RegistroEmpresaPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const CATEGORIAS = [
        'Consumidor Final',
        'Exento',
        'Exterior',
        'Monotributista',
        'Responsable Inscripto',
    ];

    const TIPOS = [
        'Persona Jurídica',
        'Persona Humana',
    ];

    const { getSuccess, getError } = useNotification();

    const formik = useFormik<EmpresaType>({
        initialValues: {
            nombre_empresa: '',
            nombre_fantasia: '',
            categoria_fiscal: '',
            tipo_cuenta: '',
            cuit: '',
            nro_ingresos_brutos: '',
            fecha_inicio_actividad: '',
            direccion: '',
            provincia: '',
            localidad: '',
            telefono: '',
            email: '',
            CBU: '',
        },
        validationSchema: EmpresaValidate,
        onSubmit: async (values: EmpresaType) => {
            try {
                const fecha = new Date(values.fecha_inicio_actividad);
                const fechaInicioActividadFormateada = `${fecha.getDate().toString().padStart(2, '0')}-${(fecha.getMonth()+1).toString().padStart(2, '0')}-${fecha.getFullYear()}`;
        
                await agregarEmpresa(values.nombre_empresa, values.nombre_fantasia, values.categoria_fiscal, values.tipo_cuenta, values.cuit, values.nro_ingresos_brutos, fechaInicioActividadFormateada, values.direccion, values.provincia, values.localidad, values.telefono, values.email, values.CBU);
                getSuccess("Empresa agregada exitosamente");
                await seleccionarEmpresa();
                navigate('/');
            } catch (error: any) {
                if (error && error.message && error.message.includes('Network Error')) {
                    getError('No se está pudiendo establecer conexión');
                } else {
                    getError('Error inesperado al agregar la empresa');
                }
            }
        }
    });

    return (
        <Container maxWidth="sm">
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "50vh" }}>
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography sx={{ mt: 1, mb: 1 }} variant="h5">Agregar Empresa</Typography>
                        <Box component="form" onSubmit={formik.handleSubmit}>
                            <TextField name="nombre_empresa"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Nombre de la empresa"
                                value={formik.values.nombre_empresa}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nombre_empresa && Boolean(formik.errors.nombre_empresa)}
                                helperText={formik.touched.nombre_empresa && formik.errors.nombre_empresa}
                            />
                            <TextField name="nombre_fantasia"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Nombre de fantasía"
                                value={formik.values.nombre_fantasia}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nombre_fantasia && Boolean(formik.errors.nombre_fantasia)}
                                helperText={formik.touched.nombre_fantasia && formik.errors.nombre_fantasia}
                            />
                            <Box sx={{ mt: 2}}>
                                <FormControl fullWidth>
                                    <InputLabel id="categoria-fiscal-label">Categoría Fiscal</InputLabel>
                                    <Select
                                        labelId="categoria-fiscal-label"
                                        id="categoria-fiscal"
                                        value={formik.values.categoria_fiscal}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.categoria_fiscal && Boolean(formik.errors.categoria_fiscal)}
                                        name="categoria_fiscal"
                                    >
                                        {CATEGORIAS.map((categoria) => (
                                            <MenuItem key={categoria} value={categoria}>
                                                {categoria}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ mt: 3, mb: 1 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="tipo-cuenta-label">Tipo de Cuenta</InputLabel>
                                    <Select
                                        labelId="tipo-cuenta-label"
                                        id="tipo-cuenta"
                                        value={formik.values.tipo_cuenta}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.tipo_cuenta && Boolean(formik.errors.tipo_cuenta)}
                                        name="tipo_cuenta"
                                    >
                                        {TIPOS.map((tipo) => (
                                            <MenuItem key={tipo} value={tipo}>
                                                {tipo}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <TextField name="cuit"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="CUIT"
                                inputProps={{ maxLength: 11 }}
                                value={formik.values.cuit}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.cuit && Boolean(formik.errors.cuit)}
                                helperText={formik.touched.cuit && formik.errors.cuit}
                            />
                            <TextField name="nro_ingresos_brutos"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Número de ingresos brutos"
                                value={formik.values.nro_ingresos_brutos}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nro_ingresos_brutos && Boolean(formik.errors.nro_ingresos_brutos)}
                                helperText={formik.touched.nro_ingresos_brutos && formik.errors.nro_ingresos_brutos}
                            />
                            <TextField name="fecha_inicio_actividad"
                                margin="normal"
                                type="date"
                                fullWidth
                                label="Fecha de inicio de actividad"
                                value={formik.values.fecha_inicio_actividad}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fecha_inicio_actividad && Boolean(formik.errors.fecha_inicio_actividad)}
                                helperText={formik.touched.fecha_inicio_actividad && formik.errors.fecha_inicio_actividad}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField name="direccion"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Dirección"
                                value={formik.values.direccion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                                helperText={formik.touched.direccion && formik.errors.direccion}
                            />
                            <TextField name="provincia"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Provincia"
                                value={formik.values.provincia}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.provincia && Boolean(formik.errors.provincia)}
                                helperText={formik.touched.provincia && formik.errors.provincia}
                            />
                            <TextField name="localidad"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Localidad"
                                value={formik.values.localidad}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.localidad && Boolean(formik.errors.localidad)}
                                helperText={formik.touched.localidad && formik.errors.localidad}
                            />
                            <TextField name="telefono"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="Teléfono"
                                value={formik.values.telefono}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                                helperText={formik.touched.telefono && formik.errors.telefono}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">+</InputAdornment>,
                                }}
                            />
                            <TextField name="email"
                                margin="normal"
                                type="email"
                                fullWidth
                                label="Email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                            <TextField name="CBU"
                                margin="normal"
                                type="text"
                                fullWidth
                                label="CBU"
                                inputProps={{ maxLength: 22 }}
                                value={formik.values.CBU}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.CBU && Boolean(formik.errors.CBU)}
                                helperText={formik.touched.CBU && formik.errors.CBU}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1, fontSize: '20px' }} >Agregar Empresa</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}