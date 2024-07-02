import { Button, Container, FormControlLabel, IconButton, InputAdornment, Paper, Stack, Switch, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridSearchIcon } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";
import { eliminarPresupuesto, getPresupuestos } from "../../api/presupuestos";

type ProductoType = {
    producto: number,
    cantidad: number,
    precio: number
}

type PresupuestoType = {
    id: number;
    numero_presupuesto: number;
    cliente: string;
    fecha: string;
    vencimiento: string;
    moneda: string;
    observaciones: string;
    remitido: boolean;
    producto: ProductoType | null;
};

const sumarPreciosProductos = (productos: ProductoType[]) => {
    return productos.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
    }, 0);
};

const calcularTotalPresupuesto = (presupuesto: any) => {
    if (presupuesto.productos && presupuesto.productos.length > 0) {
        return sumarPreciosProductos(presupuesto.productos);
    }
    return 0;
};

export const PresupuestoPage: React.FC<{}> = () => {
    const [presupuestos, setPresupuestos] = useState<PresupuestoType[]>([]);
    const columns: GridColDef<PresupuestoType>[] = [
        {
            field: "numero_presupuesto",
            headerName: "nro. presupuesto",
            width: 121,
            editable: false,
            renderCell: (params) => (
                <Button 
                    variant="contained" 
                    color={params.row.remitido ? "info" : "warning"} 
                    onClick={() => {
                        navigate('/detalle_presupuesto', { state: { numeroPresupuesto: params.value } });
                    }}
                >
                    {params.value}
                </Button>
            ),
        },
        {
            field: "fecha",
            headerName: "Fecha",
            width: 101,
            editable: false,
        },
        {
            field: "vencimiento",
            headerName: "Vencimiento",
            width: 101,
            editable: false,
        },
        {
            field: "cliente",
            headerName: "Cliente",
            width: 300,
            editable: false,
        },
        {
            field: "moneda",
            headerName: "Moneda",
            width: 61,
            editable: false,
        },
        {
            field: "",
            headerName: "Monto total",
            width: 160,
            editable: false,
            renderCell: (params) => (
                <span>{calcularTotalPresupuesto(params.row).toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 2 })}</span>
            ),
        },
        {
            field: "observaciones",
            headerName: "Observaciones",
            width: 500,
            editable: false,
        },
    ];
    const [busqueda, setBusqueda] = useState('');
    const [busquedaTemporal, setBusquedaTemporal] = useState('');
    const { getSuccess, getError } = useNotification();
    const navigate = useNavigate();
    const [soloRemitidos, setSoloRemitidos] = useState(false);
    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

    const [fechaInicio, setFechaInicio] = useState(startOfMonth);
    const [fechaFin, setFechaFin] = useState(endOfMonth);

    const [idPresupuestoAEliminar, setIdPresupuestoAEliminar] = useState('');

    const cargarPresupuestos = async () => {
        try {
            const fechaInicioFormateada = fechaInicio ? `${(new Date(fechaInicio).getDate()).toString().padStart(2, '0')}-${(new Date(fechaInicio).getMonth() + 1).toString().padStart(2, '0')}-${new Date(fechaInicio).getFullYear()}` : '';
            const fechaFinFormateada = fechaFin ? `${(new Date(fechaFin).getDate()).toString().padStart(2, '0')}-${(new Date(fechaFin).getMonth() + 1).toString().padStart(2, '0')}-${new Date(fechaFin).getFullYear()}` : '';

            const data = await getPresupuestos(busqueda, fechaInicioFormateada, fechaFinFormateada, soloRemitidos);
            setPresupuestos(data);
            if (data.length === 0) {
                getError('No existe coincidencia con la búsqueda: ' + busqueda);
            }
        } catch (error: any) {
            getError('Ocurrió un error al cargar los productos');
        }
    };

    const handleEliminarPresupuesto = async () => {
        const presupuestoAEliminar = presupuestos.find((presupuesto) => presupuesto.numero_presupuesto === Number(idPresupuestoAEliminar));

        if (!presupuestoAEliminar) {
            getError('No se encontró el presupuesto a eliminar');
            return;
        }

        const confirmar = window.confirm(`¿Estás seguro de eliminar el presupuesto nro. ${presupuestoAEliminar.numero_presupuesto}?`);

        if (confirmar) {
            try {
                await eliminarPresupuesto(Number(idPresupuestoAEliminar));
                getSuccess('Presupuesto eliminado correctamente');
                cargarPresupuestos();
            } catch (error: any) {
                getError('Ocurrió un error al eliminar el presupuesto');
            }
        }
    }

    useEffect(() => {
        cargarPresupuestos();
    }, [busqueda, fechaInicio, fechaFin, soloRemitidos]);

    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="contained" color="success" onClick={() => navigate("/agregar_presupuesto")}>Agregar presupuesto</Button>
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="nro. Del presupuesto a eliminar"
                        variant="outlined"
                        fullWidth
                        value={idPresupuestoAEliminar}
                        onChange={(e) => setIdPresupuestoAEliminar(e.target.value)}
                    />
                    <Button variant="contained" color="error" onClick={handleEliminarPresupuesto}>Eliminar presupuesto</Button>
                </Stack>
            </Paper>
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Stack direction="row" spacing={0}>
                    <TextField
                        label="Buscar presupuesto"
                        variant="outlined"
                        onChange={(e) => setBusquedaTemporal(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setBusqueda(busquedaTemporal)}>
                                        <GridSearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Stack>
                <Stack direction="row" spacing={0}>
                    <FormControlLabel
                        control={
                            <Switch
                                color="info"
                                checked={soloRemitidos}
                                onChange={(event) => setSoloRemitidos(event.target.checked)}
                            />
                        }
                        label="Solo mostrar presupuestos remitidos"
                    />
                </Stack>
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Desde fecha"
                        variant="outlined"
                        type="date"
                        value={fechaInicio}
                        sx={{
                            '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                filter: 'invert(1)',
                            },
                        }}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Hasta fecha"
                        variant="outlined"
                        type="date"
                        value={fechaFin}
                        sx={{
                            '& input[type="date"]::-webkit-calendar-picker-indicator': {
                                filter: 'invert(1)',
                            },
                        }}
                        onChange={(e) => setFechaFin(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Stack>
            </Paper>
            <Paper sx={{ width: '100%', padding: "1.2em", borderRadius: "0.5em", mt: 4 }}>
                <Typography variant="h4">Listado de presupuestos</Typography>
                <DataGrid sx={{ mt: 2 }}
                    rows={presupuestos}
                    columns={columns}
                    localeText={{
                        noRowsLabel: '',
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20,
                            },
                        },
                    }}
                    pageSizeOptions={[20]}
                    disableRowSelectionOnClick
                    disableColumnResize
                    sortModel={[
                        {
                            field: 'numero_presupuesto',
                            sort: 'desc',
                        },
                    ]}
                />
            </Paper>
        </Container>
    );
}