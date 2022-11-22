import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "pages/Dashboard";
import  Login  from "../pages/Login";
import Cadastro from '../pages/Cadastro'

export default function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/cadastro' element={<Cadastro />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}