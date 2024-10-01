import React, { useState } from "react";
import '../../styles/navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faShoppingCart, faHeart, faCoffee } from '@fortawesome/free-solid-svg-icons';
import logo1 from "../../img/logo1.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logo1} alt="Logo" className="logo" />
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
                        <button className="btn login-btn">
                            <FontAwesomeIcon icon={faUser} /> Login
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
