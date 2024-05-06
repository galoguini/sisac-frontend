import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notification.context";
import { useFormik } from "formik";
import { PresupuestoValidate } from "../../utils/presupuestosForm";
import { agregarPresupuesto } from "../../api/presupuestos";
import { Autocomplete, Box, Button, Container, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { getClientes } from "../../api/clientes";
import { getProductos } from "../../api/productos";

type PresupuestoType = {
    cliente: string;
    fecha: string;
    vencimiento: string;
    moneda: string;
    cantidad: number;
    precio: number;
    observaciones: string;
    producto: string;
};


export const AgregarPresupuestoPage: React.FC<{}> = () => {
    const [busquedaCliente, setBusquedaCliente] = useState('');
    const [busquedaProducto, setBusquedaProducto] = useState('');
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);

    const MONEDAS = [
        'USD',
        'ARS',
    ]

    const fetchData = async () => {
        const clientesData = await getClientes(busquedaCliente);
        const productosData = await getProductos(busquedaProducto);

        setClientes(clientesData);
        setProductos(productosData);
    };

    useEffect(() => {

        fetchData();
    }, [busquedaCliente, busquedaProducto]);

    const formik = useFormik({
        initialValues: {
            cliente: '',
            fecha: '',
            vencimiento: '',
            moneda: '',
            cantidad: 0,
            precio: 0,
            observaciones: '',
            producto: '',
        },
        validationSchema: PresupuestoValidate,
        onSubmit: async (values: PresupuestoType) => {
            try {
                await agregarPresupuesto(values.cliente, values.fecha, values.vencimiento, values.moneda, values.cantidad, values.precio, values.observaciones, values.producto);
                getSuccess("Presupuesto agregado correctamente");
                navigate('/presupuestos');
            } catch (error: any) {
                if (error && error.message && error.message.includes('Network Error')) {
                    getError('No se está pudiendo establecer conexión');
                } else {
                    getError('Error inesperado al agregar el presupuesto');
                }
            }
        }
    });

    return (
        <Container sx={{ mt: 9 }} maxWidth="sm">
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "50vh" }}>
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography variant="h4">Agregar presupuesto</Typography>
                        <Box component="form" onSubmit={formik.handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                id="fecha"
                                name="fecha"
                                label="Fecha"
                                type="date"
                                value={formik.values.fecha}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fecha && Boolean(formik.errors.fecha)}
                                helperText={formik.touched.fecha && formik.errors.fecha}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                id="vencimiento"
                                name="vencimiento"
                                label="Vencimiento"
                                type="date"
                                value={formik.values.vencimiento}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.vencimiento && Boolean(formik.errors.vencimiento)}
                                helperText={formik.touched.vencimiento && formik.errors.vencimiento}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                id="cantidad"
                                name="cantidad"
                                label="Cantidad"
                                type="number"
                                value={formik.values.cantidad}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.cantidad && Boolean(formik.errors.cantidad)}
                                helperText={formik.touched.cantidad && formik.errors.cantidad}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                id="precio"
                                name="precio"
                                label="Precio"
                                type="number"
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.precio && Boolean(formik.errors.precio)}
                                helperText={formik.touched.precio && formik.errors.precio}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                id="observaciones"
                                name="observaciones"
                                label="Observaciones"
                                value={formik.values.observaciones}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.observaciones && Boolean(formik.errors.observaciones)}
                                helperText={formik.touched.observaciones && formik.errors.observaciones}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                id="moneda"
                                name="moneda"
                                select
                                label="Moneda"
                                value={formik.values.moneda}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.moneda && Boolean(formik.errors.moneda)}
                                helperText={formik.touched.moneda && formik.errors.moneda}
                            >
                                {MONEDAS.map((tipo) => (
                                    <MenuItem key={tipo} value={tipo}>
                                        {tipo}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Autocomplete
                                fullWidth
                                options={clientes}
                                getOptionLabel={(option) => option.nombre_apellido}
                                value={formik.values.cliente}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue('cliente', newValue ? newValue.nombre_apellido : '');
                                }}
                                renderInput={(params) => <TextField {...params} label="Cliente" margin="normal" />}
                            />
                            <Autocomplete
                                fullWidth
                                options={productos}
                                getOptionLabel={(option) => option.nombre}
                                value={formik.values.producto}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue('producto', newValue ? newValue.nombre : '');
                                }}
                                renderInput={(params) => <TextField {...params} label="Producto" margin="normal" />}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1, fontSize: '20px' }} >Agregar presupuesto</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}