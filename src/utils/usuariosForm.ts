import * as yup from "yup"

export const LoginValidate = yup.object().shape({
    username: yup.string().trim().required("El CUIL es requerido").min(11, "Introduzca un CUIL valido").max(11, "Introduzca un CUIL valido").matches(/^[0-9]+$/, "El CUIL solo puede contener números"),
    password: yup.string().trim().required("La contraseña es requerida"),
})

export const RegistroValidate = yup.object().shape({
    username: yup.string().trim().required("El CUIL es requerido").min(11, "Introduzca un CUIL valido").max(11, "Introduzca un CUIL valido").matches(/^[0-9]+$/, "El CUIL solo puede contener números"),
    firstName: yup.string().trim().required("El nombre es requerido"),
    lastName: yup.string().trim().required("El apellido es requerido"),
    email: yup.string().trim().email("Introduzca un email valido").required("El email es requerido"),
    celular: yup.string().trim().required("El celular es requerido").matches(/^[0-9]+$/, "Introduzca un celular valido").min(12, "Introzca un celular valido, con codigo de area"),
    password: yup.string().required("La contraseña es requerida").min(8, "El minimo debe ser 8 caracteres"),
    confirmPassword: yup.string().required("La confirmación de contraseña es requerida").oneOf([yup.ref('password')], "Las contraseñas deben coincidir")
})

export const EditarUsuarioValidate = yup.object().shape({
    first_name: yup.string().trim().required("El nombre es requerido"),
    last_name: yup.string().trim().required("El apellido es requerido"),
    email: yup.string().trim().email("Introduzca un email valido").required("El email es requerido"),
    celular: yup.string().trim().required("El celular es requerido").matches(/^[0-9]+$/, "Introduzca un celular valido").min(12, "Introzca un celular valido, con codigo de area"),
})