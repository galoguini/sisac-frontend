import { Button, Container, Dialog, DialogActions, DialogContent, Grid, Paper, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getDetallePresupuesto, remitirPresupuesto } from "../../api/presupuestos";
import { PDFViewer, BlobProvider } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import PresupuestoPDF from "../../components/presupuesto_pdf";
import RemitoPDF from "../../components/remito_pdf";
import { getEmpresa } from "../../api/empresa";
import { getClientes } from "../../api/clientes";
import { PresupuestoData } from "../../types/PresupuestoData";

type Producto = {
    producto: string;
    cantidad: number;
    precio: number;
    descripcion: string;
};

type Presupuesto = {
    id: number;
    numero_presupuesto: number;
    cliente: string;
    fecha: string;
    vencimiento: string;
    moneda: string;
    observaciones: string;
    remitido: boolean;
    productos: Producto[];
};

export const DetallePresupuestoPage: React.FC<{}> = () => {
    const location = useLocation();
    const numeroPresupuesto = location.state?.numeroPresupuesto;
    const [cliente, setCliente] = useState({
        nombre_apellido: "",
        tipo_identificacion: "",
        numero_identificacion: "",
        otro_identificacion: "",
        condicion_iva: "",
        pais: "",
        provincia: "",
        localidad: "",
        domicilio: "",
        email: "",
        telefono: "",
        id: 0,
    });
    const [presupuesto, setPresupuesto] = useState<Presupuesto>({
        id: 0,
        numero_presupuesto: 0,
        cliente: "",
        fecha: "",
        vencimiento: "",
        moneda: "",
        observaciones: "",
        remitido: false,
        productos: [],
    });
    const [empresa, setEmpresa] = useState({
        nombre_empresa: "",
        nombre_fantasia: "",
        categoria_fiscal: "",
        tipo_cuenta: "",
        cuit: "",
        nro_ingresos_brutos: "",
        fecha_inicio_actividad: "",
        pais: "",
        direccion: "",
        provincia: "",
        localidad: "",
        telefono: "",
        email: "",
        CBU: "",
        logo: "",
    });

    const obtenerInfoPDF = async () => {
        const empresa = await getEmpresa();
        setEmpresa(empresa);
        const cliente = await getClientes(presupuesto.cliente);
        setCliente(cliente[0]);
    };

    const detallePresupuesto = async () => {
        const data = await getDetallePresupuesto(numeroPresupuesto);
        console.log(data);
        setPresupuesto(data);
    }

    useEffect(() => {
        detallePresupuesto();
    }, []);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = async () => {
        await obtenerInfoPDF();
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openRemito, setOpenRemito] = React.useState(false);

    const handleClickOpenRemito = async () => {
        await obtenerInfoPDF();
        setOpenRemito(true);
    };

    const handleCloseRemito = () => {
        setOpenRemito(false);
    };

    let monedaTexto;
    if (presupuesto.moneda === "ARS") {
        monedaTexto = "Pesos Argentinos";
    } else if (presupuesto.moneda === "USD") {
        monedaTexto = "Dólares Estadounidenses";
    } else {
        monedaTexto = "Moneda no especificada";
    }

    const data: PresupuestoData = {
        numero: presupuesto.numero_presupuesto.toString(),
        fecha: presupuesto.fecha,
        moneda: monedaTexto,
        fechaVencimiento: presupuesto.vencimiento,
        items: presupuesto.productos.map((prod) => ({
            nombre: prod.producto,
            descripcion: prod.descripcion,
            cantidad: prod.cantidad,
            precio: prod.precio,
            importe: prod.cantidad * prod.precio,
        })),
        total: presupuesto.productos.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0),
        observaciones: presupuesto.observaciones.split('\n'),
        empresa: empresa,
        cliente: cliente,
    };

    const handleRemitir = async () => {
        const confirmacion = window.confirm(`Estás por remitir el presupuesto nro ${numeroPresupuesto}, ¿estás seguro?`);
        if (confirmacion) {
            await remitirPresupuesto(presupuesto.id);
            detallePresupuesto();
        }
    };

    return (
        <Container sx={{ mt: 9 }} maxWidth="xl">
            <Paper sx={{ padding: "1.2em", borderRadius: "0.5em", display: 'flex', flexDirection: 'column' }}>
                <Grid container direction="column" alignItems="center" justifyContent="center" spacing={2}>
                    <Typography sx={{ mt: 2 }} variant="h4">Detalle del presupuesto nro. {numeroPresupuesto}</Typography>
                </Grid>
                <Grid container margin="normal" direction="row" alignItems="left" justifyContent="left" spacing={2} sx={{ mt: 2 }}>
                    <TextField fullWidth label="Cliente" value={presupuesto.cliente} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid container direction="row" justifyContent="space-between" spacing={2} sx={{ mt: 2, mb: 1 }}>
                    <Stack direction="row" spacing={2}>
                        <Grid container direction="row" alignItems="left" justifyContent="left" spacing={2} sx={{ mt: 2 }}>
                            <TextField label="Fecha" value={presupuesto.fecha} InputProps={{ readOnly: true }} />
                            <TextField label="Vencimiento" value={presupuesto.vencimiento} InputProps={{ readOnly: true }} />
                        </Grid>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Grid container direction="row" alignItems="left" justifyContent="left" spacing={2} sx={{ mt: 2 }}>
                            <TextField label="Moneda" value={monedaTexto} InputProps={{ readOnly: true }} />
                            <TextField
                                label="Total"
                                value={presupuesto.productos.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Stack>
                </Grid>
                <Grid container direction="row" alignItems="left" justifyContent="left" spacing={2} sx={{ mt: 2, mb: 1 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Observaciones"
                        value={presupuesto.observaciones}
                        InputProps={{ readOnly: true }}
                    />
                </Grid>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleClickOpen}>Imprimir presupuesto</Button>
                        <Button disabled variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => window.print()}>Enviar presupuesto por email</Button>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        {presupuesto.remitido ? (
                            <>
                                <Button variant="contained" color="primary" onClick={handleClickOpenRemito}>Imprmir remito</Button>
                                <Button disabled variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => window.print()}>Enviar remito por email</Button>
                            </>
                        ) : (
                            <Button variant="contained" color="primary" onClick={handleRemitir}>
                                Remitir
                            </Button>
                        )}
                    </Stack>
                </Grid>
            </Paper>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
                <DialogContent>
                    <PDFViewer style={{ width: '100%', height: '80vh' }} showToolbar={true}>
                        <PresupuestoPDF data={data} />
                    </PDFViewer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color="error">
                        Salir
                    </Button>
                    <BlobProvider document={<PresupuestoPDF data={data} />}>
                        {({ blob, loading }) =>
                            loading ? (
                                <Button variant="contained" color="primary" disabled>
                                    Generando PDF...
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => {
                                        if (blob) {
                                            saveAs(blob, `presupuesto_${numeroPresupuesto}.pdf`);
                                        }
                                    }}
                                >
                                    Descargar PDF
                                </Button>
                            )
                        }
                    </BlobProvider>
                </DialogActions>
            </Dialog>

            <Dialog open={openRemito} onClose={handleCloseRemito} fullWidth maxWidth="xl">
                <DialogContent>
                    <PDFViewer style={{ width: '100%', height: '80vh' }} showToolbar={true}>
                        <RemitoPDF data={data} />
                    </PDFViewer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseRemito} variant="contained" color="error">
                        Salir
                    </Button>
                    <BlobProvider document={<RemitoPDF data={data} />}>
                        {({ blob, loading }) =>
                            loading ? (
                                <Button variant="contained" color="primary" disabled>
                                    Generando PDF...
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => {
                                        if (blob) {
                                            saveAs(blob, `remito_${numeroPresupuesto}.pdf`);
                                        }
                                    }}
                                >
                                    Descargar PDF
                                </Button>
                            )
                        }
                    </BlobProvider>
                </DialogActions>
            </Dialog>

            {presupuesto.productos.map((producto, index) => (
                <Paper key={index} sx={{ padding: "1.2em", borderRadius: "0.5em", display: 'flex', flexDirection: 'column', mt: 2 }}>
                    <Typography variant="h6" align="left">Producto {index + 1}</Typography>
                    <Grid container margin="normal" direction="row" alignItems="left" justifyContent="left" spacing={2} sx={{ mt: 2 }}>
                        <Grid container>
                            <TextField fullWidth label="Producto" value={producto.producto} InputProps={{ readOnly: true }} />
                            <TextField label="Cantidad" value={producto.cantidad} InputProps={{ readOnly: true }} />
                            <TextField
                                label="Precio unitario"
                                value={Number(producto.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                label="Importe"
                                value={(producto.cantidad * producto.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="Descripción"
                                value={producto.descripcion}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Container>
    );
}
