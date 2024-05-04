import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/usuarios/login";
import { RouterLayout } from "./common/RouterLayout";
import { RegistroPage } from "./pages/usuarios/registro";
import { PerfilPage } from "./pages/usuarios/perfil";
import { RegistroEmpresaPage } from "./pages/empresas/registro_empresa";
import { EmpresaPage } from "./pages/empresas/empresa";

export const AppRouter: React.FC<{}> = () => {
    return (
        <Routes>
            <Route path="/" element={<RouterLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/perfil" element={<PerfilPage />} />
                <Route path="/empresa" element={<EmpresaPage />} />
            </Route>
            <Route path="/no" element={<div>no tengo navbar</div>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegistroPage />} />
            <Route path="/registro_empresa" element={<RegistroEmpresaPage />} />
        </Routes>
    );
}