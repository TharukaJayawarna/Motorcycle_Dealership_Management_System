import React from 'react';
import './FinancialManagement.css';
import { Link } from "react-router-dom";
import empPaymentImage from './images/emp_payment.jpeg';
import supplierPaymentsImage from './images/sup_payment.jpeg';
import additionalPaymentsImage from './images/add_payment.jpeg';
import financialReportsImage from './images/financial_rep.jpeg';
//import NavigationBar from '../NavigationBar'; // Import the NavigationBar component

function FinancialManagement() {
  return (
    <div className="FinancialManagement">
      <div className="financial-navbar-container">
      <br/><br/><br/>
        {/* Place the NavigationBar component here */}
      </div>
      <div className="financial-content-container">
        <br/><br/><br/><br/>
        <center><h1><b>Financial Management</b></h1></center>
        <div className="financial-button-container">
          <div className="financial-button-row">
            <button className="financial-button">
              <img src={empPaymentImage} alt="Employee Payments" />
              <Link to="/employee-payment"><span>Employee Payments</span></Link>
            </button>
            <button className="financial-button">
              <img src={supplierPaymentsImage} alt="Supplier Payments" />
              <Link to="/supplier-payment"><span>Supplier Payments</span></Link>
            </button>
          </div>
          <div className="financial-button-row">
            <button className="financial-button">
              <img src={additionalPaymentsImage} alt="Additional Payments" />
              <Link to="/additional-payment"><span>Additional Payments</span></Link>
            </button>
            <button className="financial-button">
              <img src={financialReportsImage} alt="Financial Reports" />
              <Link to="/financial-reports"><span>Financial Reports</span></Link>
            </button>
          </div>
        </div>
        <br/><br/><br/><br/><br/>
      </div>
    </div>
  )
}

export default FinancialManagement;
