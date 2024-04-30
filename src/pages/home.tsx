import React from "react";
import { Button, Container } from "@mui/material";

export const HomePage: React.FC<{}> = () => {
    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <Button variant='contained'>SOY EL HOME</Button>
        </Container>
    );
}