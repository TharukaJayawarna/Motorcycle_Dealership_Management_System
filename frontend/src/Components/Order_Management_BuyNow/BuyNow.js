import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Buynow.css'; 

function BuyNow() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!state || !state.item || !state.quantity) {
    return <div>Error: Missing item details for Buy Now.</div>;
  }

  const { item, quantity } = state;
  const netAmount = (item.Price * quantity).toFixed(2);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('Order_ID', generateOrderID());
      formData.append('Item_Name', item.Item_Name);
      formData.append('Quantity', quantity);
      formData.append('Net_Amount', netAmount);
      formData.append('Cus_Name', customerName);
      formData.append('Email', email);
      formData.append('Address', address);
      formData.append('Date', new Date().toISOString());
      formData.append('Payment_slip', paymentSlip);

      const response = await axios.post('http://localhost:8070/orders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Order placed successfully!');
      setErrorMessage('');
      console.log('Order placed successfully:', response.data);
      // Redirect user, show success message, etc.
    } catch (error) {
      setErrorMessage('Error placing order. Please try again.');
      setSuccessMessage('');
      console.error('Error placing order:', error);
      // Handle error, show error message, etc.
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setPaymentSlip(file);
  };

  function generateOrderID() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `ORD-${timestamp}-${randomNumber}`;
  }

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="buy-now-container-om">
      <div className="buy-now-card-om">
        <div className="buy-now-content-om">
          <h2 className="buy-now-heading-om">Buy Now</h2>
          <div className="order-details-om">
            <p>Item ID: {item.Item_ID}</p>
            <p>Item Name: {item.Item_Name}</p>
            <p>Item Price: {item.Price}</p>
            <p>Quantity: {quantity}</p>
            <p>Net Amount: {netAmount}</p>
          </div>
          
          <form onSubmit={handlePlaceOrder} className="order-form-om">
            <div className="form-group-om">
              <label htmlFor="customer-name" className="form-label-om">Customer Name:</label>
              <input
                type="text"
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className="form-input-om"
              />
            </div>
            <div className="form-group-om">
              <label htmlFor="email" className="form-label-om">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input-om"
              />
            </div>
            <div className="form-group-om">
              <label htmlFor="address" className="form-label-om">Address:</label>
              <input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="form-input-om"
              />
            </div>
            <div className="form-group-om">
              <label htmlFor="payment-slip" className="form-label-om">Upload Payment Slip (Image):</label>
              <input
                type="file"
                id="payment-slip"
                onChange={handleImageUpload}
                accept="image/*"
                required
                className="form-input-om"
              />
            </div>
            <div className="form-actions-om">
              <button type="submit" className="order-button-om">Place Order</button>
              <button type="button" onClick={handleCancel} className="cancel-button-om">Cancel</button>
            </div>
          </form>
          {successMessage && <div className="success-message-om">{successMessage}</div>}
          {errorMessage && <div className="error-message-om">{errorMessage}</div>}
        </div>
        
        <div className="popup-content-om">
  <div className="popup-header-om">
    <h2 className="popup-heading-om">Before placing the order, please make the necessary payment to the following account and upload the payment slip when you are placing the order:</h2>
  </div>
  <div className="popup-body-om">
    <div className="account-details-om">
      <div className="account-header-om">
        <h3 className="account-heading-om">Account Details</h3>
      </div>
      <div className="account-info-om">
        <p>Account Number: 123456789</p>
        <p>Account Holder: Jayawarna Auto (PVT) Limited</p>
        <p>Bank: Commercial Bank</p>
        <p>Branch: Aluthgama</p>
      </div>
    </div>
    <div className="delivery-details-om">
      <div className="delivery-header-om">
        <h3 className="delivery-heading-om">Delivery Details</h3>
      </div>
      <div className="delivery-info-om">
        <p>Delivery Not Available.</p>
        <p>Delivery Can Be Arranged, If After Paying The Proper Transport Charges. Otherwise, The Customer Has To Come To The Shop And Collect It.</p>
        <p>Contact Us to arrange the delivery.</p>
      </div>
    </div>
  </div>
</div>
</div>
</div>
  );
}

export default BuyNow;