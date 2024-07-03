import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { PresupuestoData } from '../types/PresupuestoData';

const titulo = 16;
const subtitulo = 16;
const texto = 10;
const header_tabla = 8;
const contenido_tabla = 8;
const seccion = 6;
const columnas_articulo = '40%';
const columnas_observacion = '40%';
const columnas_cantidad = '20%';

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
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    observations: {
        marginTop: 10,
        fontSize: 8,
    },
    remitoDatos: {
        textAlign: 'right',
        marginTop: 10,
    },
    empresaDireccion: {
        textAlign: 'left',
    },
    xText: {
        fontSize: 50,
        fontWeight: 'bold',
    },
    invalidDocText: {
        fontSize: 8,
        fontWeight: 'bold',
    },
    footer: {
        fontSize: 12,
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        textAlign: 'left',
    },
    footerText: {
        fontSize: 12,
        marginTop: 5,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50,
    },
    footerItem: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '40%',
    },
    footerLine: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        width: 150,
        marginBottom: 5,
    },
    clienteDatos: {
        textAlign: 'left',
        marginTop: 0,
    },
    logo: {
        marginBottom: 1,
    },
});

interface Props {
    data: PresupuestoData;
}

const PlantillaPDF: React.FC<Props> = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    {data.empresa.logo && (
                        <Image
                            style={styles.logo}
                            src={data.empresa.logo}
                        />
                    )}
                    <Text style={styles.title}>{data.empresa.nombre_empresa}</Text>
                    <View style={styles.empresaDireccion}>
                        <Text style={{ fontSize: 8 }}>
                            {data.empresa.direccion && `${data.empresa.direccion}, `}
                            {data.empresa.localidad && `${data.empresa.localidad},`}
                        </Text>
                        <Text style={{ fontSize: 8 }}>
                            {data.empresa.provincia && `${data.empresa.provincia}, `}
                            {data.empresa.pais}.
                        </Text>
                    </View>
                </View>
                <View style={styles.headerCenter}>
                    <Text style={styles.invalidDocText}>Documento no válido como factura</Text>
                    <Text style={styles.xText}>X</Text>
                    <Text style={styles.page}>{data.empresa.categoria_fiscal}</Text>
                </View>
                <View style={styles.headerRight}>
                    <Text style={[styles.subtitle, { textAlign: "left" }]}>REMITO</Text>
                    <View style={[styles.remitoDatos, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <View>
                            <Text>Número:</Text>
                            <Text>Fecha:</Text>
                            <Text>CUIT:</Text>
                            <Text>Ing. Brutos:</Text>
                            <Text>Inicio Act.:</Text>
                        </View>
                        <View>
                            <Text>{data.numero}</Text>
                            <Text>{data.fecha.replace(/-/g, '/')}</Text>
                            <Text>
                                {data.empresa.cuit.slice(0, 2) + '-' + data.empresa.cuit.slice(2, 10) + '-' + data.empresa.cuit.slice(10)}
                            </Text>
                            <Text>
                                {data.empresa.nro_ingresos_brutos.slice(0, 2) + '-' + data.empresa.nro_ingresos_brutos.slice(2, 10) + '-' + data.empresa.nro_ingresos_brutos.slice(10)}
                            </Text>
                            <Text>{data.empresa.fecha_inicio_actividad.replace(/-/g, '/')}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.section}>
                <View style={[styles.clienteDatos, { flexDirection: 'row', justifyContent: 'flex-start' }]}>
                    <View style={{ marginRight: 20 }}>
                        <Text style={{ marginBottom: seccion }}>Sr. (es):</Text>
                        <Text style={{ marginBottom: seccion }}>Domicilio:</Text>
                        <Text style={{ marginBottom: seccion }}>Identificación:</Text>
                        <Text>Cond. IVA:</Text>
                    </View>
                    <View>
                        <Text style={{ marginBottom: seccion }}>{data.cliente.nombre_apellido}</Text>
                        <Text style={{ marginBottom: seccion }}>
                            {data.cliente.domicilio && `${data.cliente.domicilio}, `}
                            {data.cliente.localidad && `${data.cliente.localidad}, `}
                            {data.cliente.provincia && `${data.cliente.provincia}, `}
                            {data.cliente.pais}
                        </Text>
                        <Text style={{ marginBottom: seccion }}>
                            {data.cliente.tipo_identificacion === 'NO ESPECIFICADO'
                                ? 'NO ESPECIFICADO'
                                : data.cliente.tipo_identificacion === 'OTRO'
                                    ? `${data.cliente.otro_identificacion}: ${data.cliente.numero_identificacion}`
                                    : `${data.cliente.tipo_identificacion}: ${data.cliente.numero_identificacion}`
                            }
                        </Text>
                        <Text>{data.cliente.condicion_iva}</Text>
                    </View>
                </View>
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
                </View>
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
                    </View>
                ))}
            </View>
            <View style={styles.observations}>
                <Text>Observaciones:</Text>
                {data.observaciones.map((obs, index) => (
                    <Text key={index}>{obs}</Text>
                ))}
            </View>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Recibí Conforme</Text>
                <View style={styles.footerRow}>
                    <View style={styles.footerItem}>
                        <View style={styles.footerLine}></View>
                        <Text style={styles.footerText}>Firma</Text>
                    </View>
                    <View style={styles.footerItem}>
                        <View style={styles.footerLine}></View>
                        <Text style={styles.footerText}>Aclaración</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default PlantillaPDF;
