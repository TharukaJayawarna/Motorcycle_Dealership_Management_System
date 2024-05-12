import React, { useState, useEffect } from 'react';
import './Inventory_dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AlertBox from '../Inventory_Management_alert-box/alert-box';
import NavigationBar from "../AdminNavigation/NavigationBar";
import Nav from "../Nav/Nav";

function Inventory_dashboard() {
  const [lowInventoryItems, setLowInventoryItems] = useState([]);
  const [lowInventoryBikes, setLowInventoryBikes] = useState([]);
  const [lowInventoryItemsCount, setLowInventoryItemsCount] = useState(0);
  const [lowInventoryBikesCount, setLowInventoryBikesCount] = useState(0);
  const [lowInventoryAlertCount, setLowInventoryAlertCount] = useState(0);

  useEffect(() => {
    fetchLowInventoryItems();
    fetchLowInventoryBikes();
  }, []);

  const fetchLowInventoryItems = async () => {
    try {
      const response = await axios.get('http://localhost:8070/items');
      const data = response.data.items;

      const lowStockItems5 = data.filter(item => item.In_Stock < 5);
      const lowStockItems3 = data.filter(item => item.In_Stock < 3);

      setLowInventoryItems([...lowStockItems5, ...lowStockItems3]);
      setLowInventoryItemsCount(lowStockItems5.length + lowStockItems3.length);
      setLowInventoryAlertCount(prevCount => prevCount + lowStockItems5.length + lowStockItems3.length);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLowInventoryBikes = async () => {
    try {
      const response = await axios.get('http://localhost:8070/bikes');
      const data = response.data;

      const lowStockBikes = data.filter(bike => bike.In_Stock <= 1);

      setLowInventoryBikes(lowStockBikes);
      setLowInventoryBikesCount(lowStockBikes.length);
      setLowInventoryAlertCount(prevCount => prevCount + lowStockBikes.length);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
   <div>
    <Nav />
  <NavigationBar />
<div className="full-page-container">
    
    <div className="content-container">
      <h3 className="IM-Dashboard-inventory-heading"> Inventory Dashboard </h3>

      {(lowInventoryItemsCount > 0 || lowInventoryBikesCount > 0) && (
        <div>
          {lowInventoryItemsCount > 0 && (
            <AlertBox type="warning" message={`Low Inventory Alert: ${lowInventoryItemsCount} items have low stock levels`} />
          )}

          {lowInventoryBikesCount > 0 && (
            <AlertBox type="warning" message={`Low Inventory Alert: ${lowInventoryBikesCount} bikes have low stock levels`} />
          )}
        </div>
      )}

      <div className="IM-inventory-dashboard">
        <div className="IM-inventory-container">
          <div className="IM-left-section">
            <h2 className="IM-inventory-h2">Spare parts and accessories</h2>
            <img src="./Images/logo.png" className="IM-inventory-logo" alt="box" />
            <p className="IM-dash-inventory-p">Add Spare parts and Accessories to the inventory</p>
            <Link to="/additem">
              <button className="IM-inventory-button">Add</button>
            </Link>
            <br></br>
            <img src="./Images/logo2.png" className="IM-inventory-logo" alt="list" />
            <p className="IM-dash-inventory-p">See the list of products that you have added</p>
            <Link to="/viewitemlist">
              <button className="IM-inventory-button">View List</button>
            </Link>
          </div>
          <div className="IM-vertical-line"></div>
          <div className="IM-right-section">
            <h2 className="IM-inventory-h2">Motorcycle Models</h2>
            <img src="./Images/logo.png" className="IM-inventory-logo" alt="box" />
            <p className="IM-dash-inventory-p">Add Motorcycle Models to the inventory</p>
            <Link to="/addmodel">
              <button className="IM-inventory-button">Add</button>
            </Link>
            <br></br>
            <img src="./Images/logo2.png" className="IM-inventory-logo" alt="list" />
            <p className="IM-dash-inventory-p">See the list of models that you have added</p>
            <Link to="/viewmodellist">
              <button className="IM-inventory-button">View List</button>
            </Link>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <Link to="/report">
        <button className="IM-report-button">Generate Reports</button>
      </Link>
    </div>
  </div>
   </div>
   
);
}

export default Inventory_dashboard;