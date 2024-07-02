import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/usuarios/login";
import { RouterLayout } from "./common/RouterLayout";
import { RegistroPage } from "./pages/usuarios/registro";
import { PerfilPage } from "./pages/usuarios/perfil";
import { RegistroEmpresaPage } from "./pages/empresas/registro_empresa";
import { PresupuestoPage } from "./pages/presupuestos/presupuesto";
import { ClientePage } from "./pages/clientes/clientes";
import { ProductoPage } from "./pages/productos/productos";
import { AgregarProductoPage } from "./pages/productos/agregar_productos";
import { AgregarClientesPage } from "./pages/clientes/agregar_clientes";
import { AgregarPresupuestoPage } from "./pages/presupuestos/agregar_presupuesto";
import { DetallePresupuestoPage } from "./pages/presupuestos/detalle_presupuesto";
import { Empresa1Page } from "./pages/empresas/empresa1";
import { GoogleAuthPage } from "./pages/usuarios/google_auth";

export const AppRouter: React.FC<{}> = () => {
    return (
        <Routes>
            <Route path="/" element={<RouterLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/presupuestos" element={<PresupuestoPage />} />
                <Route path="/clientes" element={<ClientePage />} />
                <Route path="/productos" element={<ProductoPage />} />
                <Route path="/agregar_producto" element={<AgregarProductoPage />} />
                <Route path="/agregar_cliente" element={<AgregarClientesPage />} />
                <Route path="/agregar_presupuesto" element={<AgregarPresupuestoPage />} />
                <Route path="/detalle_presupuesto" element={<DetallePresupuestoPage />} />

                <Route path="/empresa1" element={<Empresa1Page />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/registro_empresa" element={<RegistroEmpresaPage />} />
            <Route path="/conectar_con_google" element={<GoogleAuthPage />} />
        </Routes>
    );
}