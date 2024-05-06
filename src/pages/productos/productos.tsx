import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { eliminarProducto, getProductos } from "../../api/productos";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notification.context";

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
    id: number;
};


const columns: GridColDef<ProductoType>[] = [
    {
        field: "nombre",
        headerName: "Nombre",
        width: 300,
        editable: false,
    },
    {
        field: "categoria",
        headerName: "Categoría",
        width: 100,
        editable: false,
    },
    {
        field: "tasa_iva",
        headerName: "Tasa IVA",
        width: 150,
        editable: false,
    },
    {
        field: "unidad_medida",
        headerName: "Unidad de medida",
        width: 150,
        editable: false,
    },
    {
        field: "observaciones",
        headerName: "Observaciones",
        width: 300,
        editable: false,
    },
    {
        field: "id",
        headerName: "ID",
        width: 100,
        editable: false,
    },
    {
        field: "precio_venta_usd",
        headerName: "Precio (USD)",
        width: 100,
        editable: false,
    },
    {
        field: "stock",
        headerName: "Stock",
        width: 25,
        editable: false,
    },
    {
        field: "codigo_sku",
        headerName: "SKU",
        width: 150,
        editable: false,
    },
    {
        field: "codigo_barra",
        headerName: "Código de barra",
        width: 150,
        editable: false,
    },
];

export const ProductoPage: React.FC<{}> = () => {
    const [busqueda, setBusqueda] = useState('');
    const { getSuccess, getError } = useNotification();
    const navigate = useNavigate();
    const [productos, setProductos] = useState<ProductoType[]>([]);
    const [idProductoAEliminar, setIdProductoAEliminar] = useState('');

    const handleEliminarProducto = async () => {
        const productoAEliminar = productos.find(producto => producto.id === Number(idProductoAEliminar));
    
        if (!productoAEliminar) {
            getError('No se encontró el producto con el ID especificado');
            return;
        }
    
        const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar el producto "${productoAEliminar.nombre}"?`);
    
        if (confirmacion) {
            try {
                await eliminarProducto(Number(idProductoAEliminar));
                getSuccess('Producto eliminado con éxito');
            } catch (error) {
                getError('Error al eliminar el producto');
            }
        }
    };

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                const data = await getProductos(busqueda);
                setProductos(data);
                if (data.length === 0) {
                    getError('No existen coincidencias con la búsqueda: ' + busqueda);
                }
            } catch (error) {
                getError('Error al cargar los productos');
            }
        };

        cargarProductos();
    }, [busqueda]);

    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", display: 'flex', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={2}>
                <TextField 
                    label="Buscar producto" 
                    variant="outlined" 
                    value={busqueda} 
                    onChange={(e) => setBusqueda(e.target.value)} 
                />
                </Stack>
                <Button variant="contained" color="success" onClick={() => navigate("/agregar_producto")}>Agregar producto</Button>
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="ID del producto a eliminar"
                        variant="outlined"
                        value={idProductoAEliminar}
                        onChange={(e) => setIdProductoAEliminar(e.target.value)}
                    />
                    <Button variant="contained" color="error" onClick={handleEliminarProducto}>Eliminar producto</Button>
                </Stack>
            </Paper>
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", mt: 4 }}>
                <Typography variant="h4">Listado de productos</Typography>
                <DataGrid sx={{ mt: 2 }}
                    rows={productos}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20,
                            },
                        },
                    }}
                    pageSizeOptions={[20]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </Container>
    );
}