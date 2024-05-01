import React from "react";
import { Button, Container } from "@mui/material";
import { useNotification } from "../context/notification.context";

export const HomePage: React.FC<{}> = () => {
    const { getError, getSuccess } = useNotification()
    const handleClick = () => {
        getError("Hola, estas en el home")
    }

    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <Button onClick={handleClick} variant='contained'>SOY EL HOME</Button>
        </Container>
    );
}