import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const endPoint = 'http://127.0.0.1:8000/api';

const CreateProduct = () => {

	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);

	const navigate = useNavigate();

	const store = async (e) => {
		e.preventDefault();
		const params = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8'	},
			body: JSON.stringify({
				description: description,
				price: price,
				stock: stock
			})
		}
		try {			
			await fetch(endPoint + '/product', params);	
			navigate('/');
		} catch(e) {
			console.log(e);
		}		
	}

	return (
		<div>
			<h3>Create product</h3>
			<form onSubmit={ store }>
				<label htmlFor="description">Description</label>
				<input
					type='text'
					id='description'
					onChange={ (e) => setDescription(e.target.value) }
					className='form-control'
					autoFocus
				/>
				<label htmlFor="price">Price</label>
				<input
					type='number'
					id='price'
					onChange={ (e) => setPrice(e.target.value) }
					className='form-control'
					min={ 1 }
				/>	
				<label htmlFor="stock">Stock</label>
				<input
					type='number'
					id='stock'
					onChange={ (e) => setStock(e.target.value) }
					className='form-control'
					min={ 0 }
				/>
				<button type='submit' className='btn btn-primary'>Save</button>		
			</form>		
		</div>
	)
}

export default CreateProduct;