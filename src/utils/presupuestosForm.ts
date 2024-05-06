import * as yup from 'yup';

export const PresupuestoValidate = yup.object().shape({
    cliente: yup.string().trim().required("El cliente es requerido"),
    fecha: yup.string().trim().required("La fecha es requerida"),
    vencimiento: yup.string().trim().required("El vencimiento es requerido"),
    moneda: yup.string().trim().required("La moneda es requerida"),
    cantidad: yup.number().required("La cantidad es requerida"),
    precio: yup.number().required("El precio es requerido"),
    observaciones: yup.string().trim(),
    producto: yup.string().trim().required("El producto o servicio es requerido"),
});