import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import '../../styles/pesosProductos.css';
import paquetecafe from "../../img/paquetecafe.webp";

const PesosProductos = () => {
    const { store, actions } = useContext(Context);
    const pesos = [250, 500, 750, 1000]

    return (
        <div className="elige">
            <h1 className="elige">Elige el peso: </h1>
        <div className="producto-container">
            {pesos.map((peso, index) => (
                <div className="product-card" key={index}>
                    <Link to={`/productoPorPeso/${peso}`}> 

                    <div className="product-image">
                        <img src={paquetecafe} alt="paquete de cafe" />
                    </div>

                    <p className="peso-producto">Productos de {peso}g </p>
                    </Link>
                </div>
            ))}
        </div>
        </div>
    );
};

export default PesosProductos;
