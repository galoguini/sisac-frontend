import React from "react";
import { Button, Container } from "@mui/material";
import { useNotification } from "../context/notification.context";

export const HomePage: React.FC<{}> = () => {
    const { getSuccess, getError, getInfo, getWarning } = useNotification();
    const hanfleClick = () => {
        getSuccess('Mensaje de éxito');
        // getError('Mensaje de error');
        // getInfo('Mensaje de información');
        // getWarning('Mensaje de advertencia');
    }
    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <Button variant='contained' onClick={hanfleClick}>SOY EL HOME</Button>
        </Container>
    );
}