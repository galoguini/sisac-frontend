import * as yup from 'yup';

export const PresupuestoValidate = yup.object().shape({
    cliente: yup.object().required("El cliente es requerido"),
    fecha: yup.string().trim().required("La fecha es requerida"),
    vencimiento: yup.string().trim().required("El vencimiento es requerido"),
    moneda: yup.string().trim().required("La moneda es requerida"),
    observaciones: yup.string().trim(),
    productos: yup.array().of(
        yup.object().shape({
            producto: yup.object().required("El producto es requerido"),
            precio: yup.string().matches(/^[0-9.]+$/, "Ingrese solo numeros // Los decimales se separan con un punto").max(20, "El precio no puede superar los 20 digitos").required("El precio es requerido"),
            cantidad: yup.number().required("La cantidad es requerida"),
        })
    ).required("Los productos son requeridos"),
});