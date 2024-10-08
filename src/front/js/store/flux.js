const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			carrito: [],
		},
		actions: {
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
   };
};
export default getState;
