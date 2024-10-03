"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json, abort, session
from api.models import db, Usuario, Producto, CarritoDeCompra, Pedido
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# POST Usuario
@api.route('/registro', methods=['POST'])
def create_usuario():
    data = request.get_json()

    # Campos requeridos
    if not data or not all(key in data for key in ("email", "password")):
        return jsonify({"error": "Faltan completar campos obligatorios"}), 400
    
    # Verificar si el usuario ya existe
    if Usuario.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Ya existe un usuario con este email"}), 400

    # Ocultar la contraseña
    hashed_password = generate_password_hash(data['password'])

    # Crear nuevo usuario
    new_usuario = Usuario(
        email=data['email'],
        password=hashed_password
    )

    # Guardar en la base de datos
    db.session.add(new_usuario)
    db.session.commit()

    return jsonify({"mensaje": "Usuario creado con exito"}), 201

# GET Usuario
@api.route('/usuario/<email>', methods=['GET'])
def get_usuario_by_email(email):
    if not email:
        return jsonify({"error": "No se ha encontrado el email"}), 400

    usuario = Usuario.query.filter_by(email=email).first()
    
    if not usuario:
        return jsonify({"error": "El usuario no ha sido encontrado"}), 404
    
    return jsonify(usuario.serialize()), 200

# POST Login - Iniciar sesión
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data or not 'email' in data or not 'password' in data:
        return jsonify({"error": "Email y contraseña son requeridos"}), 400

    usuario = Usuario.query.filter_by(email=data['email']).first()

    if not usuario or not check_password_hash(usuario.password, data['password']):
        return jsonify({"error": "Credenciales incorrectas"}), 401

    # Generar JWT token
    token = create_access_token(identity=usuario.id)

    # Guardar el ID del usuario en la sesión
    session_cart = session.get('carrito', [])
    if session_cart:
        carrito = CarritoDeCompra.query.filter_by(usuario_id=usuario.id).first()
        if not carrito:
            carrito = CarritoDeCompra(usuario_id=usuario.id)
            db.session.add(carrito)

        # Transferir productos del carrito de la sesión al carrito del usuario
        for item in session_cart:
            producto = Producto.query.filter_by(producto_id=item['producto_id']).first()
            if producto:
                carrito.productos.append(producto)
                carrito.cantidad = item['cantidad']
        
        db.session.commit()
        session.pop('carrito', None)  # Limpiar carrito de la sesión

    return jsonify({"mensaje": "Inicio de sesión exitoso", "token": token}), 200

#POST Logout - Cerrar sesión
@api.route('/logout', methods=['POST'])
def logout():
    # Eliminar el ID del usuario de la sesión
    session.pop('usuario_id', None)
    return jsonify({"mensaje": "Cierre de sesión exitoso"}), 200

# INIT Productos
@api.route('/init_productos', methods=['POST'])
def init_productos():
    # Leer productos desde el archivo JSON
    productos_file_path = 'src/api/data/productos.json'
    
    try:
        with open(productos_file_path, 'r') as f:
            productos = json.load(f)
    except FileNotFoundError:
        return jsonify({"error": "productos.json no encontrado"}), 404

    # Agregar productos a la base de datos
    for producto in productos:
        new_producto = Producto(
            producto_id=producto['producto_id'],
            nombre=producto['nombre'],
            descripcion=producto['descripcion'],
            precio=producto['precio'],
            region=producto['region'],
            peso=producto['peso'],
            perfil_sabor=producto['perfil_sabor'],
            opcion_molido=producto['opcion_molido'],
            nivel_tostado=producto['nivel_tostado'],
            imagen_url=producto['imagen_url']
        )
        db.session.add(new_producto)

    db.session.commit()
    return jsonify({"mensaje": "Productos cargados con exito"}), 201

# GET Productos (todos)
@api.route('/productos', methods=['GET'])
def get_productos():
    # Fetch todos los productos
    productos = Producto.query.all()
    if not productos:
        return jsonify({"error": "No hay productos en la base de datos"}), 404

    return jsonify([producto.serialize() for producto in productos]), 200

# GET Producto por ID
@api.route('/productos/<int:producto_id>', methods=['GET'])
def get_producto_by_id(producto_id):
    producto = Producto.query.filter_by(producto_id=producto_id).first()
    
    if not producto:
        return abort(404, description=f"Producto con ID {producto_id} no encontrado")
    
    return jsonify(producto.serialize()), 200

if __name__ == '__main__':
    api.run(debug=True)

# POST - Agregar al CarritoDeCompras
@api.route('/carrito/agregar', methods=['POST'])
@jwt_required(optional=True)
def agregar_al_carrito():
    data = request.get_json()
    
    if not data or not 'producto_id' in data or not 'cantidad' in data:
        return jsonify({"error": "Producto ID y cantidad son requeridos"}), 400

    producto = Producto.query.filter_by(producto_id=data['producto_id']).first()

    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404

    cantidad = data['cantidad']

    current_user = get_jwt_identity()
    if current_user:
        # Usuario logueado 
        carrito = CarritoDeCompra.query.filter_by(usuario_id=current_user).first()

        if not carrito:
            carrito = CarritoDeCompra(usuario_id=current_user)
            db.session.add(carrito)
        
        # Agregar o actualizar producto en el carrito del usuario
        carrito.productos.append(producto)
        carrito.cantidad = cantidad
        db.session.commit()

    else:
        # Usuario no logueado, usar sesión
        session_cart = session.get('carrito', [])
        session_cart.append({"producto_id": producto.producto_id, "cantidad": cantidad})
        session['carrito'] = session_cart

    return jsonify({"mensaje": "Producto agregado al carrito"}), 200

# DELETE - Eliminar productos del CarritoDeCompras  
@api.route('/carrito/eliminar', methods=['DELETE'])
@jwt_required(optional=True)
def eliminar_del_carrito():
    data = request.get_json()
    
    if not data or not 'producto_id' in data:
        return jsonify({"error": "Producto ID es requerido"}), 400

    producto = Producto.query.filter_by(producto_id=data['producto_id']).first()

    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404

    current_user = get_jwt_identity()
    if current_user:
        # Usuario autenticado
        carrito = CarritoDeCompra.query.filter_by(usuario_id=current_user).first()

        if carrito and producto in carrito.productos:
            carrito.productos.remove(producto)
            db.session.commit()

    else:
        # Usuario no autenticado, usar sesión
        session_cart = session.get('carrito', [])
        session_cart = [item for item in session_cart if item['producto_id'] != producto.producto_id]
        session['carrito'] = session_cart

    return jsonify({"mensaje": "Producto eliminado del carrito"}), 200

# DELETE - Vaciar CarritoDeCompras  
@api.route('/carrito/limpiar', methods=['DELETE'])
@jwt_required(optional=True)
def limpiar_carrito():
    current_user = get_jwt_identity()

    if current_user:
        # Usuario autenticado
        carrito = CarritoDeCompra.query.filter_by(usuario_id=current_user).first()

        if carrito:
            carrito.productos.clear()
            db.session.commit()

    else:
        # Usuario no autenticado, vaciar carrito de la sesión
        session.pop('carrito', None)

    return jsonify({"mensaje": "Carrito vacio"}), 200





