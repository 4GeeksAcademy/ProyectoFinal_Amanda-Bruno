import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import '../../styles/productoPorPeso.css';

export const ProductoPorPeso = () => {
    const params = useParams()
    const [productos, setProductos] = useState([])
    const obtenerProductos = async ()=> {
        try {
            const response = await fetch (`${process.env.BACKEND_URL}/api/productoPorPeso/${params.peso}`)
            const data = await response.json()
            setProductos(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        obtenerProductos()
    },[])
    console.log(productos)
    return (
        <div className="product-container"> 
            {productos?.map((producto) => { 
                return (
                    <div className="product-card" key={producto.id}>
                        <img src={producto.imagen_url} alt={producto.nombre} className="product-image" />
                        <Link to={`/producto/${producto.id}`} className="product-name">
                            {producto.nombre}
                        </Link>
                        <p className="product-origin">Origen: {producto.region}</p>
                        <p className="product-price">Precio: €{producto.precio.toFixed(2)}</p>
                    </div>
                )
            })}
        </div>
    )
}
