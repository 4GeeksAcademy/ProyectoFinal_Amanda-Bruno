import React, { useState } from 'react';
import '../../styles/carritoCompra.css';
import { Link } from 'react-router-dom';

const CarritoCompra = () => {
    const [cartItems, setCartItems] = useState([
        {
            producto_id: 1,
            nombre: "Café Colombiano Premium",
            descripcion: "Café 100% arábica de la región montañosa de Colombia.",
            precio: 15.99,
            region: "Colombia",
            peso: 500,
            nivel_tostado: 3,
            perfil_sabor: { "notas": ["chocolate", "nuez", "frutal"] },
            opcion_molido: { "tipos": ["grano", "molido fino", "molido medio"] },
            imagen_url: "https://iili.io/H8Y7Opp.webp",
            quantity: 1 
        }
    ]);

    const updateItemQuantity = (id, newQuantity) => {
        setCartItems(cartItems.map(item =>
            item.producto_id === id ? { ...item, quantity: newQuantity } : item
        ));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.precio * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="carritoCompra">
            <div className="carrito-items">
                {cartItems.map(item => (
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
                ))}
                <Link to="/productos" className="add-more">+ Agregar más productos</Link>
            </div>

            <div className="order-summary">
                <h2>Resumen del pedido</h2>
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
                <div className="opciones-envio">
                </div>
                <div className="terms">
                    <input type="checkbox" id="terms" />
                    <label htmlFor="terms">He leído y acepto los términos y condiciones <a href="/terminosCondiciones">términos y condiciones</a> de uso.</label>
                </div>
                <button className="pagar-btn">Pagar</button>
            </div>
        </div>
    );
};

export default CarritoCompra;
