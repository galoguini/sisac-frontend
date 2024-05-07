import * as yup from 'yup';

export const ProductoValidate = yup.object().shape({
    nombre: yup.string().trim().required("El nombre del producto es requerido"),
    codigo_sku: yup.string().trim(),
    codigo_barra: yup.string().trim(),
    categoria: yup.string().trim().required("La categoria es requerida"),
    tasa_iva: yup.string().trim().required("La tasa de IVA es requerida"),
    unidad_medida: yup.string().trim().required("La unidad de medida es requerida"),
    precio_venta_usd: yup.string().trim().matches(/^[0-9.]+$/, "Ingrese solo numeros // Los decimales se separan con un punto").max(15, "El precio no puede superar los 15 digitos"),
    stock: yup.string(),
    observaciones: yup.string().trim()
});
