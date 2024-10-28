import React from 'react';
import { BiLogInCircle } from "react-icons/bi";
import { TbShoppingBagHeart } from "react-icons/tb";
import { Link } from "react-router-dom";
import "../CSS/Nav.css";
import cart_icon from "../Assets/cart_icon.png";
import { FaUser } from "react-icons/fa";


const Nav = () => {
  return (
    <nav className='navbar navbar-dark bg-light'>
      <div className='container-fluid d-flex justify-content-between align-items-center'>
        <Link to='/' className='navbar-brand text-dark'>
          <TbShoppingBagHeart className='mb-1 pe-1' />fashionmart
        </Link>
        <ul className='nav navbar-nav d-flex flex-row gap-5'>
          <li className='nav-item'>
            <Link to="/" className="nav-link text-dark">Home</Link>
          </li>
          <li className='nav-item'>
            <Link to="/men" className="nav-link text-dark">Mens</Link>
          </li>
          <li className='nav-item'>
            <Link to="/women" className="nav-link text-dark">Womens</Link>
          </li>
          <li className='nav-item'>
            
            <Link to="/kid" className="nav-link text-dark">Kids</Link>
          </li>
          <li className='nav-item log1'>
            <Link to="/login" className="nav-link text-dark">Login</Link>
          </li> 
          <li className='nav-item'>
            <Link to="/cart" className='nav-link text-dark'>
             cart
            </Link>
          </li>
          <li className='nav-item'>
            <FaUser className="cart1" width="50px"/>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
