import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Bag.css'; // Import a separate CSS file for styles

const Bag = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from the backend
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cart');
        setCartItems(response.data);
      } catch (err) {
        console.error('Error fetching cart items:', err);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (productName) => {
    try {
      await axios.delete(`http://localhost:8000/cart/${productName}`);
      setCartItems(cartItems.filter(item => item.name !== productName));
    } catch (err) {
      console.error('Error removing item from cart:', err);
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete('http://localhost:8000/cart');
      setCartItems([]);
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const handleQuantityChange = async (item, action) => {
    const updatedItem = {
      ...item,
      quantity: action === 'increase' ? item.quantity + 1 : item.quantity - 1
    };
    try {
      await axios.put(`http://localhost:8000/cart/${item.name}`, updatedItem);
      setCartItems(cartItems.map(i => i.name === item.name ? updatedItem : i));
    } catch (err) {
      console.error('Error updating item quantity:', err);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.price ?? 0; // Use nullish coalescing to default to 0
      const quantity = item.quantity ?? 0; // Use nullish coalescing to default to 0
      return total + price * quantity;
    }, 0);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length > 0 ? (
        <div className="cart-content">
          <ul className="cart-items">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="cart-item-details">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">${(item.price ?? 0).toFixed(2)}</span>
                    <div className="cart-item-quantity">
                      <button 
                        onClick={() => handleQuantityChange(item, 'decrease')} 
                        disabled={(item.quantity ?? 0) <= 1} 
                        className="btn-quantity"
                      >-</button>
                      <span>{item.quantity ?? 0}</span>
                      <button 
                        onClick={() => handleQuantityChange(item, 'increase')} 
                        className="btn-quantity"
                      >+</button>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(item.name)} 
                      className="btn-remove"
                    >Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <h2>Subtotal: ${(calculateTotal()).toFixed(2)}</h2>
            <p>Shipping and taxes calculated at checkout.</p>
            <div className="cart-actions">
              <button onClick={handleClearCart} className="btn-clear">Clear Cart</button>
              <button className="btn-checkout">Proceed to Checkout</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <p>Your cart is empty.</p>
          <p>Continue Shopping</p>
        </>
      )}
    </div>
  );
};

export default Bag;
