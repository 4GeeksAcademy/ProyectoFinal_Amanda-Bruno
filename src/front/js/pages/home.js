import React from 'react';
import '../../styles/home.css'; 
import jumbotron from "../../img/jumbotron.jpeg";
import SlideHome from './slideHome';

const Home = () => {
  return (
    <div>
    <div className="mt-3">
      <div className="jumbotron position-relative">
      <img className='position-absolute jumbotron-imagen' src={jumbotron} />
        <div className="todo position-relative">
          <h1 className="display-4">¡Bienvenido a Abi&a!</h1>
          <p className="lead">Mejora cada mañana con buen café.</p>
          <p>Explora nuestros productos y encuentra tu sabor perfecto en sólo un click.</p>
          <a className="btn btn-custom btn-lg" href="/todosProductos" role="button" style={{ color: '#556967' }}>
            Pide tu café
          </a>
        </div>
      </div>
    </div>
          <SlideHome />
          </div>
  );
};

export default Home;
