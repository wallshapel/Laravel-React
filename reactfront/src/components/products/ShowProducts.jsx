import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShowProducts = () => {

	const [products, setProducts] = useState([]);

	useEffect(() => {
		getAllProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps 
	}, [])

	const endPoint = 'http://127.0.0.1:8000/api';

	const getAllProducts = async () => {	
		try {
			const res = await fetch(endPoint + '/products'); // fetch usar por default el método GET, de modo que no hace falta especificarlo.
			const data = await res.json();
			let products = [];
			data.forEach((obj) => {
				products.push({
					id: 			obj.id,
					description: 	obj.description,	
					price: 			obj.price,	
					stock: 			obj.stock,	
					created_at: 	obj.created_at,	
					updated_at: 	obj.updated_at	
				})	
			})
			setProducts(products);
		} catch(e) {
			console.log(e);
		}		
	}

	const deleteProduct = async (id) => {
		try {			
			await fetch(endPoint + '/product/' + id, { method: 'DELETE' });	
		} catch(e) {
			console.log(e);
		}		
	}

	return (
		<>
			<div>
				<Link to="/create" className="btn btn-success btn-lg mt-2 text-white">Create</Link>
			</div>
			<table className="table table-striped">
				<thead className="bg-primary text-white">
					<tr>
						<th>Id</th>
						<th>Description</th>
						<th>Price</th>
						<th>Stock</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{
						products.map((product, i) => (
							<tr key={ i }> 
								<td>{ product.id }</td>	 
								<td>{ product.description }</td>	 
								<td>{ product.price }</td>	 
								<td>{ product.stock }</td>	
								<td>
									<Link to={ '/edit/' + product.id } className="btn btn-warning">Edit</Link>
									<button onClick={ () => deleteProduct(product.id) } className="btn btn-danger">Delete</button>
								</td>						
							</tr>
						))	
					}			
				</tbody>
			</table>
		</>
	)

}

export default ShowProducts;