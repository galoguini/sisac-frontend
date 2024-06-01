import * as yup from 'yup';

export const clientesValidate = yup.object().shape({
    nombre_apellido: yup.string().required('El nombre y apellido es requerido'),
    tipo_identificacion: yup.string().required('El tipo de identificación es requerido'),
    numero_identificacion: yup.string(),
    otro_identificacion: yup.string().required('El otro identificación es requerido'),
    condicion_iva: yup.string().required('La condición IVA es requerida'),
    pais: yup.string().required('El país es requerido'),
    provincia: yup.string(),
    localidad: yup.string(),
    domicilio: yup.string(),
    email: yup.string().email('El email no es válido'),
    telefono: yup.string().matches(/^[0-9]+$/, "Introduzca un telefono valido").min(12, "Introzca un telefono valido, con codigo de area"),
});