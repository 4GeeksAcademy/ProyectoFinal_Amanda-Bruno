import React, { useState, useEffect } from 'react';
import '../../styles/carritoCompra.css';
import { Link, useNavigate } from 'react-router-dom';

const CarritoCompra = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        actions.fetchCartItems();
    }, []);

    const handleQuantityChange = (id, quantity) => {
        actions.updateItemQuantity(id, quantity);  
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0).toFixed(2);
    };

    if (loading) {
        return <div>Cargando carrito de compras...</div>;
    }

    return (
        <div className="carritoCompra">
            <div className="carrito-items">
                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Tu carrito esta vacio</h2>
                        <p>Parece que no has agregado productos aun</p>
                        <Link to="/todosProductos" className="add-more">+ Agregar más productos</Link>
                    </div>
                ) : (
                    cartItems.map(item => (
                        <div className="carrito-item" key={item.producto_id}>
                            <div className="item-details">
                                <h3>{item.nombre}</h3>
                                <p>{item.descripcion}</p>
                                <p>{item.region}</p>
                            </div>
                            <div className="item-controls">
                                <button onClick={() => updateItemQuantity(item.producto_id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateItemQuantity(item.producto_id, item.quantity + 1)}>+</button>
                            </div>
                            <div className="item-price">
                                <p>{(item.precio * item.quantity).toFixed(2)}€</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="order-summary">
                <h2>Resumen del pedido</h2>
                {cartItems.length === 0 ? (
                    <div className="empty-summary">
                        <p>No hay productos en tu carrito</p>
                    </div>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <div className="summary-item" key={item.producto_id}>
                                <p>{item.quantity}x {item.nombre}</p>
                                <p>{(item.precio * item.quantity).toFixed(2)}€</p>
                            </div>
                        ))}
                        <div className="summary-total">
                            <p>Subtotal</p>
                            <p>{calculateTotal()}€</p>
                        </div>
                        <div className="summary-total">
                            <p>Total</p>
                            <p>{calculateTotal()}€</p>
                        </div>
                    </>
                )}
                <div className="terms">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">He leído y acepto los <a href="/terminosCondiciones">términos y condiciones</a> de uso.</label>
                </div>
                <button className="pagar-btn" disabled={cartItems.length === 0}>Realizar pedido</button>
            </div>
        </div>
    );
};

export default CarritoCompra;