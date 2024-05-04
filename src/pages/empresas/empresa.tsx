import React, { useEffect, useState } from "react";
import { Box, Button, Container, FormControl, Grid, InputLabel, Paper, Select, TextField, Typography, MenuItem, FormGroup, FormControlLabel, Switch } from "@mui/material";
import { useFormik } from "formik";
import { useNotification } from "../../context/notification.context";
import { editEmpresa, getEmpresa } from "../../api/empresa";
import { EmpresaValidate } from "../../utils/empresasForm";
import { useNavigate } from "react-router-dom";

interface EmpresaData {
    nombre_empresa: string;
    nombre_fantasia: string;
    categoria_fiscal: string;
    tipo_cuenta: string;
    cuit: string;
    nro_ingresos_brutos: string;
    fecha_inicio_actividad: string;
    direccion: string;
    provincia: string;
    localidad: string;
    telefono: string;
    email: string;
    CBU: string;
}

type EmpresaType = {
    nombre_empresa: string;
    nombre_fantasia: string;
    categoria_fiscal: string;
    tipo_cuenta: string;
    cuit: string;
    nro_ingresos_brutos: string;
    fecha_inicio_actividad: string;
    direccion: string;
    provincia: string;
    localidad: string;
    telefono: string;
    email: string;
    CBU: string;
};

