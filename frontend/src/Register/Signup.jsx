import React, { useState } from 'react';
import '../CSS/Signup.css';
import { IoArrowBackCircle } from "react-icons/io5";
import Login from './Login';

const handleSignup = (username, password, email) => {
  if (username.trim() !== '' && password.trim() !== '' && email.trim() !== '') {
    fetch("http://localhost:8000/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, email })
    }).then((res) => {
      console.log(res);
    }).catch(() => {
      console.log("Unable to create add");
    });
  }
};

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [log, setLog] = useState(false);

  const openlog = () => {
    setLog(true); // Assuming you want to set log to true when clicking the back arrow
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    handleSignup(username, password, email);
    setUsername("");
    setEmail("");
    setPassword("");
    window.alert("Signed in successfully");
  };

  return (
    <>
      {!log && (
        <div>
          <IoArrowBackCircle className='arrow' onClick={openlog} />
          <div className='sign'>
            <h1 style={{color:'blue'}}>Signup</h1>
            <form className='form' onSubmit={handleSubmit}>
              <label className='form-label'>Username:</label>
              <input className='form-control' type='text' value={username} onChange={(e) => setUsername(e.target.value)} required/>
              <label className='form-label'>Email:</label>
              <input className='form-control' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
              <label className='form-label'>Password:</label>
              <input className='form-control' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button className='btn btn-primary sign1' type='submit'>Signup</button>
            </form>
          </div>
        </div>
      )}
      {
        log && (
          <Login/>
        )
      }
    </>
  );
};

export default Signup;
