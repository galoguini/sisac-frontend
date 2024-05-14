import { Box, Button, Container, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notification.context";
import { useFormik } from "formik";
import { ProductoValidate } from "../../utils/productosForm";
import { agregarProducto } from "../../api/productos";

type ProductoType = {
    nombre: string;
    codigo_sku: string;
    codigo_barra: string;
    categoria: string;
    tasa_iva: string;
    unidad_medida: string;
    precio_venta_usd: number;
    stock: number;
    observaciones: string;
};

export const AgregarProductoPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();

    const CATEGORIAS = [
        'SERVICIO',
        'PRODUCTO',
        'OTRO',
    ];

    const TASA = [
        'IVA EXENTO',
        'IVA NO GRAVADO',
        '0.0',
        '2.5',
        '5.0',
        '10.5',
        '21.0',
        '27.0',
    ];

    const MEDIDA = [
        'UNIDAD',
        'KILO',
        'LITRO',
        'METRO',
        'OTRO',
    ];

    const formik = useFormik<ProductoType>({
        initialValues: {
            nombre: "",
            codigo_sku: "",
            codigo_barra: "",
            categoria: "",
            tasa_iva: "",
            unidad_medida: "",
            precio_venta_usd: 0,
            stock: 1,
            observaciones: "",
        },
        validationSchema: ProductoValidate,
        onSubmit: async (values: ProductoType) => {
            try {
                await agregarProducto(values.nombre, values.codigo_sku, values.codigo_barra, values.categoria, values.tasa_iva, values.unidad_medida, values.precio_venta_usd, values.stock, values.observaciones);
                getSuccess("Producto agregado correctamente");
                navigate("/productos");
            } catch (error: any) {
                if (error && error.message && error.message.includes('Network Error')) {
                    getError('No se está pudiendo establecer conexión');
                } else {
                    getError('Error inesperado al agregar el producto');
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
                                label="Nombre"
                                name="nombre"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.nombre && Boolean(formik.errors.nombre)}
                                helperText={formik.touched.nombre && formik.errors.nombre}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Código SKU"
                                name="codigo_sku"
                                value={formik.values.codigo_sku}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.codigo_sku && Boolean(formik.errors.codigo_sku)}
                                helperText={formik.touched.codigo_sku && formik.errors.codigo_sku}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Código de barra"
                                name="codigo_barra"
                                value={formik.values.codigo_barra}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.codigo_barra && Boolean(formik.errors.codigo_barra)}
                                helperText={formik.touched.codigo_barra && formik.errors.codigo_barra}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                select
                                label="Categoría"
                                name="categoria"
                                value={formik.values.categoria}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    if (e.target.value !== 'PRODUCTO') {
                                        formik.setFieldValue('stock', 0);
                                    }
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.categoria && Boolean(formik.errors.categoria)}
                                helperText={formik.touched.categoria && formik.errors.categoria}
                            >
                                {CATEGORIAS.map((tipo) => (
                                    <MenuItem key={tipo} value={tipo}>
                                        {tipo}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                select
                                label="Tasa de IVA"
                                name="tasa_iva"
                                value={formik.values.tasa_iva}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tasa_iva && Boolean(formik.errors.tasa_iva)}
                                helperText={formik.touched.tasa_iva && formik.errors.tasa_iva}
                            >
                                {TASA.map((tipo) => (
                                    <MenuItem key={tipo} value={tipo}>
                                        {tipo}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                select
                                label="Unidad de medida"
                                name="unidad_medida"
                                value={formik.values.unidad_medida}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.unidad_medida && Boolean(formik.errors.unidad_medida)}
                                helperText={formik.touched.unidad_medida && formik.errors.unidad_medida}
                            >
                                {MEDIDA.map((tipo) => (
                                    <MenuItem key={tipo} value={tipo}>
                                        {tipo}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Precio de venta (USD)"
                                name="precio_venta_usd"
                                inputProps={{ maxLength: 15 }}
                                value={formik.values.precio_venta_usd}
                                onBlur={formik.handleBlur}
                                onChange={(event) => {
                                    const value = event.target.value;
                                    if ((value.match(/\./g) || []).length > 1) {
                                        return;
                                    }
                                    formik.handleChange(event);
                                }}
                                error={formik.touched.precio_venta_usd && Boolean(formik.errors.precio_venta_usd)}
                                helperText={formik.touched.precio_venta_usd && formik.errors.precio_venta_usd}
                            />
                            {formik.values.categoria === 'PRODUCTO' && (
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                label="Stock"
                                name="stock"
                                value={formik.values.stock}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.stock && Boolean(formik.errors.stock)}
                                helperText={formik.touched.stock && formik.errors.stock}
                            />
                            )}
                            <TextField
                                fullWidth
                                margin="normal"
                                variant="outlined"
                                multiline
                                rows={4}
                                label="Observaciones"
                                name="observaciones"
                                value={formik.values.observaciones}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.observaciones && Boolean(formik.errors.observaciones)}
                                helperText={formik.touched.observaciones && formik.errors.observaciones}
                            />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1, fontSize: '20px' }} >Agregar Producto</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}