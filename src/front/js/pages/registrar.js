import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/registrar.css";
import { Context } from '../store/appContext';
import swal from "sweetalert";

const Registrar = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "" 
    });

    const { actions } = useContext(Context);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const validarPassword = (newPassword, confirmNewPassword) => {
        if (!newPassword || !confirmNewPassword) {
            return "Ambos campos de contraseña son obligatorios.";
        }

        if (newPassword.length < 8) {
            return "La contraseña debe tener al menos 8 caracteres.";
        }

        const regexMayuscula = /[A-Z]/;
        if (!regexMayuscula.test(newPassword)) {
            return "La contraseña debe contener al menos una letra mayúscula.";
        }

        if (newPassword !== confirmNewPassword) {
            return "Las contraseñas no coinciden.";
        }

        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const error = validarPassword(form.password, form.confirmPassword);
        if (error) {
            swal({
                title: "Error",
                text: error,
                icon: "error",
                button: {
                    text: "Aceptar",
                    className: "my-blue-button" 
                },
                timer: 10000 ,
                className: "custom-alert"
            });
            return; 
        }

        console.log(form); 
        actions.registrar(form, () => {
            swal({
                title: "Registro exitoso",
                text: "¡Te has registrado correctamente!",
                icon: "success",
                button: {
                    text: "Iniciar sesión",
                    className: "my-blue-button",
                    className: "custom-alert"
                },
            
            }).then(() => {
                navigate('/loginView');
            });
        });
    };

    return (
        <div className="registrar-container">
            <h1><strong>Regístrate</strong></h1>
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
                <div>
                    <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="registrar">Registrar</button>
            </form>
        </div>
    );
};

export default Registrar;
