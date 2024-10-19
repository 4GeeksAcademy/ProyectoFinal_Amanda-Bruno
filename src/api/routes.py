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
import stripe
import datetime

api = Blueprint('api', __name__)
stripe.api_key = 'sk_test_51QAvoQK7BJC5w4F5ForFM6XfFwoYLLhx3TGsxm90yV6xaJP1F6XBl52emb9zX0fcEs97qCvgM9KR285f2AadzJIL00KJ6NHoIO'

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
        nombre_completo=data['name'],
        email=data['email'],
        password=hashed_password
    )

    # Guardar en la base de datos
    db.session.add(new_usuario)
    db.session.commit()

    return jsonify({"mensaje": "Usuario creado con exito"}), 201

# PUT Usuario
@api.route('/usuario/update', methods=['PUT'])
@jwt_required()
def update_usuario():
    data = request.get_json()
    id = get_jwt_identity()

    usuario = Usuario.query.get(id)

    if not usuario:
        return jsonify({"error": "El usuario no ha sido encontrado"}), 404
    
    if 'password' in data:
        usuario.password = generate_password_hash(data['password'])
    print(usuario)
    # Actualizar los campos del usuario según los datos recibidos
    usuario.nombre_completo = data.get('nombre_completo', usuario.nombre_completo)
    usuario.direccion = data.get('direccion', usuario.direccion)
    usuario.codigo_postal = data.get('codigo_postal', usuario.codigo_postal)
    usuario.ciudad = data.get('ciudad', usuario.ciudad)
    usuario.telefono = data.get('telefono', usuario.telefono)
    
    db.session.commit()
    return jsonify({"mensaje": "Usuario actualizado con exito", "usuario": usuario.serialize()}), 200

# GET Usuario
@api.route('/usuario', methods=['GET'])
@jwt_required()
def get_usuario_by_email(email):
    email=get_jwt_identity()
    
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

    return jsonify({"mensaje": "Inicio de sesión exitoso", "token": token, "user": usuario.serialize()}), 200

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
    
    multiplicadores_peso = {
        "250": 1,
        "500": 1.5,
        "750": 2.0,
        "1000": 2.5
    }

    # Agregar productos a la base de datos y a Stripe
    for producto in productos:
        for peso in producto['peso']['peso']:
            precio_base = producto['precio'] * 100
            multiplicador = multiplicadores_peso[str(peso)]
            precio_con_multiplicador = precio_base * multiplicador

            producto_stripe = stripe.Product.create(
                name=f"{producto['nombre']} {peso}",
                description=producto['descripcion'],
                images=[producto['imagen_url']],
                metadata={
                    'region': producto['region'],
                    'peso': str(peso),
                    'nivel_tostado': str(producto['nivel_tostado']),
                    'perfil_sabor': ', '.join(producto['perfil_sabor']['notas']),
                    'opcion_molido': ', '.join(producto['opcion_molido']['tipos'])
                }
            )

            precio_stripe = stripe.Price.create(
                product=producto_stripe.id,
                unit_amount=int(precio_con_multiplicador),
                currency='eur'
            )

            new_producto = Producto(
                producto_id=f"{producto['producto_id']}_{peso}",  
                nombre=f"{producto['nombre']} {peso}",
                descripcion=producto['descripcion'],
                precio=precio_con_multiplicador / 100,
                region=producto['region'],
                peso=peso,
                perfil_sabor=producto['perfil_sabor'],
                opcion_molido=producto['opcion_molido'],
                nivel_tostado=producto['nivel_tostado'],
                imagen_url=producto['imagen_url'],
                precio_stripe_id=precio_stripe.id,
                producto_stripe_id=producto_stripe.id
            )
            db.session.add(new_producto)

    db.session.commit()
    return jsonify({"mensaje": "Productos cargados con exito"}), 201

