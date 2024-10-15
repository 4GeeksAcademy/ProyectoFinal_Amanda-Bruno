import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/productoUnitario.css';

const ProductoUnitario = () => {
    const { id } = useParams();
    const { actions } = useContext(Context);
    const [producto, setProducto] = useState(null);
    const [peso, setPeso] = useState("");
    const [molienda, setMolienda] = useState("");
    const [cantidad, setCantidad] = useState(1);

    useEffect(() => {
        const fetchProducto = async () => {
            const productoData = await actions.getProductoById(id);
            if (productoData) setProducto(productoData);
        };
        fetchProducto();
    }, [id, actions]);

    const handleAddToCart = () => {
        if (peso && molienda) {
            actions.addToCart(producto.producto_id, cantidad, peso, molienda);  // Suponiendo que tu acción puede manejar estos parámetros
            alert(`Producto agregado: ${cantidad} unidad(es), Peso: ${peso}, Molienda: ${molienda}`);
        } else {
            alert("Por favor, seleccione el peso y la molienda.");
        }
    };

    if (!producto) return <p>Cargando...</p>;
    const total = producto.precio * cantidad;

    return (
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
                        <select value={peso} onChange={(e) => setPeso(e.target.value)}>
                            <option value="">Seleccione</option>
                            <option value="250g">250g</option>
                            <option value="500g">500g</option>
                            <option value="1kg">1kg</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Molienda</label>
                        <select value={molienda} onChange={(e) => setMolienda(e.target.value)}>
                            <option value="">Seleccione</option>
                            {producto.opcion_molido?.tipos.map((opcion) => (
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
    );
};

export default ProductoUnitario;
