
// NavigationBar.js

import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <div>
      <div className="vertical-navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/ViewRequest ">View Request </Link>
        <Link to="/AnalyzeFeedbackAndComplaints ">Analyze Feedback And Complaints </Link>
        <Link to="/FinancialManagement">Financial Management</Link>
        <Link to="/notification">Notification</Link>
        <Link to="/Promotion">Promotion</Link>
        
      </div>
    </div>
  );
}

export default NavigationBar;
