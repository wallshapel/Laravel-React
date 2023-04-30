import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // useParams servirá para obtener el id de la URL

const endPoint = 'http://127.0.0.1:8000/api';

const EditProduct = () => {

	const { id } = useParams();  // Obtenemos el id del producto a editar desde la URL
	
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);

	const navigate = useNavigate();	

	useEffect(() => {
		const getProductById = async () => {
			try {
				const res = await fetch(endPoint + '/product/' + id);	
				const data = await res.json();
				setDescription(data.description);
				setPrice(data.price);
				setStock(data.stock);
			} catch(e) {
				console.log(e);
			}
		}
		getProductById();
		// eslint-disable-next-line react-hooks/exhaustive-deps 
	}, [])	

	const update = async (e) => {
		e.preventDefault();
		const params = {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8'	},
			body: JSON.stringify({
				description: description,
				price: price,
				stock: stock
			})
		}
		try {			
			await fetch(endPoint + '/product/' + id, params);	
			navigate('/');
		} catch(e) {
			console.log(e);
		}		
	}

	return (
		<div>
			<h3>Edit product</h3>
			<form onSubmit={ update }>
				<label htmlFor="description">Description</label>
				<input
					type='text'
					id='description'
					value={ description }
					onChange={ (e) => setDescription(e.target.value) }
					className='form-control'
					autoFocus
				/>
				<label htmlFor="price">Price</label>
				<input
					type='number'
					id='price'
					value={ price }
					onChange={ (e) => setPrice(e.target.value) }
					className='form-control'
					min={ 1 }
				/>	
				<label htmlFor="stock">Stock</label>
				<input
					type='number'
					id='stock'
					value={ stock }
					onChange={ (e) => setStock(e.target.value) }
					className='form-control'
					min={ 0 }
				/>
				<button type='submit' className='btn btn-primary'>Save</button>		
			</form>		
		</div>
	)

}

export default EditProduct;