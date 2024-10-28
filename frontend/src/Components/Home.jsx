import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Home.css';
import Product from './Product';
import Cart from './Cart';

const Home = () => {
  return (
    <>
         <div className='background'>
            <div className='styleshop'>
            <button className='btn btn-dark'>Shop now</button>
            </div>
         
            </div>
          <Product/>
          <Cart/>
    </>
  );
};

export default Home;
