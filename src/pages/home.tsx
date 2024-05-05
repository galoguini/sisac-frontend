import React from "react";
import { Button, Container, Paper } from "@mui/material";
import { useNotification } from "../context/notification.context";

export const HomePage: React.FC<{}> = () => {
    const { getSuccess, getError, getInfo, getWarning } = useNotification();
    const handleClick = () => {
        getSuccess('Mensaje de éxito');
        // getError('Mensaje de error');
        // getInfo('Mensaje de información');
        // getWarning('Mensaje de advertencia');
    }
    return (
        <Container sx={{ mt: 9 }} maxWidth="xs">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Button variant='contained' onClick={handleClick}>SOY EL HOME</Button>
            </Paper>
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Button variant='contained' onClick={handleClick}>SOY EL HOME</Button>
            </Paper>
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Button variant='contained' onClick={handleClick}>SOY EL HOME</Button>
            </Paper>
        </Container>
    );
}