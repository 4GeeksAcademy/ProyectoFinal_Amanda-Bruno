from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.dialects.postgresql import JSON

db = SQLAlchemy()

carrito_producto = db.Table('carrito_producto',
    db.Column('carrito_id', db.Integer, db.ForeignKey('carritos.carrito_id'), primary_key=True),
    db.Column('producto_id', db.Integer, db.ForeignKey('productos.producto_id'), primary_key=True),
    db.Column('cantidad', db.Integer, nullable=False, default=1)
)

class Usuario(db.Model):
    __tablename__ = 'usuarios'

    usuario_id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    es_admin = db.Column(db.Boolean(), unique=False, nullable=False)

    nombre_completo = db.Column(db.String(120), unique=False, nullable=True)
    direccion = db.Column(db.String(120), unique=False, nullable=True)
    codigo_postal = db.Column(db.String(120), unique=False, nullable=True)
    ciudad = db.Column(db.String(120), unique=False, nullable=True)
    telefono = db.Column(db.String(120), unique=False, nullable=True)
    avatar = db.Column(db.String(120), unique=False, nullable=True)

    def __repr__(self):
        return f'<Usuario {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Producto(db.Model):
    __tablename__ = 'productos'

    producto_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.String(255), nullable=False)
    precio = db.Column(db.Float, nullable=False)
    region = db.Column(db.String(50), nullable=False)
    peso = db.Column(db.Integer, nullable=False)
    nivel_tostado = db.Column(db.Integer, nullable=False)
    perfil_sabor = db.Column(db.JSON, nullable=False)  # Array o JSON
    opcion_molido = db.Column(db.JSON, nullable=False)    # Array o JSON
    imagen_url = db.Column(db.String(255), nullable=False)

    carrito_de_compra = db.relationship('CarritoDeCompra', secondary=carrito_producto, lazy='subquery',
        backref=db.backref('Producto', lazy=True))

    def __repr__(self):
        return f'<Producto {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "descripcion": self.descripcion,
            "precio": self.precio,
            "region": self.region,
            "peso": self.peso,
            "nivel_tostado": self.nivel_tostado,
            "perfil_sabor": self.perfil_sabor,
            "opcion_molido": self.opcion_molido,
            "imagen_url": self.imagen_url           
        }

class CarritoDeCompra(db.Model):
    __tablename__ = 'carritos'
    
    carrito_id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)
    producto_id = db.Column(db.Integer, db.ForeignKey('productos.producto_id'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)

    productos = db.relationship('Producto', secondary=carrito_producto, backref=db.backref('carritos', lazy=True))
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.usuario_id'), nullable=False)

    def __repr__(self):
        return f'<CarritoDeCompra {self.id}>'
    

class Pedido(db.Model):
    __tablename__ = 'pedidos'

    pedido_id = db.Column(db.Integer, primary_key=True)
    carrito_id = db.Column(db.Integer, db.ForeignKey('carritos.carrito_id'), nullable=False)

    fecha_pedido = db.Column(db.DateTime, nullable=False)
    total_facturacion = db.Column(db.Float, nullable=False)
  #  modo_de_pago = db.Column(db.String(50), nullable=False)

    carrito = db.relationship('CarritoDeCompra', backref=db.backref('pedidos', lazy=True))

    def __repr__(self):
        return f'<Pedido {self.id}>'



    


