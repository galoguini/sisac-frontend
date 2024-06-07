import { Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getEmpresa } from "../../api/empresa";

export const Empresa1Page: React.FC<{}> = () => {
    const [empresa, setEmpresa] = useState({
        nombre_empresa: "",
        nombre_fantasia: "",
        categoria_fiscal: "",
        tipo_cuenta: "",
        cuit: "",
        nro_ingresos_brutos: "",
        fecha_inicio_actividad: "",
        pais: "",
        direccion: "",
        provincia: "",
        localidad: "",
        telefono: "",
        email: "",
        CBU: "",
    });

    const obtenerEmpresa = async () => {
        const response = await getEmpresa();
        setEmpresa(response);
    }

    useEffect(() => {
        obtenerEmpresa();
    }, []);

    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ mt: 2 }} variant="h4">Datos de la empresa</Typography>
                <TextField fullWidth margin="normal" label="Nombre de la empresa" value={empresa.nombre_empresa} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="Nombre de fantasía" value={empresa.nombre_fantasia} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="Categoría fiscal" value={empresa.categoria_fiscal} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="Tipo de cuenta" value={empresa.tipo_cuenta} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="CUIT" value={empresa.cuit} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="Nro. de ingresos brutos" value={empresa.nro_ingresos_brutos} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="Fecha de inicio de actividad" value={empresa.fecha_inicio_actividad} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="Dirección" value={empresa.direccion} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="País" value={empresa.pais} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="Provincia" value={empresa.provincia} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="Localidad" value={empresa.localidad} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="Teléfono" value={empresa.telefono} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="Email" value={empresa.email} InputProps={{ readOnly: true }} />
                <TextField fullWidth margin="normal" label="CBU" value={empresa.CBU} InputProps={{ readOnly: true }} />
            </Paper>
        </Container>
    );
}