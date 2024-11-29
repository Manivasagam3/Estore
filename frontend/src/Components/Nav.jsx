import React, { useState } from 'react';
import { TbShoppingBagHeart } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "../CSS/Nav.css";
import Bag from './Bag';
import Sidebar from './Sidebar';  // Import the Sidebar component

const Nav = () => {
  const [cartVisible, setCartVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);  // State for sidebar visibility

  // Toggle cart visibility
  const toggleCart = () => {
    setCartVisible(prevVisible => !prevVisible);
  };

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(prevVisible => !prevVisible);
  };

  // Close the cart when any other nav item is clicked
  const closeCart = () => {
    setCartVisible(false);
  };

  return (
    <nav className='navbar1 navbar-dark bg-light'>
      <div className='container-fluid d-flex justify-content-between align-items-center'>
        <Link to='/' className='navbar-brand text-dark' onClick={closeCart}>
          <TbShoppingBagHeart className='mb-1 pe-1' />fashionmart
        </Link>
        <ul className='nav navbar-nav d-flex flex-row gap-5'>
          <li className='nav-item'>
            <Link to="/" className="nav-link text-dark" onClick={closeCart}>Home</Link>
          </li>
          <li className='nav-item'>
            <Link to="/men" className="nav-link text-dark" onClick={closeCart}>Mens</Link>
          </li>
          <li className='nav-item'>
            <Link to="/women" className="nav-link text-dark" onClick={closeCart}>Womens</Link>
          </li>
          <li className='nav-item'>
            <Link to="/kid" className="nav-link text-dark" onClick={closeCart}>Kids</Link>
          </li>
          <li className='nav-item log1'>
            <Link to="/login" className="nav-link text-dark" onClick={closeCart}>Login</Link>
          </li> 
          <li className='nav-item'>
            <Link to="/bag" className="nav-link text-dark" onClick={toggleCart}>Cart</Link>
          </li>
          <li className='nav-item'>
            {/* On clicking the FaUser icon, toggle the sidebar visibility */}
            <FaUser className="Users" style={{cursor:"pointer"}} width="50px" onClick={toggleSidebar} />
          </li>
        </ul>
      </div>
      {/* Conditionally render the Cart component */}
      {cartVisible && <Bag />}
      
      {/* Render the sidebar based on the sidebarVisible state */}
      {sidebarVisible && <Sidebar username="John Doe" />}
    </nav>
  );
}

export default Nav;
