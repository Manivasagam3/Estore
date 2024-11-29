import React, { useState } from 'react';
import '../CSS/Login.css';
import Signup from '../Register/Signup.jsx';
import Product from '../Components/Product.jsx';
import Sidebar from '../Components/Sidebar.jsx'; // Import Sidebar component

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedin, setLoggedin] = useState(false);
  const [opensign, setOpensign] = useState(false);

  const opensignup = () => {
    setOpensign(true);
  };

  const handleclick = (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data === "success") {
        window.alert("Login successful");
        setLoggedin(true);
        setUsername(username); // Set the username to the logged-in username
      } else {
        window.alert(data);
      }
    })
    .catch((err) => {
      console.log(err);
    });

    setUsername(""); // Clear username after login attempt
    setPassword(""); // Clear password after login attempt
  };

  return (
    <>
      {/* Display Login form if not logged in */}
      {!opensign && !loggedin && (
        <div className='log'>
          <h1>Login</h1>
          <form className='form mb-2 loginform'>
            <label>Username:</label>
            <input
              className="form-control"
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /><br/>
            <label>Password:</label>
            <input
              className='form-control'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className='btn btn-primary form-control px-1 login1'
              onClick={handleclick}
            >
              Login
            </button>
            <h6>Not a user? <button type="button" className="btn btn-link" onClick={opensignup}>Signup</button></h6>
          </form>
        </div>
      )}

      {/* Show sidebar and product if logged in */}
      {loggedin && (
        <div className="dashboard">
          <Sidebar username={username} /> {/* Pass username to Sidebar */}
          <Product />
        </div>
      )}

      {/* Open Signup form */}
      {opensign && (
        <Signup />
      )}
    </>
  );
};

export default Login;
