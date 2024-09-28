import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; 

const Jumbotron = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron">
        <div className="todo">
          <h1 className="display-4">¡Bienvenido a Abi&a!</h1>
          <p className="lead">Mejora cada mañana con buen café.</p>
          <p>Explora nuestros productos y encuentra tu sabor perfecto.</p>
          <p>Café de especialidad en grano o molido en sólo un click.</p>
          <a className="btn btn-custom btn-lg" href="#" role="button" style={{ color: '#4B2E0F' }}>
            Pide tu café
          </a>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
