// NavigationBar.js

import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <div>
      <div className="vertical-navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/userdetails">Users</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/orderlist">Order List</Link>
        <Link to="/notification">Notification</Link>
        <Link to="/analyze_feedback">Analyze Feedback</Link>
        <Link to="/analyze_complaints">Analyze Complaints</Link>
      </div>
    </div>
  );
}

export default NavigationBar;
