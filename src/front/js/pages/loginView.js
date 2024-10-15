import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import { Context } from "../store/appContext"; 
import '../../styles/loginView.css';

const LoginView = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate(); 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.loginUsuario(
            email, 
            password, 
            () => navigate('/'),
            (errorMessage) => setError(errorMessage)
        );
    };

    return (
        <div className="login-view">
            <div className="login-content">
                <div className="login-header">
                    <h1 className="login-title">ENTRAR EN EL MUNDO ABI&A</h1>
                </div>

                <div className="login-body">
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
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginView;
