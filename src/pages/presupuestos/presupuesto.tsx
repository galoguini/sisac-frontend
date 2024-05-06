import { Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";
import { getPresupuestos } from "../../api/presupuestos";
import { eliminarProducto } from "../../api/productos";

type PresupuestoType = {
    id: number;
    cliente: string;
    fecha: string;
    vencimiento: string;
    moneda: string;
    cantidad: number;
    precio: number;
    observaciones: string;
    producto: string;
};

const columns: GridColDef<PresupuestoType>[] = [
    {
        field: "fecha",
        headerName: "Fecha",
        width: 100,
        editable: false,
    },
    {
        field: "vencimiento",
        headerName: "Vencimiento",
        width: 150,
        editable: false,
    },
    {
        field: "id",
        headerName: "ID",
        width: 150,
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
        width: 150,
        editable: false,
    },
    {
        field: "precio",
        headerName: "Precio",
        width: 150,
        editable: false,
    },
    {
        field: "observaciones",
        headerName: "Observaciones",
        width: 200,
        editable: false,
    },
    {
        field: "cantidad",
        headerName: "Cantidad",
        width: 150,
        editable: false,
    },
    {
        field: "producto",
        headerName: "Producto",
        width: 300,
        editable: false,
    },
];

export const PresupuestoPage: React.FC<{}> = () => {
    const [busqueda, setBusqueda] = useState('');
    const { getSuccess, getError } = useNotification();
    const navigate = useNavigate();
    const [presupuestos, setPresupuestos] = useState<PresupuestoType[]>([]);
    const [idPresupuestoAEliminar, setIdPresupuestoAEliminar] = useState('');

    const cargarPresupuestos = async () => {
        try {
            const data = await getPresupuestos(busqueda);
            setPresupuestos(data);
            if (data.length === 0) {
                getError('No existe coincidencia con la búsqueda: ' + busqueda);
            }
        } catch (error: any) {
            getError('Ocurrió un error al cargar los productos');
        }
    };

    const handleEliminarPresupuesto = async () => {
        const presupuestoAEliminar = presupuestos.find((presupuesto) => presupuesto.id === Number(idPresupuestoAEliminar));

        if (!presupuestoAEliminar) {
            getError('No se encontró el presupuesto a eliminar');
            return;
        }

        const confirmar = window.confirm(`¿Estás seguro de eliminar el presupuesto con ID ${presupuestoAEliminar.id}?`);

        if (confirmar) {
            try {
                await eliminarProducto(Number(idPresupuestoAEliminar));
                getSuccess('Presupuesto eliminado correctamente');
                cargarPresupuestos();
            } catch (error: any) {
                getError('Ocurrió un error al eliminar el presupuesto');
            }
        }
    }

    useEffect(() => {
        cargarPresupuestos();
    }, [busqueda]);


    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", display: 'flex', justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="Buscar presupuesto"
                        variant="outlined"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </Stack>
                <Button variant="contained" color="success" onClick={() => navigate("/agregar_presupuesto")}>Agregar presupuesto</Button>
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="ID del presupuesto a eliminar"
                        variant="outlined"
                        fullWidth
                        value={idPresupuestoAEliminar}
                        onChange={(e) => setIdPresupuestoAEliminar(e.target.value)}
                    />
                    <Button variant="contained" color="error" onClick={handleEliminarPresupuesto}>Eliminar presupuesto</Button>
                </Stack>
            </Paper>
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", mt: 4 }}>
                <Typography variant="h4">Listado de presupuestos</Typography>
                <DataGrid sx={{ mt: 2 }}
                    rows={presupuestos}
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