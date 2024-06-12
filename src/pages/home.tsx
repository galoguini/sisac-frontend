import React from "react";
import { Container, Typography } from "@mui/material";
// import { useNotification } from "../context/notification.context";

export const HomePage: React.FC<{}> = () => {
    // const { getSuccess, getError, getInfo, getWarning } = useNotification();
    // const handleClick = () => {
    //     getSuccess('Mensaje de éxito');
    //     getError('Mensaje de error');
    //     getInfo('Mensaje de información');
    //     getWarning('Mensaje de advertencia');
    // }
    return (
        <Container sx={{ mt: 9 }} maxWidth="xs">
            <Typography variant="h4" align="center">Sistema de Administración Contable</Typography>
        </Container>
    );
}