export const EmpresaPage: React.FC<{}> = () => {
    const CATEGORIAS = [
        'Consumidor Final',
        'Exento',
        'Exterior',
        'Monotributista',
        'Responsable Inscripto',
    ];

    const TIPOS = [
        'Persona Jurídica',
        'Persona Humana',
    ];

    const navigate = useNavigate();
    const { getSuccess, getError } = useNotification();
    const [empresaData, setEmpresaData] = useState<EmpresaData | null>(null);
    const [isEditable, setIsEditable] = useState(false);

    const formik = useFormik<EmpresaType>({
        initialValues: {
            nombre_empresa: '',
            nombre_fantasia: '',
            categoria_fiscal: '',
            tipo_cuenta: '',
            cuit: '',
            nro_ingresos_brutos: '',
            fecha_inicio_actividad: '',
            direccion: '',
            provincia: '',
            localidad: '',
            telefono: '',
            email: '',
            CBU: '',
        },
        validationSchema: EmpresaValidate,
        onSubmit: (values: EmpresaType) => handleSaveChanges(values),
        enableReinitialize: true,
        // onSubmit: async (values: EmpresaType) => {
        //     try {
        //         await editEmpresa(values.nombre_empresa, values.nombre_fantasia, values.categoria_fiscal, values.tipo_cuenta, values.cuit, values.nro_ingresos_brutos, values.fecha_inicio_actividad, values.direccion, values.provincia, values.localidad, values.telefono, values.email, values.CBU);
        //         getSuccess('Cambios guardados exitosamente');
        //         navigate('/perfil');
        //     } catch (error: any) {
        //         getError('Hubo un error al guardar los cambios');
        //     }
        // }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEmpresa();
                setEmpresaData(data);
                console.log(data);
                formik.setValues({
                    nombre_empresa: data.nombre_empresa,
                    nombre_fantasia: data.nombre_fantasia,
                    categoria_fiscal: data.categoria_fiscal,
                    tipo_cuenta: data.tipo_cuenta,
                    cuit: data.cuit,
                    nro_ingresos_brutos: data.nro_ingresos_brutos,
                    fecha_inicio_actividad: data.fecha_inicio_actividad,
                    direccion: data.direccion,
                    provincia: data.provincia,
                    localidad: data.localidad,
                    telefono: data.telefono,
                    email: data.email,
                    CBU: data.CBU,
                });
            } catch (error: any) {
                getError('Hubo un error al cargar los datos de la empresa');
            }
        };

        fetchData();
    }, []);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsEditable(event.target.checked);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleChange(event);
        if (empresaData) {
            setEmpresaData({
                ...empresaData,
                [event.target.name]: event.target.value
            });
        }
    };

    const handleSaveChanges = async (values: EmpresaType) => {
        try {
            const updatedEmpresa = await editEmpresa(values.nombre_empresa, values.nombre_fantasia, values.categoria_fiscal, values.tipo_cuenta, values.cuit, values.nro_ingresos_brutos, values.fecha_inicio_actividad, values.direccion, values.provincia, values.localidad, values.telefono, values.email, values.CBU);
            setEmpresaData(updatedEmpresa);
            getSuccess('Cambios guardados exitosamente');
            setIsEditable(false);
        } catch (error: any) {
            getError('Hubo un error al guardar los cambios');
        }
    };

    return (
        console.log("empresa data"+empresaData),
        <Container maxWidth="sm">
            {empresaData && (
                <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: "150vh" }}>
                    <Grid item>
                        <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
                            <Typography sx={{ mt: 1, mb: 1 }} variant="h5">
                                Datos de la Empresa
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
                                <TextField name="nombre_empresa"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="Nombre de la Empresa"
                                    value={formik.values.nombre_empresa}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nombre_empresa && Boolean(formik.errors.nombre_empresa)}
                                    helperText={formik.touched.nombre_empresa && formik.errors.nombre_empresa}
                                />
                                <TextField name="nombre_fantasia"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="Nombre de Fantasía"
                                    value={formik.values.nombre_fantasia}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nombre_fantasia && Boolean(formik.errors.nombre_fantasia)}
                                    helperText={formik.touched.nombre_fantasia && formik.errors.nombre_fantasia}
                                />
                                <TextField name="categoria_fiscal"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="Categoría Fiscal"
                                    value={formik.values.categoria_fiscal}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.categoria_fiscal && Boolean(formik.errors.categoria_fiscal)}
                                    helperText={formik.touched.categoria_fiscal && formik.errors.categoria_fiscal}
                                />
                                <TextField name="tipo_cuenta"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="Tipo de Cuenta"
                                    value={formik.values.tipo_cuenta}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.tipo_cuenta && Boolean(formik.errors.tipo_cuenta)}
                                    helperText={formik.touched.tipo_cuenta && formik.errors.tipo_cuenta}
                                />
                                <TextField name="cuit"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="CUIT"
                                    value={formik.values.cuit}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.cuit && Boolean(formik.errors.cuit)}
                                    helperText={formik.touched.cuit && formik.errors.cuit}
                                />
                                <TextField name="nro_ingresos_brutos"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="Número de Ingresos Brutos"
                                    value={formik.values.nro_ingresos_brutos}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.nro_ingresos_brutos && Boolean(formik.errors.nro_ingresos_brutos)}
                                    helperText={formik.touched.nro_ingresos_brutos && formik.errors.nro_ingresos_brutos}
                                />
                                <TextField name="fecha_inicio_actividad"
                                    margin="normal"
                                    type="date"
                                    fullWidth
                                    label="Fecha de inicio de actividad"
                                    value={formik.values.fecha_inicio_actividad}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.fecha_inicio_actividad && Boolean(formik.errors.fecha_inicio_actividad)}
                                    helperText={formik.touched.fecha_inicio_actividad && formik.errors.fecha_inicio_actividad}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField name="direccion"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="Dirección"
                                    value={formik.values.direccion}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.direccion && Boolean(formik.errors.direccion)}
                                    helperText={formik.touched.direccion && formik.errors.direccion}
                                />
                                <TextField name="provincia"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="Provincia"
                                    value={formik.values.provincia}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.provincia && Boolean(formik.errors.provincia)}
                                    helperText={formik.touched.provincia && formik.errors.provincia}
                                />
                                <TextField name="localidad"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="Localidad"
                                    value={formik.values.localidad}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.localidad && Boolean(formik.errors.localidad)}
                                    helperText={formik.touched.localidad && formik.errors.localidad}
                                />
                                <TextField name="telefono"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="Teléfono"
                                    value={formik.values.telefono}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.telefono && Boolean(formik.errors.telefono)}
                                    helperText={formik.touched.telefono && formik.errors.telefono}
                                />
                                <TextField name="email"
                                    margin="normal"
                                    type="email"
                                    fullWidth
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField name="CBU"
                                    margin="normal"
                                    type="text"
                                    fullWidth
                                    label="CBU"
                                    value={formik.values.CBU}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.CBU && Boolean(formik.errors.CBU)}
                                    helperText={formik.touched.CBU && formik.errors.CBU}
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
}

