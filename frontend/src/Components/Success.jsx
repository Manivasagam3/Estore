import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const status = queryParams.get("status");

  useEffect(() => {
    if (status === "success") {
      alert("Payment successful! Thank you for your purchase.");
    }
  }, [status]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Payment Successful</h1>
      <p>Thank you for your purchase. Your order is being processed.</p>
  
    </div>
  );
};

export default Success;
