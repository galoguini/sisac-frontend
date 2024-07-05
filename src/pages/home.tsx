import React from "react";
import { Container, Typography } from "@mui/material";

export const HomePage: React.FC<{}> = () => {

    return (
        <Container sx={{ mt: 9 }} maxWidth="xs">
            <Typography variant="h4" align="center">Sistema Emisor de Documentos Contables</Typography>
        </Container>
    );
}