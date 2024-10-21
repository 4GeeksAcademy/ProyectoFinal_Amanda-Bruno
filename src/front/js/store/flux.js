const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			usuario: [

			],
			productos: [
				
			  ]
		},
		actions: {
			registrar: (form, navigate) => { 
				fetch(`${process.env.BACKEND_URL}/api/registro`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(form)
				})
				.then(response => {
					if (!response.ok) {
						return response.json().then(err => { throw new Error(err.error); });
					}
					return response.json();
				})
				.then(data => {
					console.log("Registro exitoso:", data);
					navigate('/loginView'); 
				})
				.catch(error => {
					console.error('Error en la solicitud:', error);
					alert('Error al registrar: ' + error.message); 
				});
			},

			loginUsuario: (email, password, onSuccess, onError) => {
                fetch(`${process.env.BACKEND_URL}/api/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                        console.log("Inicio de sesión exitoso"); 
						setStore({usuario: data.user})
                        if (onSuccess) onSuccess();
                    } else {
                        const errorMessage = data.error || "Error desconocido al iniciar sesión.";
                        if (onError) onError(errorMessage);
                    }
                })
                .catch(error => {
                    if (onError) onError('Error de conexión. Inténtalo de nuevo.');
                });
            },

            update_usuario: async () => {
                const token = localStorage.getItem('token');
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/usuario/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        throw new Error("No se pudieron obtener los datos del usuario");
                    }

                    const data = await response.json();
                    setStore({ usuario: data });
                    return data;
                } catch (error) {
                    console.error("Error al obtener los datos del usuario:", error);
                }
            },
      
            validarPassword: (newPassword, confirmNewPassword) => {
				if (newPassword || confirmNewPassword) {
					if (newPassword.length < 6) {
						return "La contraseña debe tener al menos 6 caracteres.";
					}
					if (newPassword !== confirmNewPassword) {
						return "Las contraseñas no coinciden.";
					}
				}
				return null; 
			},			
         
            submitUsuario: async (form) => {
                const { usuario } = getStore();
                const error = getActions().validarPassword(form.newPassword, form.confirmNewPassword);

                if (error) {
                    alert(error);
                    return;
                }

                const updatedUserData = {
                    ...usuario,
                    ...form,
                };

                if(form.newPassword) {
                    updatedUserData.password = form.newPassword;
                } else {
                    delete updatedUserData.password;
                }

                console.log("Informacion del usuario actualizada", updatedUserData)

                const token = localStorage.getItem('token');
                if(!token) {
                    alert("No hay un token de autenticación");
                    return;
                }
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/usuario/update`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify(updatedUserData)
                    });

                    if (!response.ok) {
                        throw new Error(errorMessage, "Error al actualizar los datos");
                    }

                    const data = await response.json();
                    setStore({ usuario: data.usuario });
                    return data;

                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    alert('Error al actualizar los datos: ' + error.message);
                }
            },
            
            getProductos: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/productos`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ productos: data.productos });
                    } else {
                        console.error("Error al obtener los productos:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error en getProductos:", error);
                }
            },
            getProductoById: async (producto_id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/productos/${producto_id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ producto: data.producto });
                    } else {
                        console.error("Error al obtener el producto:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error en getProductoById:", error);
                }
            },
            fetchCartItems: async () => {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.BACKEND_URL}/api/cart`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setStore({ cartItems: data, loading: false });
            },
            updateItemQuantity: async (id, newQuantity) => {
                const response = await fetch(`${process.env.BACKEND_URL}/api/carrito/agregar`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ producto_id: id, cantidad: newQuantity })
                });
            
                if (response.ok) {
                    actions.fetchCartItems();  
                }
            },
            handleCheckout: (cartItems) => {
                const token = localStorage.getItem('token');
                
                fetch(`${process.env.BACKEND_URL}/api/checkout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ items: cartItems })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.id) {
                        window.location.href = `https://checkout.stripe.com/pay/${data.id}`;
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                });
            }
        }
    };
};

export default getState;