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
      <header className="header">
        <div className="logo">
        <img src="favicon.ico" alt="Company Logo" />
        </div>

        <nav className="nav-bar">
          <ul>
            <li><a href="/userhome">Home</a></li>
            <li className="dropdown">
              <button className="dropbtn" onClick={toggleDropdown}>Gallery</button>
              {showDropdown && (
                <div className="dropdown-content">
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
            <li><a href="#">Promos</a></li>
          </ul>
        </nav>

        
      </header>
    </div>
  )
}

export default Home_navbar;
