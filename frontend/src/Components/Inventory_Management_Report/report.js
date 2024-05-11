
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './report.css';

const InventoryReport = () => {
  const [items, setItems] = useState([]);
  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsResponse = await axios.get('http://localhost:8070/items');
        setItems(itemsResponse.data.items);

        const bikesResponse = await axios.get('http://localhost:8070/bikes');
        setBikes(bikesResponse.data.bikes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    
    doc.setFontSize(18);
    doc.text('Inventory Report', 20, 20);

    
    doc.autoTable({
      head: [['Item ID', 'Item Name', 'On Hand', 'Received']],
      body: items.map((item) => [item.Item_ID, item.Item_Name, item.In_Stock, item.Received]),
      startY: 30,
    });

    
    doc.addPage();
    doc.autoTable({
      head: [['Bike ID', 'Bike Name', 'On Hand', 'Received']],
      body: bikes.map((bike) => [bike.Bike_ID, bike.Bike_Name, bike.In_Stock, bike.Received]),
      startY: 20,
    });

    
    doc.save('inventory_report.pdf');
  };

  return (
    <div className="inventory-report-container">
      <h2>Inventory Report</h2>
      <div className="report-tables">
        <div className="items-table">
          <h3>Items</h3>
          <table>
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Item Name</th>
                <th>On Hand</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.Item_ID}</td>
                  <td>{item.Item_Name}</td>
                  <td>{item.In_Stock}</td>
                  <td>{item.Received}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bikes-table">
          <h3>Motorcycle Models</h3>
          <table>
            <thead>
              <tr>
                <th>Bike ID</th>
                <th>Bike Name</th>
                <th>On Hand</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {bikes.map((bike, index) => (
                <tr key={index}>
                  <td>{bike.Bike_ID}</td>
                  <td>{bike.Bike_Name}</td>
                  <td>{bike.In_Stock}</td>
                  <td>{bike.Received}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="download-button" onClick={generatePDF}>
        Download Report
      </button>
    </div>
  );
};

export default InventoryReport;