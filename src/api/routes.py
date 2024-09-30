"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json, abort
import os
from api.models import db, Usuario, Producto
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# POST Usuario
@api.route('/usuario', methods=['POST'])
def create_usuario():
    data = request.get_json()

    # Campos requeridos
    if not data or not all(key in data for key in ("email", "password", "is_active", "es_admin")):
        return jsonify({"error": "Faltan completar campos obligatorios"}), 400
    
    # Verificar si el usuario ya existe
    if Usuario.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Ya existe un usuario con este email"}), 400

    # Ocultar la contraseña
    hashed_password = generate_password_hash(data['password'])

    # Crear nuevo usuario
    new_usuario = Usuario(
        email=data['email'],
        password=hashed_password,
        is_active=data['is_active'],
        es_admin=data['es_admin'],
        nombre_completo=data.get('nombre_completo'),
        direccion=data.get('direccion'),
        codigo_postal=data.get('codigo_postal'),
        ciudad=data.get('ciudad'),
        telefono=data.get('telefono'),
        avatar=data.get('avatar')
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



