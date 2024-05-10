import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './orderreport.css';

const ReportPage = () => {
  const [orders, setOrders] = useState([]);
  const [preOrders, setPreOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8070/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    const fetchPreOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8070/preorders');
        setPreOrders(response.data);
      } catch (error) {
        console.error('Error fetching pre-orders:', error);
      }
    };

    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:8070/reserves');
        setReservations(response.data.Reserves);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchOrders();
    fetchPreOrders();
    fetchReservations();
  }, []);

  const handleDownloadReport = () => {
    const doc = new jsPDF();

    // Add orders to the PDF
    doc.autoTable({
      head: [['Order ID', 'Item Name', 'Quantity', 'Net Amount', 'Customer Name', 'Address', 'Date']],
      body: orders.map(order => [
        order.Order_ID,
        order.Item_Name,
        order.Quantity,
        order.Net_Amount,
        order.Cus_Name,
        order.Address,
        new Date(order.Date).toLocaleString(),
      ]),
    });

    // Add pre-orders to the PDF
    doc.addPage();
    doc.autoTable({
      head: [['Pre-Order ID', 'Bike Name', 'Bike Color', 'Quantity', 'Date', 'Customer Name', 'Email']],
      body: preOrders.map(preOrder => [
        preOrder.PreOrder_ID,
        preOrder.Bike_Name,
        preOrder.Bike_Color,
        preOrder.Quantity,
        new Date(preOrder.Date).toLocaleString(),
        preOrder.Cus_Name,
        preOrder.Email,
      ]),
    });

    // Add reservations to the PDF
    doc.addPage();
    if (Array.isArray(reservations)) {
      doc.autoTable({
        head: [['Reservation ID', 'Bike Name', 'Bike Color', 'Date', 'Customer Name', 'Email']],
        body: reservations.map(reservation => [
          reservation.Reserve_ID,
          reservation.Bike_Name,
          reservation.Bike_Color,
          new Date(reservation.Date).toLocaleString(),
          reservation.Cus_Name,
          reservation.Email,
        ]),
      });
    }

    // Save the PDF
    doc.save('report.pdf');
  };

  return (
    <div id="report-page-lg">
      <h1 className="report-heading-lg">Order Report</h1>
      <table className="orders-table-lg">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Net Amount</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.Order_ID}</td>
              <td>{order.Item_Name}</td>
              <td>{order.Quantity}</td>
              <td>{order.Net_Amount}</td>
              <td>{order.Cus_Name}</td>
              <td>{order.Email}</td>
              <td>{order.Address}</td>
              <td>{new Date(order.Date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="pre-orders-table-lg">
        <thead>
          <tr>
            <th>Pre-Order ID</th>
            <th>Bike Name</th>
            <th>Bike Color</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {preOrders.map(preOrder => (
            <tr key={preOrder._id}>
              <td>{preOrder.PreOrder_ID}</td>
              <td>{preOrder.Bike_Name}</td>
              <td>{preOrder.Bike_Color}</td>
              <td>{preOrder.Quantity}</td>
              <td>{new Date(preOrder.Date).toLocaleString()}</td>
              <td>{preOrder.Cus_Name}</td>
              <td>{preOrder.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="reservations-table-lg">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Bike Name</th>
            <th>Bike Color</th>
            <th>Date</th>
            <th>Customer Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(reservation => (
            <tr key={reservation._id}>
              <td>{reservation.Reserve_ID}</td>
              <td>{reservation.Bike_Name}</td>
              <td>{reservation.Bike_Color}</td>
              <td>{new Date(reservation.Date).toLocaleString()}</td>
              <td>{reservation.Cus_Name}</td>
              <td>{reservation.Email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="download-button-lg" onClick={handleDownloadReport}>Download Report</button>
    </div>
  );
};

export default ReportPage;
