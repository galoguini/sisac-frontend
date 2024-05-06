import React, { useEffect, useState } from "react";
import { getUser, editUser } from "../../api/usuarios";
import { Container, Typography, Box, Paper, TextField, Switch, Button, FormGroup, FormControlLabel, InputAdornment, Grid } from "@mui/material";
import { useNotification } from "../../context/notification.context";
import { useFormik } from "formik";
import { EditarUsuarioValidate } from "../../utils/usuariosForm";

interface UserData {
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    celular: string;
}

type PerfilType = {
    first_name: string;
    last_name: string;
    email: string;
    celular: string;
};

export const PerfilPage: React.FC<{}> = () => {
    const { getSuccess, getError } = useNotification();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isEditable, setIsEditable] = useState(false);

    const fetchData = async () => {
        try {
            const data = await getUser();
            setUserData(data);
            formik.setValues({
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                celular: data.celular,
            });
        } catch (error: any) {
            getError('Hubo un error al cargar los datos del usuario');
        }
    };

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            email: '',
            celular: '',
        },
        validationSchema: EditarUsuarioValidate,
        onSubmit: (values: PerfilType) => handleSaveChanges(values),
        enableReinitialize: true,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsEditable(event.target.checked);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(event);
        if (userData) {
            setUserData({
                ...userData,
                [event.target.name]: event.target.value
            });
        }
    };

    const handleSaveChanges = async (values: PerfilType) => {
        try {
            const updatedUser = await editUser(values.first_name, values.last_name, values.email, values.celular);
            setUserData(updatedUser);
            getSuccess('Cambios guardados exitosamente');
            setIsEditable(false);
            fetchData();
        } catch (error: any) {
            getError('Hubo un error al guardar los cambios');
        }
    };

    return (
        <Container maxWidth="sm">
            {userData && (
                <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "75vh" }}>
                    <Grid item>
                        <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                            <Typography variant="h5" gutterBottom>
                                Datos del Usuario
                            </Typography>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch checked={isEditable} onChange={handleSwitchChange} />
                                    }
                                    label={isEditable ? "Deshabilitar edición" : "Habilitar edición"}
                                />
                            </FormGroup>
                            <Box component="form" onSubmit={formik.handleSubmit}>
                                <TextField
                                    label="CUIL"
                                    value={userData.username}
                                    disabled
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    name="first_name"
                                    label="Nombre"
                                    value={formik.values.first_name}
                                    disabled={!isEditable}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                    helperText={formik.touched.first_name && formik.errors.first_name}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    name="last_name"
                                    label="Apellido"
                                    value={formik.values.last_name}
                                    disabled={!isEditable}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                    helperText={formik.touched.last_name && formik.errors.last_name}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    disabled={!isEditable}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    name="celular"
                                    label="Celular"
                                    value={formik.values.celular}
                                    disabled={!isEditable}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.celular && Boolean(formik.errors.celular)}
                                    helperText={formik.touched.celular && formik.errors.celular}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">+</InputAdornment>,
                                    }}
                                    fullWidth
                                    margin="normal"
                                />
                                {isEditable && (
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                        <Button type="submit" variant="contained">
                                            Guardar cambios
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};