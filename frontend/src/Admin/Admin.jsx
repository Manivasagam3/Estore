import React, { useState } from "react";
import '../CSS/Admin.css'
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import AdminForm from "../Admin/AdminForm";
import Users from "./Users";
const Admin = () => {
  const[open,setOpen]=useState(false);
  
  const openUsers=()=>{
    setOpen(true);
  }
  const openadd=()=>{
    setOpen(false)
  }

return (
    <>
   <nav className="navbar navbar-dark bg-light nav1 ">
    <div className="container-fluid d-flex justify-content-between align-items-center">
      <h4 className="text-dark"><FaUserEdit className="pb-1"/>Admin Panel</h4>
      
    <ul className="navbar-nav d-flex flex-row gap-5">
      <li className="nav-item"><button onClick={openUsers}>Users</button></li>
      <li className="nav-item"><button>Product Purchase</button></li>
      <li className="nav-item"><button onClick={openadd}>Add Products</button></li>
      <li className="nav-item"><button><RiLogoutCircleLine/></button></li>
    </ul>
    </div>
   </nav>
   {!open &&
   <div className="admin">
   <AdminForm/>
   
   </div>
}
{
  open && <Users/>
}

   
   
    </>
  
  );
};

export default Admin;
