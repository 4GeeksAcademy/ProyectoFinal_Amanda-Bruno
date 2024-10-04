import React, { useState } from "react";
import "../../styles/registrar.css";

const Registrar = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    console.log(form)
        fetch('https://potential-winner-pj7vx5qp4wvrcx49-3001.app.github.dev/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.error); });
            }
            return response.json();
        })
        .then(data => {
            if (data.mensaje) {
                console.log('Usuário registrado com éxito:', data.mensaje);
                alert('Registro exitoso');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            alert('Error al registrar: ' + error.message);
        });
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
