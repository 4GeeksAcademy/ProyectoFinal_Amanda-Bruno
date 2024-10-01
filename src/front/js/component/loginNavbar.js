import React from "react";
import '../../styles/loginNavbar.css';

const LoginNavbar = ({ handleCloseModal }) => {
    return (
        <div className="modal show d-block">
            <div className="modal-dialog">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title">ENTRAR EN EL MUNDO ABI&A</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={handleCloseModal}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <form id="login-form" >
                            <label htmlFor="email"><strong> Email: </strong></label>
                            <input type="email" id="email" name="email" required />
                            <label htmlFor="password"><strong> Contraseña: </strong></label>
                            <input type="password" id="password" name="password" required />
                        </form>
                    </div>

                    <div className="modal-footer">
                        <a href="/signup" className="btn btn-custom" style={{ color: '#4B2E0F' }}>
                            Crear usuario
                        </a>

                        <button type="button" className="btn btn-custom " style={{ color: '#4B2E0F' }}>
                            Iniciar sesión
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default LoginNavbar;
