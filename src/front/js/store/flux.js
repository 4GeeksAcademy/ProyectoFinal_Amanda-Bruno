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
                        console.log(data)
                        sessionStorage.setItem('token', data.token);
                        sessionStorage.setItem('user', JSON.stringify(data.user));
                        console.log("Inicio de sesión exitoso"); 

                        const store = getStore();

						setStore({...store, usuario: data.user})
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
                const token = sessionStorage.getItem('token');
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
                    const store = getStore();
                    setStore({ ...store, usuario: data });
                    return data;
                } catch (error) {
                    console.error("Error al obtener los datos del usuario:", error);
                }
            },                  
         
            submitUsuario: async (form) => {
                const { usuario } = getStore();
                const error = getActions().validarPassword(form.newPassword, form.confirmNewPassword);

                if (error) {
                    alert(error);
                    return;
                }
                const updatedUserData = {
                    ...form
                };
                if(form.newPassword) {
                    updatedUserData.password = form.newPassword;
                } else {
                    delete updatedUserData.password;
                }
                console.log("Informacion del usuario actualizada", updatedUserData)

                const token = sessionStorage.getItem('token');
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
                    const store = getStore();
                    console.log(updatedUserData)
                    setStore({ ...store, usuario: updatedUserData });
                    sessionStorage.setItem('user', JSON.stringify(updatedUserData))
                    return data;

                } catch (error) {
                    console.error('Error en la solicitud:', error);
                    alert('Error al actualizar los datos: ' + error.message);
                }
            },
            get_productos: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/productos`);
                    console.log(response);
                    if (response.ok) {
                        const data = await response.json();
                        const store = getStore();
                        setStore({ ...store, productos: data.productos });
                    } else {
                        console.error("Error al obtener los productos:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error en get_productos:", error);
                }
            },
            get_producto_by_id: async (producto_id) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/productos/${producto_id}`);
                    if (response.ok) {
                        const data = await response.json();
                        const store = getStore();
                        setStore({ ...store, producto: data.producto });
                    } else {
                        console.error("Error al obtener el producto:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error en get_producto_by_id:", error);
                }
            },
            getUsuario: async () => {
                const token = sessionStorage.getItem('token');
                try {
                    const response = await fetch (`${process.env.BACKEND_URL}/api/usuario`, {
                        headers: {
                            'Content-type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }})
                    if (!response.ok){
                        return (
                            {"error": "Usuario no autenticado"}
                        )}
                    else {
                       const data = await response.json()
                       return(data)
                    }
                } catch(error) {
                    console.log(error)
                }
            },
            
            getProductosPorPais: async (country) => {
                try {
                    const response = await fetch(`/api/productoPorPais/${country}`);
                    const data = await response.json();

                    if (response.ok) {
                        setStore({ productos: data });
                    } else {
                        console.error("Error al obtener productos:", data.error);
                    }
                } catch (error) {
                    console.error("Error al conectar con la API:", error);
                }
            }
        }
    };
};

export default getState;