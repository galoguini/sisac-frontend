import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notification.context";
import { useFormik } from "formik";
import { PresupuestoValidate } from "../../utils/presupuestosForm";
import { agregarPresupuesto } from "../../api/presupuestos";
import { Link, Autocomplete, Box, Button, Container, Grid, MenuItem, Paper, TextField, Typography, InputAdornment, Stack } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { getClientes } from "../../api/clientes";
import { getProductos } from "../../api/productos";
import { getDolarTarjeta } from "../../api/dolar.api";

type PresupuestoType = {
    cliente: ClienteType | null;
    fecha: string;
    vencimiento: string;
    moneda: string;
    observaciones: string;
    productos: ProductoType[];
};

type ProductosType = {
    id: number,
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

type ProductoType = {
    producto: ProductosType | null,
    cantidad: number,
    precio: number
}

type ClienteType = {
    id: number,
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
    const [productos, setProductos] = useState<ProductosType[]>([]);
    const [valorDolar, setValorDolar] = useState<number>(0);

    const valorDolarTarjeta = async () => {
        const dolarTarjeta = await getDolarTarjeta();
        setValorDolar(dolarTarjeta.venta);
    }

    const MONEDAS = [
        { value: 'ARS', label: 'Peso argentino' },
        { value: 'USD', label: 'Dólar estadounidense' },
    ];

    const fetchData = async () => {
        const clientesData = await getClientes("");
        const productosData = await getProductos("");

        setClientes(clientesData);
        setProductos(productosData);
    };

    useEffect(() => {
        fetchData();
        valorDolarTarjeta();
    }, []);

    const formik = useFormik({
        initialValues: {
            cliente: null,
            fecha: '',
            vencimiento: '',
            moneda: '',
            observaciones: '',
            productos: [
                { producto: null, precio: 0, cantidad: 1 }
            ],
        },
        validationSchema: PresupuestoValidate,
        onSubmit: async (values: PresupuestoType) => {
            try {
                const productosValidados = values.productos.filter(producto => producto.producto !== null);
                if (productosValidados.length === 0) {
                    getError('Debe agregar al menos un producto');
                    return;
                }

                const productosMapeados = productosValidados.map(producto => ({
                    producto: producto.producto,
                    cantidad: producto.cantidad,
                    precio: producto.precio
                }));

                const fecha = new Date(values.fecha);
                const fechaFormateada = `${fecha.getDate().toString().padStart(2, '0')}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getFullYear()}`;

                const vencimiento = new Date(values.vencimiento);
                const vencimientoFormateado = `${vencimiento.getDate().toString().padStart(2, '0')}-${(vencimiento.getMonth() + 1).toString().padStart(2, '0')}-${vencimiento.getFullYear()}`;

                await agregarPresupuesto(values.cliente?.nombre_apellido, fechaFormateada, vencimientoFormateado, values.moneda, values.observaciones, productosMapeados);
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
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                            <Typography variant="h4">Agregar presupuesto</Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                id="fecha"
                                name="fecha"
                                label="Fecha"
                                type="date"
                                sx={{
                                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                        filter: 'invert(1)',
                                    },
                                }}
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
                                sx={{
                                    '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                        filter: 'invert(1)',
                                    },
                                }}
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
                                id="observaciones"
                                name="observaciones"
                                multiline
                                rows={4}
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
                                onChange={(event) => {
                                    formik.handleChange(event);
                                    formik.values.productos.forEach((producto, index) => {
                                        if (producto.producto) {
                                            let nuevoPrecio = 0;
                                            if (event.target.value === 'ARS') {
                                                nuevoPrecio = parseFloat((producto.producto.precio_venta_usd * valorDolar).toFixed(2));
                                            } else if (event.target.value === 'USD') {
                                                nuevoPrecio = producto.producto.precio_venta_usd;
                                            }
                                            formik.setFieldValue(`productos[${index}].precio`, nuevoPrecio.toString());
                                        }
                                    });
                                }}
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
                                    option.tipo_identificacion === 'NO ESPECIFICADO'
                                        ? `${option.nombre_apellido}, ${option.pais}`
                                        : `${option.nombre_apellido}, ${option.pais}, ${option.tipo_identificacion === 'OTRO' ? 'Identificación: ' + option.otro_identificacion : option.tipo_identificacion}: ${option.numero_identificacion}`
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
                        </Paper>

                        {formik.values.productos.map((producto, index) => (
                            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", mt: 2 }}>
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        size="small"
                                        onClick={() => {
                                            const nuevosProductos = [...formik.values.productos];
                                            nuevosProductos.splice(index, 1);
                                            formik.setFieldValue('productos', nuevosProductos);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </Box>
                                <Autocomplete
                                    fullWidth
                                    options={productos}
                                    getOptionLabel={(option) => `${option.nombre} - $${option.precio_venta_usd}`}
                                    value={producto.producto}
                                    onChange={(_, newValue) => {
                                        if (newValue) {
                                            let nuevoPrecio = 0;
                                            if (formik.values.moneda === 'ARS') {
                                                nuevoPrecio = parseFloat((newValue.precio_venta_usd * valorDolar).toFixed(2));
                                            } else if (formik.values.moneda === 'USD') {
                                                nuevoPrecio = newValue.precio_venta_usd;
                                            }
                                            formik.setFieldValue(`productos[${index}].producto`, newValue);
                                            formik.setFieldValue(`productos[${index}].precio`, nuevoPrecio.toString());
                                        }
                                    }}
                                    isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Producto"
                                            margin="normal"
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.productos && Boolean(formik.errors.productos) && Boolean(formik.errors.productos[index]) && Boolean(formik.errors.productos[index].producto)}
                                            helperText={formik.touched.productos && Boolean(formik.errors.productos) && Boolean(formik.errors.productos[index]) && formik.errors.productos[index].producto}
                                        />
                                    }
                                />
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    id={`productos[${index}].precio`}
                                    name={`productos[${index}].precio`}
                                    label="Precio"
                                    type="text"
                                    InputProps={{
                                        inputProps: {
                                            maxLength: 20,
                                        },
                                        startAdornment: <InputAdornment position="start">{formik.values.moneda}</InputAdornment>,
                                    }}
                                    value={producto.precio}
                                    onChange={formik.handleChange}
                                    error={formik.touched.productos && Boolean(formik.errors.productos) && Boolean(formik.errors.productos[index]) && Boolean(formik.errors.productos[index].precio)}
                                    helperText={formik.touched.productos && Boolean(formik.errors.productos) && Boolean(formik.errors.productos[index]) && formik.errors.productos[index].precio}
                                />

                                <Stack direction="row" spacing={2} justifyContent="space-between">
                                    <Typography sx={{ mb: 1, fontSize: '0.75rem', textAlign: 'right' }}>
                                        *valor a pesos ya convertido
                                    </Typography>
                                    {formik.values.moneda === 'ARS' && (
                                        <Typography sx={{ mb: 1, fontSize: '0.75rem', textAlign: 'right' }}>
                                            *valor venta del dolar tarjeta actual: {valorDolar}
                                        </Typography>
                                    )}
                                </Stack>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    id={`productos[${index}].cantidad`}
                                    name={`productos[${index}].cantidad`}
                                    label="Cantidad"
                                    type="number"
                                    value={producto.cantidad}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.productos && Boolean(formik.errors.productos) && Boolean(formik.errors.productos[index]) && Boolean(formik.errors.productos[index].cantidad)}
                                    helperText={formik.touched.productos && Boolean(formik.errors.productos) && Boolean(formik.errors.productos[index]) && formik.errors.productos[index].cantidad}
                                />
                            </Paper>
                        ))}
                        <Box
                            display="flex"
                            alignItems="flex-start"
                        >
                            <Button
                                variant="contained"
                                color="info"
                                sx={{ mt: 1, fontSize: '16px' }}
                                onClick={() => {
                                    formik.setFieldValue('productos', [...formik.values.productos, { producto: null, precio: '', cantidad: 1 }]);
                                }}
                            >
                                <AddIcon />
                            </Button>
                        </Box>

                        <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", mt: 2 }}>

                            <Typography sx={{ mb: 1, fontSize: '1.5rem', textAlign: 'left' }}>
                                Monto total: {formik.values.moneda} {formik.values.productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
                            </Typography>

                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1, fontSize: '20px' }} >Agregar presupuesto</Button>
                            <Typography variant="body2" sx={{ mt: 2 }}>
                                Nota: El valor del dólar utilizado es proporcionado por{' '}
                                <Link href="https://dolarapi.com/docs/" target="_blank" rel="noopener noreferrer">
                                    dolarapi.com
                                </Link>
                            </Typography>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}