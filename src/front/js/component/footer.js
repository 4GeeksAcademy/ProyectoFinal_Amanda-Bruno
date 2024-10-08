import React from 'react';
import '../../styles/footer.css'; 
import logo from "../../img/logo.png";
import flor from "../../img/flor.png";
import instagram from "../../img/instagram.png";
import x from "../../img/x.png";
import youtube from "../../img/youtube.png";
import applepay from "../../img/applepay.png";
import mastercard from "../../img/mastercard.png";
import visa from "../../img/visa.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Enlaces</h4>
          <ul>
            <li><a href="/quienSomos">Sobre Nosotros</a></li>
            <li><a href="/terminosCondiciones">Términos y Condiciones</a></li>
            <li><a href="/privacidad">Privacidad</a></li>
            <li><a href="/envios">Envíos</a></li>
            <li><a href="/devoluciones">Devoluciones</a></li>
          </ul>
        </div>
        <div className="footer-section social-section">
          <h2>Síguenos</h2>
          <div className="social-icons">
            <a href="https://twitter.com/_the_coffee"><img src={x} alt="X" /></a>
            <a href="https://www.instagram.com/coffee.abia?igsh=c25ocW1jZ2oxNzVj"><img src={instagram} alt="Instagram" /></a>
            <a href="https://www.youtube.com/watch?v=TEH_kNy5Ebk"><img src={youtube} alt="YouTube" /></a>
          </div>
          <div className="footer-logo">
            <img src={logo} alt="Logo de la empresa" />
          </div>
        </div>
        <div className="footer-section">
          <h4>Métodos de Pago</h4>
          <div className="payment-icons">
            <img src={visa} alt="Visa" />
            <img src={mastercard} alt="Mastercard" />
            <img src={applepay} alt="Apple Pay" />
          </div>
        </div>
      </div>
      <div className="footer-image">
        <img src={flor} alt="Imagen decorativa" />
      </div>
      <p className="footer-note">© 2024 Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;