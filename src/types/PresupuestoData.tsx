export interface Empresa {
    nombre_empresa: string;
    nombre_fantasia: string;
    categoria_fiscal: string;
    tipo_cuenta: string;
    cuit: string;
    nro_ingresos_brutos: string;
    fecha_inicio_actividad: string;
    pais: string;
    direccion: string;
    provincia: string;
    localidad: string;
    logo: string;
}

export interface Cliente {
    nombre_apellido: string;
    tipo_identificacion: string;
    numero_identificacion: string;
    otro_identificacion: string;
    condicion_iva: string;
    pais: string;
    provincia: string;
    localidad: string;
    domicilio: string;
}

export interface Producto {
    producto: string;
    cantidad: number;
    precio: number;
}

export interface PresupuestoItem {
    nombre: string;
    descripcion: string;
    cantidad: number;
    precio: number;
    importe: number;
}

export interface PresupuestoData {
    numero: string;
    fecha: string;
    moneda: string;
    fechaVencimiento: string;
    items: PresupuestoItem[];
    total: number;
    observaciones: string[];
    empresa: Empresa;
    cliente: Cliente;
}