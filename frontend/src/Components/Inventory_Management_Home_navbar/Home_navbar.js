import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Home_navbar.css";

function Home_navbar() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <header className="IM_Home_header">
        <div className="IM_Home_logo">
          <img src="../Images/favicon.ico" className="IM_Gallery-image" alt="img" />
        </div>

        <nav className="IM_Home_nav-bar">
          <ul>
            <li><a href="/userhome">Home</a></li>
            <li className="IM_dropdown">
              <button className="IM_dropbtn" onClick={toggleDropdown}>Gallery</button>
              {showDropdown && (
                <div className="IM_dropdown-content">
                  <div>
                    <Link to="/userhomegallery/motorcycle-models">Motorcycle Models</Link>
                  </div>
                  <div>
                    <Link to="/userhomegallery/parts-and-accessories">Parts and Accessories</Link>
                  </div>
                </div>
              )}
            </li>
            <li><a href="#">Service & Repairs</a></li>
            <li><a href="#">Feedback & Complaints</a></li>
            <li><a href="#">Promotions</a></li>
            <li>
              <a href="/userhomegallery/cart" className="om-cart-btn">
                <img src="../Images/icons8-cart-24.png" alt="Cart" />
              </a>
            </li>
            <li className="IM_profile">
              <Link to="/userprofile">Profile</Link>
              <Link to="/logout" style={{ marginLeft: '20px' }}>Logout</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Home_navbar;