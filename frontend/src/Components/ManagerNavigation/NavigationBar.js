// NavigationBar.js

import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <div>
      <div className="vertical-navbar">
        <Link to="/managerdashboard">Dashboard</Link>
        <Link to="/ViewRequest ">View Request </Link>
        
        <Link to="/financialdash">Financial Management</Link>
        <Link to="/mainhome">Notification and Promotion</Link>
        
        
      </div>
    </div>
  );
}

export default NavigationBar;
