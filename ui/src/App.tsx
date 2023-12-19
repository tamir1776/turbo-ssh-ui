import './App.module.scss'
import {Routes, Route, Navigate} from "react-router-dom";
import LoginScreen from "./modules/login-screen";
import ManagementSSH from "./modules/managemnt-ssh";
import ErrorPage from "./ErrorPage.tsx";
import React from "react";

const App = () => {

    const isAuthenticated = false
    return <Routes>
        <Route path={"/login"} element={<LoginScreen/>}/>
        <Route path={"/management"} element={<ManagementSSH/>}/>
        <Route path={"*"} element={<Navigate to={isAuthenticated ? "/management" : "/login"}/>}/>
    </Routes>

}

export default App
