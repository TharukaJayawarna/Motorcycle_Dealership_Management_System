import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaChartLine, FaUsersCog, FaShippingFast } from 'react-icons/fa';
import './OrderDashboard.css';
import NavigationBar from "../AdminNavigation/NavigationBar";
import Nav from "../Nav/Nav";

const OrderDashboard = () => {
  const navigate = useNavigate();

  const handleGenerateReport = () => {
   
    navigate('/orderreport');
  };

  return (
    <div>
      <Nav />
      <NavigationBar />
          <div className="order-dashboard-container">
     
     <h1 className="dashboard-heading">Order Management Dashboard</h1>
     <div className="dashboard-boxes">
       <Link to="/OrderDetails" className="dashboard-box blue-box1">
         <FaChartLine className="dashboard-icon" />
         <span>Order Details</span>
       </Link>
       <Link to="/reservationdetails" className="dashboard-box blue-box2">
         <FaUsersCog className="dashboard-icon" />
         <span>Reservation Details</span>
       </Link>
       <Link to="/preorderdetails" className="dashboard-box blue-box3">
         <FaShippingFast className="dashboard-icon" />
         <span>Pre-Order Details</span>
       </Link>
     </div>
     <div className="dashboard-info">
       <div className="info-box">
         <h3>Total Orders</h3>
         <p>1,234</p>
       </div>
       <div className="info-box">
         <h3>Pending Orders</h3>
         <p>78</p>
       </div>
       <div className="info-box">
         <h3>Shipped Orders</h3>
         <p>987</p>
       </div>
     </div>
     <div className="dashboard-actions">
       <button className="action-button" onClick={handleGenerateReport}>
         Generate Report
       </button>
     </div>
   </div>
    </div>

  );
}

export default OrderDashboard;