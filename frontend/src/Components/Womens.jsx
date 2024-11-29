import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // To navigate to a product detail page
import axios from 'axios'; // To make API requests for adding to the cart
import '../CSS/Mens.css';

const Womens = () => {
  const [women, setWomen] = useState([]);
  const navigate = useNavigate();

  // Fetching women's products
  useEffect(() => {
    fetch("http://localhost:8000/women") // Ensure the correct endpoint is used
      .then((res) => res.json())
      .then((data) => setWomen(data))
      .catch((err) => console.log(err));
  }, []);

  // Function to handle image click and navigate to product detail page
  const handleImageClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Function to add product to the cart
  const handleAddToCart = async (product) => {
    try {
      await axios.post("http://localhost:8000/cart", {
        name: product.name,
        price: product.price,
        quantity: 1,
      });
      console.log("Item added to cart");
    } catch (err) {
      console.error("Error adding item to cart:", err);
    }
  };

  // Function to handle the "Buy Now" button click
  const handleBuyNow = (product) => {
    navigate(`/checkout`, { state: { product } }); // Navigate to checkout page
  };

  return (
    <>
      <h1>Womens</h1>
      <div className='product-items'>
        {women.map((data, index) => (
          <div key={index}>
            <ul className='items'>
              <div className='content'>
                <li>
                  {/* Clickable image */}
                  <img
                    src={`data:image/png;base64,${data.image}`}
                    alt={data.name}
                    width="90%"
                    onClick={() => handleImageClick(data)} // Navigate to product details
                    style={{ cursor: "pointer" }} // Indicate clickability
                  />
                </li>
                <div className='product-info'>
                  <li>Product: {data.name}</li>
                  <li>Category: {data.category}</li>
                  <li>Price: ${data.price}</li>
                </div>
              </div>
              <div className='button'>
                {/* Add to Cart Button */}
                <button
                  className='btn btn-success'
                  onClick={() => handleAddToCart(data)}
                >
                  Add to Cart
                </button>
                {/* Buy Now Button */}
                <button
                  className='btn btn-info'
                  onClick={() => handleBuyNow(data)}
                >
                  Buy Now
                </button>
              </div>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Womens;
