import React from 'react';
import Nav from './Nav';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from '../Admin/Admin.jsx';
import Product from '../Components/Product.jsx';
import Login from '../Register/Login.jsx';
import Womens from './Womens.jsx';
import Kids from './Kids.jsx';
import Mens from './Mens.jsx';
import Bag from './Bag.jsx';
import ProductDetails from './ProductDetails.jsx';
import Purchase from './Purchase.jsx';
import Success from './Success.jsx';
import Sidebar from './Sidebar.jsx';
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
          <Route path="/login" element={<Login/>} />
          <Route path="/bag" element={<Bag/>}/>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<div>Payment Canceled...Retry!!!</div>} />
          <Route path='/sidebar' element={<Sidebar/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default Hero;
