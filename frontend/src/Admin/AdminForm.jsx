import React, { useState } from 'react';
import '../CSS/Adminform.css';

const AdminForm = () => {
  const [productname, setProductname] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);

  const handleImageChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productname.trim() !== '' && category.trim() !== '' && price.trim() !== '' && img) {
      const formData = new FormData();
      formData.append('name', productname);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('image', img);

      fetch("http://localhost:8000/products", {
        method: "POST",
        body: formData,
      })
      .then((res) => {
        if (res.ok) {
          window.alert("Product uploaded successfully");
        } else {
          window.alert("Failed to upload product");
        }
      })
      .catch(() => {
        console.log("Unable to create add");
        window.alert("Failed to upload product");
      });

      setProductname("");
      setCategory("");
      setPrice("");
      setImg(null);
    }
  };

  return (
    <div>
      <h1 className='text-center'>Enter The Product Details</h1>
      <form className='form-design form d-flex flex-column w-50' onSubmit={handleSubmit}>
        <label className='form-label text-bold'>Product Name:</label>
        <input
          className='form-control'
          type="text"
          value={productname}
          onChange={(e) => setProductname(e.target.value)}
        /><br/>
        <label className='form-label'>Category:</label>
        <select
          className='form-control'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="kids">Kids</option>
        </select><br/>
        <label className='form-label'>Price:</label>
        <input
          className='form-control'
          type='text'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        /><br/>
        <label className='form-label'>Image:</label>
        <input
          className='form-control'
          type='file'
          onChange={handleImageChange}
        /><br/>
        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default AdminForm;
