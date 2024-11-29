import React, { useState } from "react";
import "../CSS/Email.css";

const Email = () => {
  const [email, setEmail] = useState("");

  const handleSubscription = (e) => {
    e.preventDefault();
    alert("Subscribed Successfully!");
    setEmail(""); // Clear the email input field
  };

  return (
    <div className="emailborder">
      <h1 id="text">Let's Stay Connected.</h1>
      <h4 style={{ textAlign: "center" }}>
        Sign up to receive our newsletter and offers.
      </h4>
      <form className="form-group" onSubmit={handleSubscription}>
        <input
          type="email"
          className="form-control"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn btn-danger">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Email;
