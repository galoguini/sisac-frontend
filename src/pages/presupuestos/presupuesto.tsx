import { Button, Container, Paper } from "@mui/material";
import React from "react";

export const PresupuestoPage: React.FC<{}> = () => {
    return (
        <Container sx={{ mt: 9 }} maxWidth="xs">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
            <Button variant='contained'>SOY EL PRESUPUESTO</Button>
            </Paper>
        </Container>
    );
}