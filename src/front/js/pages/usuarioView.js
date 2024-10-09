import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import '../../styles/usuarioView.css';

const UsuarioView = () => {
    const { store, actions } = useContext(Context);
    const [form, setForm] = useState({
        ...store.usuario,
        newPassword: "", 
        confirmNewPassword: "" 
    });

    useEffect(() => {
        setForm({ ...store.usuario, newPassword: "", confirmNewPassword: "" });
    }, [store.usuario]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.submitUsuario(form);
    };
    
    return (
        <div className="vista"> 
            <div className="campo">
                <h1 className="titulo"><strong>Editar tu perfil</strong></h1>
                <form className="edit-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre completo</label>
                        <input
                            className="imput"
                            type="text"
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="imput"
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">Nueva Contraseña</label>
                        <input
                            className="imput"
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={form.newPassword}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</label>
                        <input
                            className="imput"
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={form.confirmNewPassword}
                            onChange={handleChange}
                            placeholder="Confirma tu nueva contraseña"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="direccion">Dirección</label>
                        <input
                            className="imput"
                            type="text"
                            id="direccion"
                            name="direccion"
                            value={form.direccion || ""}
                            onChange={handleChange}
                            placeholder="Calle, número, bloque, puerta"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="codigoPostal">Código Postal</label>
                        <input
                            className="imput"
                            type="text"
                            id="codigoPostal"
                            name="codigoPostal"
                            value={form.codigoPostal || ""}
                            onChange={handleChange}
                            placeholder="Tu código postal"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ciudad">Ciudad</label>
                        <input
                            className="imput"
                            type="text"
                            id="ciudad"
                            name="ciudad"
                            value={form.ciudad || ""}
                            onChange={handleChange}
                            placeholder="Tu ciudad"
                        />
                    </div>

                    <button type="submit" className="guardar btn-submit">Guardar los cambios</button>
                </form>
            </div>
        </div>
    );
};

export default UsuarioView;