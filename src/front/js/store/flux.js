const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			carrito: [],
		},
		actions: {
			registrar: (form) => {
			
			fetch('https://potential-winner-pj7vx5qp4wvrcx49-3001.app.github.dev/api/registro', {
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
				if (data.mensaje) {
					console.log('Usuario registrado con éxito:', data.mensaje);
					alert('Registro exitoso');
	
				}
			})
			.catch(error => {
				console.error('Error en la solicitud:', error);
				alert('Error al registrar: ' + error.message);
			});
		},

	checkout: async () => {
		const token = localStorage.getItem("token")
		try {
			const response = await fetch(`${process.env.BACKEND_URL}/api/checkout`, {
				method: 'POST',
				body: JSON.stringify(getStore().carrito),
				headers:{
					'Content-Type':'application/json',
					'Authorization': "Bearer " + token
				},
			});
			const data = await response.json()
				return data
		} catch (error) {
			return false; 
		}
	}


	},
	}
}

export default getState;
