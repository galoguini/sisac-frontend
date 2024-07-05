import React, { useState } from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useNotification } from "../../context/notification.context";
import { useNavigate } from "react-router-dom";
import { updateSMTPInfo } from "../../api/usuarios";

export const GoogleAuthPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();
    const [email, setEmail] = useState('');
    const [appPassword, setAppPassword] = useState('');

    const handleConnectGoogle = async () => {
        try {
            await updateSMTPInfo(email, appPassword);
            getSuccess('¡Conexión con Google exitosa!');
            navigate("/");
        } catch (error) {
            getError('Error al conectar con Google. Por favor, inténtelo de nuevo.');
        }
    }

    return (
        <Container sx={{ mt: 9 }} maxWidth="xs">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                <Typography sx={{ mb: 2 }} variant="h4" align="center">Enviar emails por Gmail</Typography>
                <Typography variant="body1" align="left">
                    SEDOC puede enviar correos a su nombre,
                    pero para hacer esto, requerimos un correo electronico de Gmail y su contraseña para aplicaciones.
                </Typography>
                <Typography variant="body2" align="left" sx={{ mt: 2 }}>
                    La contraseña para aplicaciones es una contraseña única generada por Google para aplicaciones de terceros.
                </Typography>

                <TextField
                    sx={{ mt: 4 }}
                    label="Correo Electrónico"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    sx={{ mt: 1 }}
                    label="Contraseña para aplicaciones"
                    variant="outlined"
                    fullWidth
                    value={appPassword}
                    onChange={(e) => setAppPassword(e.target.value.replace(/\s+/g, ''))}
                />

                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    color="success"
                    fullWidth
                    onClick={handleConnectGoogle}
                >
                    Conectar Gmail con SEDOC
                </Button>
                <Button
                    sx={{ mt: 1 }}
                    variant="contained"
                    color="warning"
                    fullWidth
                    onClick={() => {
                        window.alert("Desde su perfil va a poder vincular su Cuenta de Google en el futuro si usted lo requiere.");
                        navigate("/");
                    }}
                >
                    No conectar / Conectar mas tarde
                </Button>
            </Paper>
        </Container>
    );
};
