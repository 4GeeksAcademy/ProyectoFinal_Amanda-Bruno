import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import '../../styles/productoUnitario.css';

const ProductoUnitario = () => {
    const { store, actions } = useContext(Context);
    const { producto_id } = useParams();
    const [peso, setPeso] = useState(250);
    const [molienda, setMolienda] = useState("");
    const [cantidad, setCantidad] = useState(1);
    
    useEffect(() => {
        actions.get_producto_by_id(producto_id);
    }, [producto_id]);

    const producto = store.producto;

    const total = producto ? producto.precio * cantidad : 0;

    const handleAddToCart = () => {
        console.log(`Producto ${producto.nombre} agregado al carrito`);
    };

    return producto ? (
        <div className="container">
            <div className="row">
                <div className="col image-section">
                    <img
                        src={producto.imagen_url}
                        alt={producto.nombre}
                        className="product-image"
                    />
                    <h3>{producto.nombre}</h3>
                    <p>{producto.region}</p>
                    <p className="price">€{producto.precio.toFixed(2)} por unidad</p>
                </div>

                <div className="col details-section">
                    <h5>Descripción</h5>
                    <p className="description">{producto.descripcion}</p>

                    <div className="form-group">
                        <label>Peso</label>
                        <select value={peso} onChange={(e) => setPeso(Number(e.target.value))}>
                            <option value={250}>250g</option>
                            <option value={500}>500g</option>
                            <option value={750}>750g</option>
                            <option value={1000}>1kg</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Molienda</label>
                        <select value={molienda} onChange={(e) => setMolienda(e.target.value)}>
                            <option value="">Seleccione</option>
                            {producto.opcion_molido?.tipos?.map((opcion) => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group quantity-control">
                        <label>Cantidad</label>
                        <div className="quantity-buttons">
                            <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}>-</button>
                            <input
                                type="number"
                                value={cantidad}
                                onChange={(e) => setCantidad(Number(e.target.value))}
                                min="1"
                            />
                            <button onClick={() => setCantidad(cantidad + 1)}>+</button>
                        </div>
                    </div>

                    <button
                        className="add-to-cart"
                        onClick={handleAddToCart}
                        disabled={!peso || !molienda}
                    >
                        Agregar al carrito – Total: €{total.toFixed(2)}
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <p>Cargando producto...</p>
    );
};

export default ProductoUnitario;