# GET Productos (todos)
@api.route('/productos', methods=['GET'])
def get_productos():
    peso_seleccionado = request.args.get('peso', default=250, type=int)

    # Fetch todos los productos
    productos = Producto.query.all()
    if not productos:
        return jsonify({"error": "No hay productos en la base de datos"}), 404

    return jsonify({'productos':[producto.serialize() for producto in productos]}), 200

# GET Producto por ID
@api.route('/productos/<int:producto_id>', methods=['GET'])
def get_producto_by_id(producto_id):
    producto = Producto.query.filter_by(producto_id=producto_id).first()
    
    if not producto:
        return abort(404, description=f"Producto con ID {producto_id} no encontrado")

    return jsonify({'producto': producto.serialize()}), 200

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

# POST - Checkout
@api.route('/checkout', methods=['POST'])
@jwt_required()
def checkout():
    current_user_id = get_jwt_identity()
    print(f"Current User ID: {current_user_id}")

    carrito = CarritoDeCompra.query.filter_by(usuario_id=current_user_id).first()
    items_en_carrito = request.get_json().get('items', [])
    print(f"Articulos en carrito: {items_en_carrito}")
    
    if not carrito:
        return jsonify({'error': 'No se ha encontrado un carrito de compras para este usario'}), 404
    print(f"Carrito ID: {carrito.carrito_id}")

    if not items_en_carrito:
        print("No hay articulos en el carrito")
        return jsonify({'error': 'No hay articulos en el carrito'}), 422

    items = []
    total_facturacion = 0

    for item in items_en_carrito:
        print(f"Procesando articulo: {item}")

        if 'producto_id' not in item or 'cantidad' not in item:
            print("Datos de articulo invalidos")
            return jsonify({'error': 'Datos de articulo invalidos. Debe contener producto_id y una cantidad'}), 422
        
        if item['cantidad'] <= 0:
            print("La cantidad debe ser mayor a 0")
            return jsonify({'error': 'La cantidad debe ser mayor a cero'}), 422

        producto = Producto.query.get(item['producto_id'])
        
        if producto:
            items.append({
                'price': producto.precio_stripe_id,
                'quantity': item['cantidad'],
            }) 

            subtotal = producto.precio * item['cantidad']
            total_facturacion += subtotal     
            print(f"{producto.nombre} agregado al checkout con {item['cantidad']} y precio de {producto.precio} (Subtotal: {subtotal})")     
        else:
            print(f"El producto con id {item['producto_id']} no existe.")
            return jsonify({'error': f'El producto con id {item["producto_id"]} no existe.'}), 422
    
    print(f"Precio total del checkout: {total_facturacion}")
    
    try:
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card', 'sepa_debit'],
            line_items=items,
            mode='payment',
            success_url=os.getenv("FRONTEND_URL") + '?success=true',
            cancel_url=os.getenv("FRONTEND_URL") + '?canceled=true',
        )
        print(checkout_session, items)
# Crear un nuevo Pedido en la base de datos
        nuevo_pedido = Pedido(
            carrito_id=carrito.carrito_id,  
            usuario_id=current_user_id,
            total_facturacion=total_facturacion,
            stripe_session_id=checkout_session.id,
            fecha_pedido=datetime.datetime.fromtimestamp(checkout_session.created / 1e3) 
        )
        db.session.add(nuevo_pedido)
        db.session.commit()

        print(f"Sesion de checkout creada con exito, id: {checkout_session.id} con un total de facturacion de: {total_facturacion}")
        return jsonify({'id': checkout_session.id}), 200

    except Exception as e:
        print(f"Un error a ocurrido en el chackout: {str(e)}")
        return jsonify({'error': str(e)}), 500

# producto por peso
@api.route("/productoPorPeso/<int:peso>", methods=["GET"])
def obtenerProductoPorPeso(peso):
    productos = Producto.query.filter_by(peso=peso).all()
    productos_serializados = [producto.serialize() for producto in productos]
    return jsonify(productos_serializados)