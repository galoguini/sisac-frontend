import * as Yup from 'yup';

export const EmpresaValidate = Yup.object().shape({
    nombre_empresa: Yup.string().trim().required("El nombre de la empresa es requerido"),
    nombre_fantasia: Yup.string().trim(),
    categoria_fiscal: Yup.string().trim().required("La categoria fiscal es requerida"),
    tipo_cuenta: Yup.string().trim().required("El tipo de cuenta es requerido"),
    cuit: Yup.string().trim().required("El CUIT es requerido").min(11, "Introduzca un CUIT valido").max(11, "Introduzca un CUIT valido").matches(/^[0-9]+$/, "El CUIT solo puede contener números"),
    nro_ingresos_brutos: Yup.string().trim().required("El nro de ingresos brutos es requerido"),
    fecha_inicio_actividad: Yup.string().trim().required("La fecha de inicio de actividad es requerida"),
    direccion: Yup.string().trim().required("La direccion es requerida"),
    provincia: Yup.string().trim().required("La provincia es requerida"),
    localidad: Yup.string().trim().required("La localidad es requerida"),
    telefono: Yup.string().trim().required("El telefono es requerido").matches(/^[0-9]+$/, "Introduzca un telefono valido").min(12, "Introzca un telefono valido, con codigo de area"),
    email: Yup.string().trim().email("Introduzca un email valido").required("El email es requerido"),
    CBU: Yup.string().trim().matches(/^[0-9]+$/, "El CBU solo puede contener números").min(22, "Introduzca un CBU valido").max(22, "Introduzca un CBU valido"),
})