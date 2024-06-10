import { Button, Container, IconButton, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";
import { eliminarCliente, getClientes } from "../../api/clientes";
import { DataGrid, GridColDef, GridSearchIcon } from "@mui/x-data-grid";

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
    id: number;
};

const columns: GridColDef<ClienteType>[] = [
    {
        field: "nombre_apellido",
        headerName: "Nombre y apellido",
        width: 300,
        editable: false,
    },
    {
        field: "tipo_identificacion",
        headerName: "Identificación",
        width: 100,
        editable: false,
    },
    {
        field: "otro_identificacion",
        headerName: "Otra identificación",
        width: 150,
        editable: false,
    },
    {
        field: "numero_identificacion",
        headerName: "nro. Identificación",
        width: 150,
        editable: false,
    },
    {
        field: "condicion_iva",
        headerName: "Condición IVA",
        width: 200,
        editable: false,
    },
    {
        field: "email",
        headerName: "Email",
        width: 300,
        editable: false,
    },
    {
        field: "telefono",
        headerName: "Teléfono",
        width: 150,
        editable: false,
    },
    {
        field: "pais",
        headerName: "País",
        width: 200,
        editable: false,
    },
    {
        field: "provincia",
        headerName: "Provincia",
        width: 200,
        editable: false,
    },
    {
        field: "localidad",
        headerName: "Localidad",
        width: 200,
        editable: false,
    },
    {
        field: "domicilio",
        headerName: "Domicilio",
        width: 300,
        editable: false,
    },
    {
        field: "id",
        headerName: "ID",
        width: 100,
        editable: false,
    },
];

export const ClientePage: React.FC<{}> = () => {
    const [busqueda, setBusqueda] = useState('');
    const { getSuccess, getError } = useNotification();
    const navigate = useNavigate();
    const [clientes, setClientes] = useState<ClienteType[]>([]);
    const [idClienteAEliminar, setIdClienteAEliminar] = useState('');
    const [busquedaTemporal, setBusquedaTemporal] = useState('');

    const cargarClientes = async () => {
        try {
            const data = await getClientes(busqueda);
            setClientes(data);
            if (data.length === 0) {
                getError('No existe coincidencia con la búsqueda: ' + busqueda);
            }
        } catch (error) {
            getError('Ocurrió un error al cargar los clientes');
        }
    };

    const handleEliminarCliente = async () => {
        const clienteAEliminar = clientes.find((cliente) => cliente.id === Number(idClienteAEliminar));

        if (!clienteAEliminar) {
            getError('No se encontró el cliente con el ID especificado');
            return;
        }

        const confirmacion = window.confirm(`¿Estás seguro de que quieres eliminar el cliente "${clienteAEliminar.nombre_apellido}"?`);

        if (confirmacion) {
            try {
                await eliminarCliente(Number(idClienteAEliminar));
                getSuccess('Cliente eliminado correctamente');
                cargarClientes();
            } catch (error) {
                getError('Ocurrió un error al eliminar el cliente');
            }
        }
    }

    useEffect(() => {
        cargarClientes();
    }, [busqueda]);

    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", display: 'flex', justifyContent: 'space-between' }}>
                {/* <Stack direction="row" spacing={2}>
                    <TextField
                        label="Buscar cliente"
                        variant="outlined"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </Stack> */}
                <Stack direction="row" spacing={0}>
                    <TextField
                        label="Buscar cliente"
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
                <Button variant="contained" color="success" onClick={() => navigate("/agregar_cliente")}>Agregar cliente</Button>
                <Stack direction="row" spacing={2}>
                    <TextField
                        label="ID del cliente a eliminar"
                        variant="outlined"
                        fullWidth
                        value={idClienteAEliminar}
                        onChange={(e) => setIdClienteAEliminar(e.target.value)}
                    />
                    <Button variant="contained" color="error" onClick={handleEliminarCliente}>Eliminar cliente</Button>
                </Stack>
            </Paper>
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", mt: 4 }}>
                <Typography variant="h4">Listado de clientes</Typography>
                <DataGrid sx={{ mt: 2 }}
                    rows={clientes}
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
                />
            </Paper>
        </Container>
    );
}
