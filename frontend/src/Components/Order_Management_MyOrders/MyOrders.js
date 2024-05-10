import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyOrders.css'; // Import CSS file for styling

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8070/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleViewDetails = (order) => {
    // Implement logic to view order details
    console.log('Viewing order details:', order);
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8070/orders/${orderId}`);
      fetchOrders();
    } catch (error) {
      console.error('Error canceling order:', error);
    }
  };

  return (
    <div className="my-orders-container-oue">
      <h2 className="my-orders-heading-oue">My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders-message-oue">No orders found.</p>
      ) : (
        <div className="orders-grid-oue">
          {orders.map(order => (
            <div key={order._id} className="order-card-oue">
              <div className="order-details-oue">
                <p><strong>Order ID:</strong> {order.Order_ID}</p>
                <p><strong>Item Name:</strong> {order.Item_Name}</p>
                <p><strong>Quantity:</strong> {order.Quantity}</p>
                <p><strong>Net Amount:</strong> {order.Net_Amount}</p>
                <p><strong>Customer Name:</strong> {order.Cus_Name}</p>
                <p><strong>Email:</strong> {order.Email}</p>
                <p><strong>Address:</strong> {order.Address}</p>
                <p><strong>Date:</strong> {new Date(order.Date).toLocaleString()}</p>
              </div>
              <div className="order-actions-oue">
                <button
                  className="cancel-order-button-oue"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="back-button-oue" onClick={() => navigate(-1)}>
        Go Back
      </button>
    </div>
  );
}

export default MyOrders;
