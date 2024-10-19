import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext";
import '../../styles/loginNavbar.css';

const LoginNavbar = ({ handleCloseModal, setIsAuthenticated }) => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        actions.loginUsuario(
            email, 
            password, 
            () => {
                setIsAuthenticated(true);
                handleCloseModal();
            },
            (errorMessage) => {
                setError(errorMessage);
            }
        );
    };

    const handleNavigateToSignup = () => {
        handleCloseModal(); 
        navigate("/registrar"); 
    };

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
                        {error && <div className="alert alert-danger">{error}</div>}
                        <form id="login-form" onSubmit={handleSubmit}>
                            <label htmlFor="email"><strong>Email: </strong></label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                            <label htmlFor="password"><strong>Contraseña: </strong></label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <button type="submit" className="btn btn-custom mt-3" style={{ color: '#4B2E0F' }}>
                                Iniciar sesión
                            </button>

                            <p className="regi mt-3">
                                Si no eres usuario y quieres registrarte,{" "}
                                <br></br>
                                <div className="span">
                                <span 
                                    style={{ cursor: "pointer", color: "#4B2E0F" }} 
                                    onClick={handleNavigateToSignup}
                                >
                                    clica aquí.
                                </span>
                                </div>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginNavbar;
