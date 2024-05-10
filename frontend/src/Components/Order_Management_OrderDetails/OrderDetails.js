import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './OrderDetails.css'; // Import CSS file for styling

function OrderDetails() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleViewPaymentSlip = (paymentSlipUrl) => {
    // Implement logic to view/download payment slip
    window.open(paymentSlipUrl, '_blank');
  };

  const filteredOrders = orders.filter(order =>
    Object.values(order)
      .join(' ')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="my-orders-container-wq">
      <h2 className="my-orders-heading-wq">Orders List</h2>
      <div className="search-container-wq">
        <input
          type="text"
          placeholder="Search orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input-wq"
        />
      </div>
      {filteredOrders.length === 0 ? (
        <p className="no-orders-message-wq">No orders found.</p>
      ) : (
        <table className="orders-table-wq">
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
              <th>Payment Slip</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td>{order.Order_ID}</td>
                <td>{order.Item_Name}</td>
                <td>{order.Quantity}</td>
                <td>{order.Net_Amount}</td>
                <td>{order.Cus_Name}</td>
                <td>{order.Email}</td>
                <td>{order.Address}</td>
                <td>{new Date(order.Date).toLocaleString()}</td>
                <td>
                  {order.Payment_slip && (
                    <button
                      className="view-payment-slip-button-wq"
                      onClick={() => handleViewPaymentSlip(order.Payment_slip)}
                    >
                      View Payment Slip
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="cancel-order-button-wq"
                    onClick={() => handleCancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderDetails;
