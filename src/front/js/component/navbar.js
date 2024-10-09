import React, { useState } from "react";
import '../../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faShoppingCart, faHeart, faCoffee, faAddressCard, faShop } from '@fortawesome/free-solid-svg-icons';
import logoNav from "../../img/logoNav.png";
import { Link } from 'react-router-dom';
import LoginNavbar from "./loginNavbar";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    const [showLoginModal, setShowLoginModal] = useState(false); 

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLoginClick = () => {
        setShowLoginModal(true); 
    };

    const handleCloseModal = () => {
        setShowLoginModal(false); 
    };

    return (
        <div> 
        <nav className="navbar">
            <div className="navbar-left">
            <Link to="/">
                    <img src={logoNav} alt="Logo" className="logo" />
                </Link>
            </div>
            <button className="hamburger-menu" id="hamburger-menu" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className={`navbar-content ${isMenuOpen ? 'active d-lg-block' : 'd-none d-lg-block'}`} id="navbar-content">

                <div className="navbar-right">
                <div className="dropdown">
                        <Link to="/quienSomos" className="btn productos-btn">
                            <FontAwesomeIcon icon={faShop} /> Nuestro café
                        </Link>
                    </div>

                    <div className="dropdown">
                        <Link to="/productos" className="btn productos-btn">
                            <FontAwesomeIcon icon={faCoffee} /> Productos
                        </Link>
                    </div>

                    <div className="dropdown">
                        <Link to="/carritoCompra" className="btn cart-btn">
                            <FontAwesomeIcon icon={faShoppingCart} /> Carrito
                       </Link>
                        <div className="dropdown-content">
                            <p>Carrito vacío</p>
                        </div>
                    </div>

                     <div className="dropdown">
                        <Link to="/registrar" className="btn productos-btn">
                            <FontAwesomeIcon icon={faAddressCard} /> Registrar
                        </Link>
                    </div>

                    <div className="dropdown">
                        <button className="btn login-btn" onClick={handleLoginClick}>
                            <FontAwesomeIcon icon={faUser} /> Iniciar sesión
                        </button>
                    </div>

                </div>
            </div>
        </nav>

        {showLoginModal && <LoginNavbar handleCloseModal={handleCloseModal} />} 
        </div>
    );
};

export default Navbar;
