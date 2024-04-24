import React from 'react';
import './Inventory_dashboard.css';
import { Link } from 'react-router-dom';



function Inventory_dashboard() {
  return (
    <div> <h3> Inventory Dashboard </h3>
    <div className="inventory-dashboard">
    <div class = "container">
      <div className="left-section">
        <h2>Spare parts and accessories</h2>
        <img src= "./Images/logo.png"className="App-logo" alt="box" />
        
        <p>Add Spare parts and Accessories to the inventory</p>
        <Link to="/additem">
          <button className="custom-button">Add</button>
           </Link>
          <br></br>
          <img src= "./Images/logo2.png"className="App-logo" alt="list" />
          <p>See the list of products that you have  added</p>
          <Link to ="/viewitemlist">
          <button className="custom-button">View List</button>
          </Link>
        
      </div>
      <div className="vertical-line"></div>
      <div className="right-section">
        <h2>Motorcycle Models</h2>
        
        <img src= "./Images/logo.png"className="App-logo" alt="box" />
          <p>Add Motorcycle Models to the inventory</p>
          <Link to ="/addmodel">
          <button className="custom-button">Add</button>
          </Link>
        <br></br>
        <img src= "./Images/logo2.png"className="App-logo" alt="list" />
          <p>See the list of models that you have  added</p>
          <Link to="/viewmodellist">
          <button className="custom-button">View List</button>
          </Link>
        </div>
    </div>
    
  </div>
  <br></br>
  <br></br>
  <Link to="/report">
  <button className="custom-button1">Generate Reports</button>
  </Link>
  </div>
  )
}

export default Inventory_dashboard;
