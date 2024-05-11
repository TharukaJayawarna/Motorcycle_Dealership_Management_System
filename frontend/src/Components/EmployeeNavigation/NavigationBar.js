// NavigationBar.js

import React from "react";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <div>
      <div className="vertical-navbar">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/AddComplaint">Add Complaint</Link>
        <Link to="/AnalyzeComplaints">Analyze Complaints</Link>
        <Link to="/Leave Request">Leave Request</Link>
       
        
      </div>
    </div>
  );
}

export default NavigationBar;
