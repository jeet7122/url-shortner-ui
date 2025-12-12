import React from 'react'
import Navbar from "./components/Navbar.jsx";
import {Toaster} from "react-hot-toast";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LandingPage from "./components/LandingPage.jsx";
import AboutPage from "./components/AboutPage.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import LoginPage from "./components/LoginPage.jsx";
import DashboardLayout from "./components/dashboard/DashboardLayout.jsx";
import Footer from "./components/Footer.jsx";
import ShortenUrlPage from "./components/ShortenUrlPage.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import ErrorPage from "./components/ErrorPage.jsx";

const AppRouter = () => {
    return (
        <>
            <Navbar/>
            <Toaster position='bottom-center'/>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage/></PrivateRoute>}/>
                <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage/></PrivateRoute>}/>
                <Route path="/dashboard" element={<PrivateRoute publicPage={false}><DashboardLayout/></PrivateRoute>}/>
                <Route path="*" element={<ErrorPage message={"We can't seem to find the page you are looking for"}/>}/>
                <Route path="/error" element={<ErrorPage message={"Something went wrong"}/>}/>
            </Routes>
            <Footer/>
        </>
    )
}
export default AppRouter

export const SubDomainRouter = () => {
    return (
        <Routes>
            <Route path="/:url" element={<ShortenUrlPage/>}/>
        </Routes>
    )
}
