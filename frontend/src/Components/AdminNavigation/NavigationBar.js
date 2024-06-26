import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight, FaHome, FaUserAlt, FaBoxOpen, FaListAlt, FaCommentAlt, FaExclamationTriangle, FaTools } from "react-icons/fa"; // Importing more icons

function NavigationBar() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {isVisible && (
        <div className="vertical-navbar">
          <Link to="/AdminDashboard">
            <FaHome /> Dashboard
          </Link>
          <Link to="/userdetails">
            <FaUserAlt /> Users
          </Link>
          <Link to="/inventorydash">
            <FaBoxOpen /> Inventory
          </Link>
          <Link to="/orderdash">
            <FaListAlt /> Order List
          </Link>
          <Link to="/admindash">
            <FaCommentAlt /> Analyze Feedback & Complaints
          </Link>
      
          <Link to="/analyze_complaints">
            <FaTools /> Service & Repair
          </Link>
        </div>
      )}
      <button className="toggle-btn" onClick={toggleVisibility}>
        {isVisible ? <FaChevronLeft /> : <FaChevronRight />}
      </button>
    </div>
  );
}

export default NavigationBar;