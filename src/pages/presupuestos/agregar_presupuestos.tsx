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
    cliente: ClienteType | null;
    fecha: string;
    vencimiento: string;
    moneda: string;
    cantidad: number;
    precio: string;
    observaciones: string;
    producto: ProductoType | null;
};

type ProductoType = {
    nombre: string,
    codigo_sku: string,
    codigo_barra: string,
    categoria: string,
    tasa_iva: string,
    unidad_medida: string,
    precio_venta_usd: number,
    stock: number,
    observaciones: string
}

type ClienteType = {
    nombre_apellido: string,
    tipo_identificacion: string,
    numero_identificacion: string,
    otro_identificacion: string,
    condicion_iva: string,
    pais: string,
    provincia: string,
    localidad: string,
    domicilio: string,
    email: string,
    telefono: string
}

export const AgregarPresupuestoPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();
    const [clientes, setClientes] = useState<ClienteType[]>([]);
    const [productos, setProductos] = useState<ProductoType[]>([]);

    const MONEDAS = [
        { value: 'ARS', label: 'Peso argentino' },
        { value: 'USD', label: 'Dólar estadounidense' },
        { value: 'EUR', label: 'Euro' },
    ];

    const fetchData = async () => {
        const clientesData = await getClientes("");
        const productosData = await getProductos("");

        setClientes(clientesData);
        setProductos(productosData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const formik = useFormik({
        initialValues: {
            cliente: null,
            fecha: '',
            vencimiento: '',
            moneda: '',
            cantidad: 1,
            precio: '',
            observaciones: '',
            producto: null,
        },
        validationSchema: PresupuestoValidate,
        onSubmit: async (values: PresupuestoType) => {
            try {
                const fecha = new Date(values.fecha);
                const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getFullYear()}`;

                const vencimiento = new Date(values.vencimiento);
                const vencimientoFormateado = `${vencimiento.getDate().toString().padStart(2, '0')}-${(vencimiento.getMonth() + 1).toString().padStart(2, '0')}-${vencimiento.getFullYear()}`;

                const clienteString = values.cliente ? values.cliente.nombre_apellido : '';
                const productoString = values.producto ? values.producto.nombre : '';

                await agregarPresupuesto(clienteString, fechaFormateada, vencimientoFormateado, values.moneda, values.cantidad, values.precio, values.observaciones, productoString);
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
                                type="text"
                                inputProps={{ maxLength: 20 }}
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
                                    <MenuItem key={tipo.value} value={tipo.value}>
                                        {tipo.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <Autocomplete
                                fullWidth
                                options={clientes}
                                getOptionLabel={(option) => 
                                    `${option.nombre_apellido}, ${option.pais}, ${option.tipo_identificacion === 'OTRO' ? 'Identificación: ' + option.otro_identificacion : option.tipo_identificacion}: ${option.numero_identificacion}`
                                }
                                value={formik.values.cliente}
                                onChange={(_, newValue) => {
                                    formik.setFieldValue('cliente', newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.nombre_apellido === value.nombre_apellido}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Cliente"
                                        margin="normal"
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.cliente && Boolean(formik.errors.cliente)}
                                        helperText={formik.touched.cliente && formik.errors.cliente}
                                    />
                                }
                            />
                            <Autocomplete
                                fullWidth
                                options={productos}
                                getOptionLabel={(option) => option.nombre}
                                value={formik.values.producto}
                                onChange={(_, newValue) => {
                                    formik.setFieldValue('producto', newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        label="Producto"
                                        margin="normal"
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.producto && Boolean(formik.errors.producto)}
                                        helperText={formik.touched.producto && formik.errors.producto}
                                    />
                                }
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1, fontSize: '20px' }} >Agregar presupuesto</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}