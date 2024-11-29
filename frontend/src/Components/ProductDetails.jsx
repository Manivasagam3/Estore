import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../CSS/ProductDetails.css";

const ProductDetails = () => {
  const { state: { product } } = useLocation(); // Access product data
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/purchase", { state: { product } });
  };

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Left Column: Product Image */}
        <div className="product-image-section">
          <img
            src={`data:image/png;base64,${product.image}`}
            alt={product.name}
            className="product-main-image"
          />
        </div>

        {/* Right Column: Product Details */}
        <div className="product-details-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-category"><strong>Category:</strong> {product.category}</p>
          <p className="product-price">Price: <span>${product.price}</span></p>

          <div className="cta-buttons">
            <button className="add-to-cart">Add to Cart</button>
            <button className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>

          <div className="product-description">
            <h3>Product Description</h3>
            <p>{product.description || "No description available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
