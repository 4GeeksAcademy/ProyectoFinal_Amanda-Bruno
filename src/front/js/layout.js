import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Home from "./pages/home";
import  QuienSomos  from "./pages/quienSomos"
import injectContext from "./store/appContext";

import Navbar from "./component/navbar";
import Footer from "./component/footer";
import Registrar from "./pages/registrar";
import CarritoCompra from "./pages/carritoCompra";
import TerminosCondiciones from "./pages/terminosCondiciones";
import Privacidad from "./pages/privacidad";
import Envios from "./pages/envios";
import Devoluciones from "./pages/devoluciones";
 
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
        <BrowserRouter basename={basename}>
            <ScrollToTop>
                <Navbar />
                <Routes>
                    <Route element={<Home />} path="/" />
                    <Route element={<QuienSomos />} path="/quienSomos" />
                    <Route element={<Registrar />} path="/registrar" /> 
                    <Route path="/carritoCompra" element={<CarritoCompra />} />
                    <Route path="/terminosCondiciones" element={<TerminosCondiciones />} />
                    <Route path="/privacidad" element={<Privacidad />} />
                    <Route path="/envios" element={<Envios />} />
                    <Route path="/devoluciones" element={<Devoluciones />} />
                    <Route element={<h1>Not found!</h1>} />
                </Routes>
                <Footer />
            </ScrollToTop>
        </BrowserRouter>
    </div>
);
};


export default injectContext(Layout);
