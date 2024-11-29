import React, { useState } from 'react';
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import "../CSS/sidebar.css";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const Sidebar = ({ username }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleCloseSidebar = () => {
    setIsVisible(false);
  };

  return (
    isVisible && (
      <aside className="sidebar">
        <div className="toggle-btn">
          <IoArrowBackCircleOutline
            style={{ height: "40px", cursor: "pointer" }}
            onClick={handleCloseSidebar}
          />
        </div>
        <div className="user-info">
          <FaUser className="Users-logo" />
          <p className="username">Hello, {username}</p>
        </div>
        <ul className="sidebar-list">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/orders">Orders</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </aside>
    )
  );
};

export default Sidebar;
