import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CSS/Home.css';
import Product from './Product';
import banner from '../Assets/banner_mens.png';
import Aside from './Aside';

const Home = () => {
  return (
    <>
    <div style={{display:"flex"}}>
    <Aside/>
     <main>
         <div className='background'>
          <img src={banner} width="110%"/> 
         </div>
        
          <Product/>
     </main>
    </div>
   
         
    </>
  );
};

export default Home;
