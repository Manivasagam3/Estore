import React from "react";
import "../CSS/Aside.css";
import { FaTruck, FaTag, FaPercent, FaHeart, FaFacebook, FaInstagram,FaClock,FaShoppingBag,FaCalendar } from 'react-icons/fa'; // Importing icons

const Aside = () => {
  return (
    <aside className="vertical-marquee">
      <div className="marquee-content">
        <h1><FaTag /> Welcome to FashionMart</h1>
        <h1><FaPercent /> Exclusive Discounts Available!</h1>
        <h1><FaTag /> Shop the Latest Trends!</h1>
        <h1><FaClock /> Hurry, Limited Time Offers!</h1>
        <h1><FaShoppingBag /> New Arrivals Just In!</h1>
        <h1><FaPercent /> Flat 50% Off on Selected Items!</h1>
        <h1><FaHeart /> Join Our Loyalty Program Today!</h1>
        <h1><FaTruck /> Free Shipping on Orders Above $50!</h1>
        <h1><FaFacebook /> <FaInstagram /> Follow Us on Social Media for Updates!</h1>
        <h1><FaTag /> Discover Your Unique Style with FashionMart!</h1>
        <h1><FaCalendar /> Don't Miss Out on Seasonal Sales!</h1>
      </div>
    </aside>
  );
};

export default Aside;
