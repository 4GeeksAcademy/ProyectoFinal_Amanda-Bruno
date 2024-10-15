const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			usuario: {
                name: "",
                email: "",
                direccion: "",
				codigoPostal: "",
                ciudad: "",
            },
			cafe: [
				
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
					console.log(data)
                        navigate('/login'); 
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
						sessionStorage.setItem('token', data.token);
						console.log("Inicio de sesión exitoso");
						if (onSuccess) onSuccess(); 
					} else {
						const errorMessage = data.error === "Usuario no encontrado"
							? "El usuario no existe. Por favor, regístrate."
							: data.error === "Email o contraseña incorrectos"
							? "El email o la contraseña son incorrectos."
							: data.error || "Error desconocido al iniciar sesión.";
			
						console.error('Error al iniciar sesión:', errorMessage);
						if (onError) onError(errorMessage);
					}
				})
				.catch(error => {
					console.error('Error en la solicitud:', error);
					if (onError) onError('Error de conexión. Inténtalo de nuevo.');
				});
			},			

            actualizarUsuario: (nuevoUsuario) => {
                setStore({ usuario: nuevoUsuario });
            },

            validarSenhas: (newPassword, confirmNewPassword) => {
                if (newPassword && newPassword !== confirmNewPassword) {
                    return "Las contraseñas no coinciden.";
                }
                return null;
            },

            submitUsuario: (form) => {
                const { usuario } = getStore();
                const { validarSenhas, actualizarUsuario } = getActions();
                const error = validarSenhas(form.newPassword, form.confirmNewPassword);

                if (error) {
                    alert(error);
                    return;
                }

                const updatedUserData = {
                    ...form,
                    password: form.newPassword ? form.newPassword : usuario.password,
                };

                fetch(`${process.env.BACKEND_URL}/api/update_user`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    },
                    body: JSON.stringify(updatedUserData)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        actualizarUsuario(updatedUserData);
                        alert("Los datos han sido actualizados.");
                    } else {
                        alert("Error al actualizar los datos.");
                    }
                })
                .catch(error => {
                    console.error('Error en la solicitud:', error);
                    alert('Error al actualizar los datos.');
                });
            }
        }
    };
};

export default getState;