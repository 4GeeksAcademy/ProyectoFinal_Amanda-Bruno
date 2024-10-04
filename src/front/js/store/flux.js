const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			cafe: [
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
				  imagen_url: "https://iili.io/H8Y7Opp.webp"
				},
				{
				  producto_id: 2,
				  nombre: "Café de Etiopía",
				  descripcion: "Café especial de Etiopía con notas cítricas y florales.",
				  precio: 18.50,
				  region: "Etiopía",
				  peso: 250,
				  nivel_tostado: 2,
				  perfil_sabor: { "notas": ["cítricos", "floral", "frutas tropicales"] },
				  opcion_molido: { "tipos": ["grano", "molido medio", "molido grueso"] },
				  imagen_url: "https://iili.io/H8Y7VCF.webp"
				},
				{
				  producto_id: 3,
				  nombre: "Café de Brasil",
				  descripcion: "Café brasileño con cuerpo robusto y notas a cacao.",
				  precio: 12.99,
				  region: "Brasil",
				  peso: 1000,
				  nivel_tostado: 4,
				  perfil_sabor: { "notas": ["cacao", "avellana", "especias"] },
				  opcion_molido: { "tipos": ["grano", "molido medio"] },
				  imagen_url: "https://iili.io/H8Y7EhP.webp"
				},
				{
				  producto_id: 4,
				  nombre: "Café de Kenia",
				  descripcion: "Café keniano de alta acidez con notas a frutas rojas.",
				  precio: 19.99,
				  region: "Kenia",
				  peso: 500,
				  nivel_tostado: 2,
				  perfil_sabor: { "notas": ["frutas rojas", "cítricos", "acidez viva"] },
				  opcion_molido: { "tipos": ["grano", "molido fino"] },
				  imagen_url: "https://iili.io/H8Y7vjI.webp"
				},
				{
				  producto_id: 5,
				  nombre: "Café de Costa Rica",
				  descripcion: "Café suave y balanceado de las tierras altas de Costa Rica.",
				  precio: 16.75,
				  region: "Costa Rica",
				  peso: 750,
				  nivel_tostado: 3,
				  perfil_sabor: { "notas": ["caramelo", "naranja", "vainilla"] },
				  opcion_molido: { "tipos": ["grano", "molido grueso"] },
				  imagen_url: "https://iili.io/H8Y7lpV.webp"
				},
				{
				  producto_id: 6,
				  nombre: "Café de Guatemala",
				  descripcion: "Café guatemalteco con cuerpo completo y sabores intensos.",
				  precio: 14.50,
				  region: "Guatemala",
				  peso: 500,
				  nivel_tostado: 3,
				  perfil_sabor: { "notas": ["chocolate oscuro", "frutas secas", "especiado"] },
				  opcion_molido: { "tipos": ["grano", "molido medio", "molido fino"] },
				  imagen_url: "https://iili.io/H8Y7kTN.webp"
				},
				{
				  producto_id: 7,
				  nombre: "Café de Perú Orgánico",
				  descripcion: "Café orgánico de los Andes peruanos con sabor limpio y dulce.",
				  precio: 17.99,
				  region: "Perú",
				  peso: 500,
				  nivel_tostado: 2,
				  perfil_sabor: { "notas": ["miel", "fruta madura", "cítricos"] },
				  opcion_molido: { "tipos": ["grano", "molido grueso"] },
				  imagen_url: "https://iili.io/H8Y5Sgj.webp"
				},
				{
				  producto_id: 8,
				  nombre: "Café de Jamaica Blue Mountain",
				  descripcion: "Exclusivo café de Jamaica con una suavidad excepcional.",
				  precio: 45.99,
				  region: "Jamaica",
				  peso: 250,
				  nivel_tostado: 1,
				  perfil_sabor: { "notas": ["dulce", "nuez", "chocolate"] },
				  opcion_molido: { "tipos": ["grano", "molido fino"] },
				  imagen_url: "https://iili.io/H8Y7WEg.webp"
				},
				{
				  producto_id: 9,
				  nombre: "Café de México",
				  descripcion: "Café mexicano con toques a canela y chocolate.",
				  precio: 13.99,
				  region: "México",
				  peso: 750,
				  nivel_tostado: 3,
				  perfil_sabor: { "notas": ["canela", "chocolate", "frutas secas"] },
				  opcion_molido: { "tipos": ["grano", "molido medio"] },
				  imagen_url: "https://iili.io/H8Y78Qt.webp"
				},
				{
				  producto_id: 10,
				  nombre: "Café de India",
				  descripcion: "Café exótico de la India con notas especiadas y terrosas.",
				  precio: 17.49,
				  region: "India",
				  peso: 500,
				  nivel_tostado: 4,
				  perfil_sabor: { "notas": ["especias", "tierra", "chocolate oscuro"] },
				  opcion_molido: { "tipos": ["grano", "molido grueso", "molido medio"] },
				  imagen_url: "https://iili.io/H8Y7wYv.webp"
				},
				{
				  producto_id: 11,
				  nombre: "Café de Honduras",
				  descripcion: "Café suave y afrutado de las tierras altas de Honduras.",
				  precio: 15.25,
				  region: "Honduras",
				  peso: 500,
				  nivel_tostado: 3,
				  perfil_sabor: { "notas": ["frutas", "chocolate", "vainilla"] },
				  opcion_molido: { "tipos": ["grano", "molido fino"] },
				  imagen_url: "https://iili.io/H8Y7lpV.webp"
				},
				{
				  producto_id: 12,
				  nombre: "Café de Nicaragua",
				  descripcion: "Café de cuerpo suave con notas cítricas y florales.",
				  precio: 13.50,
				  region: "Nicaragua",
				  peso: 750,
				  nivel_tostado: 2,
				  perfil_sabor: { "notas": ["floral", "cítricos", "miel"] },
				  opcion_molido: { "tipos": ["grano", "molido medio"] },
				  imagen_url: "https://iili.io/H8Y78Qt.webp"
				},
				{
				  producto_id: 13,
				  nombre: "Café de Panamá Geisha",
				  descripcion: "Café Geisha de Panamá, reconocido mundialmente por su calidad.",
				  precio: 50.00,
				  region: "Panamá",
				  peso: 250,
				  nivel_tostado: 1,
				  perfil_sabor: { "notas": ["jazmín", "frutas tropicales", "dulce"] },
				  opcion_molido: { "tipos": ["grano", "molido fino"] },
				  imagen_url: "https://iili.io/H8Y7kTN.webp"
				},
				{
				  producto_id: 14,
				  nombre: "Café de Vietnam",
				  descripcion: "Café vietnamita robusto y fuerte con sabor intenso.",
				  precio: 11.99,
				  region: "Vietnam",
				  peso: 1000,
				  nivel_tostado: 5,
				  perfil_sabor: { "notas": ["chocolate", "caramelo", "especias"] },
				  opcion_molido: { "tipos": ["grano", "molido grueso"] },
				  imagen_url: "https://iili.io/H8Y7wYv.webp"
				},
				{
				  producto_id: 15,
				  nombre: "Café de Sumatra",
				  descripcion: "Café de Sumatra con cuerpo denso y sabores terrosos.",
				  precio: 14.99,
				  region: "Indonesia",
				  peso: 500,
				  nivel_tostado: 4,
				  perfil_sabor: { "notas": ["terroso", "especias", "chocolate"] },
				  opcion_molido: { "tipos": ["grano", "molido medio"] },
				  imagen_url: "https://iili.io/H8Y7GQ1.webp"
				}
			  ]
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
		}
	}
	};
};

export default getState;
