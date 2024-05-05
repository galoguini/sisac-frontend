import { Container, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { getEmpresa } from "../../api/empresa";
import { useNotification } from "../../context/notification.context";

let datos: string;

export const EmpresaProvisionalPage: React.FC<{}> = () => {

    const { getSuccess, getError } = useNotification();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEmpresa();
                datos = data;
                console.log(datos);
                getSuccess('Datos de la empresa obtenidos con éxito'+JSON.stringify(datos));
            } catch (error: any) {
                getError(error.message);
            }
        };
    
        fetchData();
    }, []);


    return (
        <Container sx={{ mt: 9 }} maxWidth="xs">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                <Typography variant='h6'>Esta pagina es provisional, su unica funcionalidad es mostrar la informacion de la empresa del usaurio en la notificacion</Typography> 
            </Paper>
        </Container>
    );
}