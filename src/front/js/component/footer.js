import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="#">Sobre Nosotros</a></li>
            <li><a href="#">Home</a></li>
            <li><a href="#">Pedidos</a></li>
            <li><a href="#">Términos y Condiciones</a></li>
            <li><a href="#">Privacidad</a></li>
            <li><a href="#">Envíos</a></li>
            <li><a href="#">Devoluciones</a></li>
          </ul>
        </div>
        <div className="footer-section social-section">
          <h2>Síguenos</h2>
          <div className="social-icons">
            <a href="#"><img src="icons/X.png" alt="X" /></a>
            <a href="#"><img src="icons/Instagram.png" alt="Instagram" /></a>
            <a href="#"><img src="icons/Youtube.png" alt="YouTube" /></a>
          </div>
          <div className="footer-logo">
            <img src="icons/logo1.png" alt="Logo de la empresa" />
          </div>
        </div>
        <div className="footer-section">
          <h4>Métodos de Pago</h4>
          <div className="payment-icons">
            <img src="icons/visa.png" alt="Visa" />
            <img src="icons/paypal.png" alt="PayPal" />
            <img src="icons/applepay.png" alt="Apple Pay" />
            <img src="icons/mastercard.png" alt="Mastercard" />
          </div>
        </div>
      </div>
      <div className="footer-image">
        <img src="icons/flor.png" alt="Imagen decorativa" />
      </div>
      <p className="footer-note">© 2024 Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;