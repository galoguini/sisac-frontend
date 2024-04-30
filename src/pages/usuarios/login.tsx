import React from "react";
import { Button, Container } from "@mui/material";

export const LoginPage: React.FC<{}> = () => {
    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <h1>SOY EL LOGIN</h1>
            <Button variant='contained'>ir al home</Button>
        </Container>
    );
}