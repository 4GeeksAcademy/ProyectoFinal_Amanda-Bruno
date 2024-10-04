import React from 'react';
import '../../styles/usuarioView.css'; 

const UsuarioView = () => {
  return (
    <div className="vista"> 
    <div className="campo">
      <h1>Editar tu perfil</h1>
      <form className="edit-form">
        <div className="form-group">
          <label htmlFor="NombreCompleto">Nombre completo</label>
          <br></br>
          <input type="text" id="NombreCompleto" name="NombreCompleto" placeholder="Tu nombre completo" />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <br></br>
          <input type="email" id="email" name="email" placeholder="Tu email" />
        </div>

        <div className="form-group">
          <label htmlFor="contraseña">Contraseña</label>
          <br></br>
          <input type="password" id="contraseña" name="contraseña" placeholder="Nueva contraseña" />
        </div>

        <div className="form-group">
          <label htmlFor="confirmarContraseña">Confirmar contraseña</label>
          <br></br>
          <input type="password" id="confirmarContraseña" name="confirmarContraseña" placeholder="Confirmar nueva contraseña" />
        </div>
        <br></br>
        <button type="submit" className="guardar btn-submit">Guardar los cambios</button>
      </form>
    </div>
    </div>
  );
};

export default UsuarioView;
