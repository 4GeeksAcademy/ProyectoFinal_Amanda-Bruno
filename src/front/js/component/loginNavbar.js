import React, { useState } from "react";
import '../../styles/loginNavbar.css';

const LoginNavbar = ({ handleCloseModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                sessionStorage.setItem('token', data.token);
                console.log("Bienvenido a tu cuenta!", data);
                handleCloseModal();  
            } else {
                setError(data.error);
                console.error('Error al iniciar sesión:', data.error);
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            setError('Email o contraseña incorrecta. Inténtalo de nuevo.');
        });
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
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default LoginNavbar;
