import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PresupuestoData } from '../types/PresupuestoData';

const titulo = 18;
const subtitulo = 16;
const texto = 10;
const header_tabla = 8;
const contenido_tabla = 8;
const columnas_articulo = '35%';
const columnas_observacion = '26%';
const columnas_cantidad = '9%';
const columnas_precio = '15%';
const columnas_importe = '15%';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: texto,
        fontFamily: 'Helvetica',
    },
    header: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerLeft: {
        textAlign: 'left',
        width: '33%',
    },
    headerCenter: {
        textAlign: 'center',
        width: '33%',
    },
    headerRight: {
        textAlign: 'left',
        width: '33%',
    },
    title: {
        fontSize: titulo,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: subtitulo,
        marginBottom: 5,
    },
    section: {
        marginBottom: 10,
        padding: 5,
        border: '1px solid #bfbfbf',
        borderRadius: 5,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    table: {
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: {
        margin: 'auto',
        flexDirection: 'row',
    },
    totalSection: {
        marginTop: 20,
        textAlign: 'right',
    },
    totalText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    observations: {
        marginTop: 10,
        fontSize: 8,
    },
    tableColHeaderArticulo: {
        width: columnas_articulo,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#e0e0e0',
    },
    tableCellHeaderArticulo: {
        margin: 5,
        fontSize: header_tabla,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableColHeaderObservacion: {
        width: columnas_observacion,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#e0e0e0',
    },
    tableCellHeaderObservacion: {
        margin: 5,
        fontSize: header_tabla,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableColHeaderCantidad: {
        width: columnas_cantidad,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#e0e0e0',
    },
    tableCellHeaderCantidad: {
        margin: 5,
        fontSize: header_tabla,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableColHeaderPrecio: {
        width: columnas_precio,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#e0e0e0',
    },
    tableCellHeaderPrecio: {
        margin: 5,
        fontSize: header_tabla,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableColHeaderImporte: {
        width: columnas_importe,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#e0e0e0',
    },
    tableCellHeaderImporte: {
        margin: 5,
        fontSize: header_tabla,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tableColArticulo: {
        width: columnas_articulo,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellArticulo: {
        margin: 5,
        fontSize: contenido_tabla,
        textAlign: 'left',
    },
    tableColObservacion: {
        width: columnas_observacion,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellObservacion: {
        margin: 5,
        fontSize: contenido_tabla,
        textAlign: 'left',
    },
    tableColCantidad: {
        width: columnas_cantidad,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellCantidad: {
        margin: 5,
        fontSize: contenido_tabla,
        textAlign: 'right',
    },
    tableColPrecio: {
        width: columnas_precio,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellPrecio: {
        margin: 5,
        fontSize: contenido_tabla,
        textAlign: 'right',
    },
    tableColImporte: {
        width: columnas_importe,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#bfbfbf',
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCellImporte: {
        margin: 5,
        fontSize: contenido_tabla,
        textAlign: 'right',
    },
    presupuestoDatos: {
        textAlign: 'right',
        marginTop: 10,
    },
    empresaDireccion: {
        textAlign: 'left',
    },
});

interface Props {
    data: PresupuestoData;
}

const PlantillaPDF: React.FC<Props> = ({ data }) => (
    console.log(data),
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Text style={styles.title}>{data.empresa.nombre_empresa}</Text>
                    <View style={styles.empresaDireccion}>
                        <Text>{data.empresa.direccion},{data.empresa.localidad},{data.empresa.provincia}</Text>
                    </View>
                </View>
                <View style={styles.headerCenter}>
                    <View style={{ height: 65 }} />
                    <Text style={styles.page}>{data.empresa.categoria_fiscal}</Text>
                </View>
                <View style={styles.headerRight}>
                    <Text style={[styles.subtitle, { textAlign: "left" }]}>PRESUPUESTO</Text>
                    <View style={[styles.presupuestoDatos, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <View>
                            <Text>Número:</Text>
                            <Text>Fecha:</Text>
                            <Text>CUIT:</Text>
                            <Text>Ing. Brutos:</Text>
                            <Text>Inicio Act.:</Text>
                        </View>
                        <View>
                            <Text>{data.numero}</Text>
                            <Text>{data.fecha}</Text>
                            <Text>{data.empresa.cuit}</Text>
                            <Text>{data.empresa.nro_ingresos_brutos}</Text>
                            <Text>{data.empresa.fecha_inicio_actividad}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <Text>Sr. (es): {data.cliente.nombre_apellido}</Text>
                <Text>Domicilio: {data.cliente.pais}, {data.cliente.provincia}, {data.cliente.localidad}, {data.cliente.domicilio}</Text>
                <Text>{data.cliente.tipo_identificacion}: {data.cliente.numero_identificacion}</Text>
                <Text>Cond. IVA: {data.cliente.condicion_iva}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Moneda: {data.moneda}</Text>
                <Text>Fecha Vto.: {data.fechaVencimiento}</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableColHeaderArticulo}>
                        <Text style={styles.tableCellHeaderArticulo}>Artículo</Text>
                    </View>
                    <View style={styles.tableColHeaderObservacion}>
                        <Text style={styles.tableCellHeaderObservacion}>Observaciones</Text>
                    </View>
                    <View style={styles.tableColHeaderCantidad}>
                        <Text style={styles.tableCellHeaderCantidad}>Cantidad</Text>
                    </View>
                    <View style={styles.tableColHeaderPrecio}>
                        <Text style={styles.tableCellHeaderPrecio}>Precio</Text>
                    </View>
                    <View style={styles.tableColHeaderImporte}>
                        <Text style={styles.tableCellHeaderImporte}>Importe</Text>
                    </View>
                </View>
                {/* Table Rows */}
                {data.items.map((item, index) => (
                    <View style={styles.tableRow} key={index}>
                        <View style={styles.tableColArticulo}>
                            <Text style={styles.tableCellArticulo}>{item.nombre}</Text>
                        </View>
                        <View style={styles.tableColObservacion}>
                            <Text style={styles.tableCellObservacion}>{item.descripcion}</Text>
                        </View>
                        <View style={styles.tableColCantidad}>
                            <Text style={styles.tableCellCantidad}>{item.cantidad}</Text>
                        </View>
                        <View style={styles.tableColPrecio}>
                            <Text style={styles.tableCellPrecio}>{Number(item.precio).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Text>
                        </View>
                        <View style={styles.tableColImporte}>
                            <Text style={styles.tableCellImporte}>{item.importe.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Text>
                        </View>
                    </View>
                ))}
            </View>
            <View style={styles.totalSection}>
                <Text style={styles.totalText}>Total: {data.total.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</Text>
            </View>
            <View style={styles.observations}>
                <Text>Observaciones:</Text>
                {data.observaciones.map((obs, index) => (
                    <Text key={index}>{obs}</Text>
                ))}
            </View>
        </Page>
    </Document>
);

export default PlantillaPDF;
