import React, { useState,useEffect } from 'react'
import '../CSS/Mens.css'
const Womens = () => {
    const[women,setWomen]=useState([]);
    useEffect(() => {
        fetch("http://localhost:8000/women") // Ensure the correct endpoint is used
          .then((res) => res.json())
          .then((data) => setWomen(data))
          .catch((err) => console.log(err));
      }, []);
  return (
    <>
    <h1>Womens</h1>
    <div className='product-items'>
    
    {
     women.map((data,index)=>(
        <div key={index}>
        <ul className='items'>
      <div className='content'>
        <li><img src={`data:image/png;base64,${data.image}`} alt={data.name} width="90%" /></li>
        <div className='product-info'>
          <li>Product:{data.name}</li>
          <li>Category:{data.category}</li>
          <li>Price:${data.price}</li>
         </div> 
         </div>
          <div className='button'>
          <button className='btn btn-success'>Addto cart</button>
          <button className='btn btn-info'>Buy now</button>
          </div>
        </ul>
      </div>

      ))
    }
    </div>
    </>
  )
}

export default Womens
