import React from 'react';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from '../Admin/Admin.jsx';
import Product from '../Components/Product.jsx';
import Login from '../Register/Login.jsx';
import Womens from './Womens.jsx';
import Kids from './Kids.jsx';
import Mens from './Mens.jsx';
import Cart from '../Components/Cart.jsx';

// Add a Home component (or whatever you want to show on the root path)
const Home = () => {
  return <h1>Welcome to FashionMart</h1>;
}

const Hero = () => {
  return (
    <div>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} /> {/* Add Home component */}
          <Route path="/men" element={<Mens />} />
          <Route path="/women" element={<Womens />} />
          <Route path="/kid" element={<Kids />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} /> {/* Cart route */}
        </Routes>
      </Router>
    </div>
  );
}

export default Hero;
