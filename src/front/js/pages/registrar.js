import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/registrar.css";
import { Context } from '../store/appContext';

const Registrar = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        
        actions.registrar(form, navigate);
    };    
      
    return (
        <div className="registrar-container">
            <h1><strong> Regístrate </strong></h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nombre completo:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
              
                <button type="submit" className="registrar">Registrar</button>
            </form>
        </div>
    );
};

export default Registrar;
