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
        codigo_postal: store.usuario?.codigo_postal,
        ciudad: store.usuario?.ciudad,
        telefono: store.usuario?.telefono
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
            const data = store.usuario ? store.usuario : JSON.parse(sessionStorage.getItem('user')) ;
            console.log(data) 
                if (data) {
                    setForm({
                        name: data.nombreCompleto || '',
                        direccion: data.direccion || '',
                        codigo_postal: data.codigo_postal || '',
                        ciudad: data.ciudad || '',
                        telefono: data.telefono || ''
                    });
                }

    }, [store.usuario]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

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
                        <label htmlFor="codigo_postal">Código Postal</label>
                        <input
                            className="imput"
                            type="text"
                            id="codigo_postal"
                            name="codigo_postal"
                            value={form.codigo_postal}
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
     
                    <button type="submit" className="guardar btn-submit" disabled={isSubmitting}>
                        {isSubmitting ? "Guardando..." : "Guardar los cambios"}
                    </button>
                    
                </form>
            </div>
        </div>
    );
};

export default UsuarioView;
