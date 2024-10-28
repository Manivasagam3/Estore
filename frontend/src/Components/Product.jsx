// src/Components/Product.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/product.css';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/products") // Adjust as needed
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await axios.post('http://localhost:8000/cart', {
        name: product.name,
        price: product.price,
        quantity: 1,
      });
      console.log('Item added to cart');
    } catch (err) {
      console.error('Error adding item to cart:', err);
    }
  };

  return (
    <>
      <h1 className='product'>New Collections</h1>
      <div className='product-items'>
        {products.map((product, index) => (
          <div key={index}>
            <ul className='items'>
              <div className='content'>
                <li><img src={`data:image/png;base64,${product.image}`} alt={product.name} width="90%" /></li>
                <div className='product-info'>
                  <li>Product: {product.name}</li>
                  <li>Category: {product.category}</li>
                  <li>Price: ${product.price}</li>
                </div>
              </div>
              <div className='button'>
                <button className='btn btn-success' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <button className='btn btn-info' onClick={() => handleAddToCart(product)}>Buy now</button>
              </div>
            </ul>
          </div>
        ))}
      </div>

      <Link to="/cart">
        <button className='btn btn-primary'>Go to Cart</button>
      </Link>
    </>
  );
};

export default Product;
