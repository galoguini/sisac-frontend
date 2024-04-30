import React from "react";
import { Box, Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";

type LoginType = {
    username: string;
    password: string;
}

export const LoginPage: React.FC<{}> = () => {
    const [loginData, setLoginData] = React.useState<LoginType>({
        username: "",
        password: "",
    })

    const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        console.log(loginData);
    }

    return (
        <Container maxWidth="sm">
            <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "50vh" }}>
                <Grid item>
                    <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                        <Typography sx={{ mt: 1, mb: 1 }} variant="h5">Sistema Básico de Administración Contable</Typography>
                        {/* <Typography sx={{ mt: 1, mb: 1 }} variant="h4">Iniciar Sesión</Typography> */}
                        <Box component="form" onSubmit={handleSubmit}>
                            <TextField name="username" margin="normal" type="number" fullWidth label="CUIL" required onChange={dataLogin}/>
                            <TextField name="password" margin="normal" type="password" fullWidth label="Contraseña" required onChange={dataLogin} />
                            <Button fullWidth type="submit" variant="contained" sx={{ mt: 1, fontSize: '20px' }} >Iniciar sesión</Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}