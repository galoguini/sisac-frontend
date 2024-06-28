import React from "react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";

export const GoogleAuthPage: React.FC<{}> = () => {
    const navigate = useNavigate();
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
                <Typography sx={{ mb: 2 }} variant="h4" align="center">Conectar con Google</Typography>
                <Typography variant="body1" align="left">Si utiliza Gmail, SISAC puede enviar correos a su nombre,
                    pero para hacer esto, requerimos que vincule su cuenta de Google con SISAC para brindarnos los
                    permisios necesarios. </Typography>

                <Button sx={{ mt: 2 }} variant="contained" color="success" fullWidth> Conectar con Google </Button>
                <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={() => {
                        window.alert("Desde su perfil va a poder vincular su Cuenta de Google en el futuro si usted lo rquiere.");
                        navigate("/");
                    }}
                >
                    Continuar sin conectar
                </Button>
            </Paper>
        </Container>
    );
}