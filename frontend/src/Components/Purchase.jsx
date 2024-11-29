import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "../CSS/Purchase.css";

const stripePromise = loadStripe("pk_test_51PjLwDKuZlTI761yayQiacb7OslBlFWtjZ7SRakTESzbekyEkHEIinasqFN0Lupl2q1tWlDgLncbsVsgXJFpvlSv00F28GZsIq");

const Purchase = () => {
  const { state: { product } } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    size: "", // Add size to the form data
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    const stripe = await stripePromise;

    try {
      const response = await fetch("http://localhost:8000/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: product.name,
          productPrice: product.price,
          productSize: formData.size, // Send selected size
        }),
      });

      const { id } = await response.json();
      const result = await stripe.redirectToCheckout({ sessionId: id });

      if (result.error) {
        console.error("Error redirecting to Stripe Checkout:", result.error.message);
        setError("Payment failed. Please try again.");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error during payment:", error);
      setError("An error occurred during the payment process.");
      return false;
    }
  };

  const savePurchaseData = async () => {
    try {
      const response = await fetch("http://localhost:8000/save-purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          productName: product.name,
          productPrice: product.price,
          status: "Paid",
        }),
      });

      if (response.ok) {
        console.log("Purchase data saved successfully.");
        navigate("/success");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Failed to save purchase data.");
      }
    } catch (error) {
      console.error("Error saving purchase data:", error);
      setError("An error occurred while saving purchase data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const paymentSuccess = await handlePayment();
    if (paymentSuccess) {
      await savePurchaseData();
    }

    setLoading(false);
  };

  return (
    <div className="purchase-page">
      <h1>Complete Your Purchase</h1>
      <div className="purchase-container">
        <div className="product-summary">
          <h2>Product Summary</h2>
          <p><strong>Product Name:</strong> {product.name}</p>
          <p><strong>Product Price:</strong> ${product.price}</p>
        </div>
        <form className="user-details-form" onSubmit={handleSubmit}>
          <h2>User Details</h2>
          {error && <p className="error-message">{error}</p>}
          <label>
            Full Name:
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </label>
          <label>
            Address:
            <textarea name="address" value={formData.address} onChange={handleInputChange} required></textarea>
          </label>
          <label>
            Select Size:
            <div className="size-options">
              <label>
                <input
                  type="radio"
                  name="size"
                  value="Small"
                  checked={formData.size === "Small"}
                  onChange={handleInputChange}
                  required
                /> Small
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="Medium"
                  checked={formData.size === "Medium"}
                  onChange={handleInputChange}
                /> Medium
              </label>
              <label>
                <input
                  type="radio"
                  name="size"
                  value="Large"
                  checked={formData.size === "Large"}
                  onChange={handleInputChange}
                /> Large
              </label>
            </div>
          </label>
          <button type="submit" className="payment-button" disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Purchase;
