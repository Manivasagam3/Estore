import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/product.css";
import Email from "./Email";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

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

  const handleBuyNow = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const handleImageClick = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <>
      <h1 className="product">New Collections</h1>
      <div className="product-items">
        {products.map((product, index) => (
          <div key={index}>
            <ul className="items">
              <div className="content">
                <li>
                  {/* Clickable image */}
                  <img
                    src={`data:image/png;base64,${product.image}`}
                    alt={product.name}
                    width="90%"
                    onClick={() => handleImageClick(product)} // Navigate to product page
                    style={{ cursor: "pointer" }} // Indicate clickability
                  />
                </li>
                <div className="product-info">
                  <li>Product: {product.name}</li>
                  <li>Category: {product.category}</li>
                  <li>Price: ${product.price}</li>
                </div>
              </div>
              <div className="button">
                <button
                  className="btn btn-success"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-info"
                  onClick={() => handleBuyNow(product)}
                >
                  Shop Now
                </button>
              </div>
            </ul>
          </div>
        ))}
      </div>
      <Email />
    </>
  );
};

export default Product;
