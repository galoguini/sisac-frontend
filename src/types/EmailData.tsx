export interface EmailDetails {
    destinatario: string;
    asunto: string;
    mensaje: string;
}

export interface EmailDialogProps {
    open: boolean;
    handleClose: () => void;
    isSendingPresupuesto: boolean;
    data: any; 
    emailDetails: EmailDetails;
    setEmailDetails: React.Dispatch<React.SetStateAction<EmailDetails>>;
    enviarEmail: (details: EmailDetails, blob: Blob) => Promise<void>;
}