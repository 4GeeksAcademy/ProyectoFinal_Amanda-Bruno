import React, { useState } from "react";
import '../../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faShoppingCart, faHeart, faCoffee } from '@fortawesome/free-solid-svg-icons';
import logoNav from "../../img/logoNav.png";
import { Link } from 'react-router-dom';
import LoginNavbar from "./loginNavbar";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // modal del menu hamburguesa
    const [showLoginModal, setShowLoginModal] = useState(false); // modal de login

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
                <img src={logoNav} alt="Logo" className="logo" />
            </div>
            <button className="hamburger-menu" id="hamburger-menu" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className={`navbar-content ${isMenuOpen ? 'active d-lg-block' : 'd-none d-lg-block'}`} id="navbar-content">

                <div className="navbar-right">
                    <div className="dropdown">
                        <Link to="/productos" className="btn productos-btn">
                            <FontAwesomeIcon icon={faCoffee} /> Productos
                        </Link>
                    </div>
                    <div className="dropdown">
                        <button className="btn favorites-btn">
                            <FontAwesomeIcon icon={faHeart} /> Favoritos
                        </button>
                        <div className="dropdown-content">
                            <p>Sin productos en favoritos</p>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button className="btn cart-btn">
                            <FontAwesomeIcon icon={faShoppingCart} /> Carrito
                        </button>
                        <div className="dropdown-content">
                            <p>Carrito vacío</p>
                        </div>
                    </div>

                    <div className="dropdown">
                        <button className="btn login-btn" onClick={handleLoginClick}>
                            <FontAwesomeIcon icon={faUser} /> Login
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
