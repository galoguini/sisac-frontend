import React from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LoginPage } from "./pages/usuarios/login";
import { RouterLayout } from "./common/RouterLayout";

export const AppRouter: React.FC<{}> = () => {
    return (
        <Routes>
            <Route path="/" element={<RouterLayout />}>
                <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="/no" element={<div>no tengo navbar</div>} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}