import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import '../../styles/usuarioView.css';

const UsuarioView = () => {
    const { store, actions } = useContext(Context);
    const [form, setForm] = useState({
        name: store.usuario?.nombre_completo,
        email: store.usuario?.email,
        newPassword: '',
        confirmNewPassword: '',
        direccion: store.usuario?.direccion,
        codigoPostal: store.usuario?.codigoPostal,
        ciudad: store.usuario?.ciudad,
        telefono: store.usuario?.telefono
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        actions.getUsuarioData()
            .then(data => {
                if (data) {
                    setForm({
                        name: data.nombreCompleto || '',
                        email: data.email || '',
                        direccion: data.direccion || '',
                        codigoPostal: data.codigoPostal || '',
                        ciudad: data.ciudad || '',
                        telefono: data.telefono || ''
                    });
                }
            })
            .catch(err => console.error('Error al cargar los datos del usuario:', err));
    }, [actions]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const error = actions.validarSenhas(form.newPassword, form.confirmNewPassword);
        if (error) {
            alert(error);
            return;
        }

        setIsSubmitting(true);

        actions.submitUsuario(form)
            .then(() => {
                alert("Los datos han sido actualizados.");
            })
            .catch((error) => {
                console.error('Error en la solicitud:', error);
                alert('Error al actualizar los datos.');
            })
            .finally(() => {
                setIsSubmitting(false);
            });
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
                            value={form.direccion}
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
                            value={form.codigoPostal}
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
                            value={form.ciudad}
                            onChange={handleChange}
                            placeholder="Tu ciudad"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            className="imput"
                            type="text"
                            id="telefono"
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            placeholder="Tu número de teléfono"
                        />
                    </div>
                    <button type="submit" className="guardar btn-submit" disabled={isSubmitting}>
                        {isSubmitting ? "Guardando..." : "Guardar los cambios"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UsuarioView;
