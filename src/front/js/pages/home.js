import React from 'react';
import '../../styles/home.css'; 
import jumbotron from "../../img/jumbotron.jpeg";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="jumbotron position-relative">
      <img className='position-absolute jumbotron-imagen' src={jumbotron} />
        <div className="todo position-relative">
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

export default Home;
