import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { pdf } from "@react-pdf/renderer";
import PresupuestoPDF from "./presupuesto_pdf";
import RemitoPDF from "./remito_pdf";
import { EmailDialogProps } from "../types/EmailData";
import { useNotification } from "../context/notification.context";

const EmailDialog: React.FC<EmailDialogProps> = ({ open, handleClose, isSendingPresupuesto, data, emailDetails, setEmailDetails, enviarEmail }) => {
    const [loading, setLoading] = useState(false);
    const { getSuccess, getError, getInfo } = useNotification();

    useEffect(() => {
        if (open) {
            setLoading(false);
        }
    }, [open]);

    const generatePdfBlob = async () => {
        const pdfGenerator = isSendingPresupuesto ? <PresupuestoPDF data={data} /> : <RemitoPDF data={data} />;
        const blob = await pdf(pdfGenerator).toBlob();
        return blob;
    };

    const handleSendEmail = async () => {
        setLoading(true);
        getInfo("El email se está enviando, por favor espere...");

        try {
            const blob = await generatePdfBlob();
            const fileName = isSendingPresupuesto ? `presupuesto_${data.numero}.pdf` : `remito_${data.numero}.pdf`;
            const file = new File([blob], fileName, { type: "application/pdf" });

            await enviarEmail({
                destinatario: emailDetails.destinatario,
                asunto: emailDetails.asunto,
                mensaje: emailDetails.mensaje,
            }, file);
            getSuccess("Email enviado con éxito");
            handleClose();
        } catch (err) {
            console.error("Error enviando email (enviar_email)", err);
            getError("Error enviando email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Destinatario"
                    value={emailDetails.destinatario}
                    onChange={(e) => setEmailDetails({ ...emailDetails, destinatario: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Asunto"
                    value={emailDetails.asunto}
                    onChange={(e) => setEmailDetails({ ...emailDetails, asunto: e.target.value })}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Mensaje"
                    value={emailDetails.mensaje}
                    onChange={(e) => setEmailDetails({ ...emailDetails, mensaje: e.target.value })}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="error">Cancelar</Button>
                <Button onClick={handleSendEmail} color="primary" disabled={loading}>Enviar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EmailDialog;
