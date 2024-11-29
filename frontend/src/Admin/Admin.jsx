import React, { useState } from "react";
import "../CSS/Admin.css";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaUserEdit } from "react-icons/fa";
import AdminForm from "../Admin/AdminForm";
import Users from "./Users";

const Admin = () => {
  const [open, setOpen] = useState(""); // Empty string indicates no section is active initially.

  const openUsers = () => {
    setOpen("users");
  };

  const openAdd = () => {
    setOpen("addProducts");
  };

  return (
    <div className="admin-page">
      {/* Admin Navigation Bar */}
      <nav className="navbar navbar-dark bg-light nav1">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h4 className="text-dark">
            <FaUserEdit className="pb-1" /> Admin Panel
          </h4>

          <ul className="navbar-nav d-flex flex-row gap-5">
            <li className="nav-item">
              <button onClick={openUsers}>Users</button>
            </li>
            <li className="nav-item">
              <button>Product Purchase</button>
            </li>
            <li className="nav-item">
              <button onClick={openAdd}>Add Products</button>
            </li>
            <li className="nav-item">
              <button>
                <RiLogoutCircleLine />
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Admin Panel Content */}
      <div className="admin-panel-container">
        <div className="admin-container">
          {open === "" && (
            <div>
              <h4>Welcome to the Admin Panel</h4>
              <p>Navigate through the Admin Panel using the options above.</p>
              <div className="button-group">
                <button onClick={openUsers}>View Users</button>
                <button onClick={openAdd}>Add Products</button>
              </div>
            </div>
          )}
          {open === "users" && <Users />}
          {open === "addProducts" && <AdminForm />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
