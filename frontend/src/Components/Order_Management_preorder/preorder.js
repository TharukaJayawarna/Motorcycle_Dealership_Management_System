import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './preorder.css';

function PreOrder() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({
    customerName: false,
    email: false,
    paymentSlip: false,
  });

  if (!state || !state.bike || !state.quantity) {
    return <div>Error: Missing bike details for Pre Order.</div>;
  }

  const { bike, quantity } = state;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {
      customerName: customerName.trim() === '',
      email: email.trim() === '' || !isValidEmail(email),
      paymentSlip: paymentSlip === null,
    };

    setValidationErrors(errors);

    // Check if there are any validation errors
    if (Object.values(errors).some(Boolean)) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append('PreOrder_ID', generateOrderID());
      formData.append('Bike_Name', bike.Bike_Name);
      formData.append('Bike_Color', bike.Colour);
      formData.append('Quantity', quantity);
      formData.append('Cus_Name', customerName);
      formData.append('Email', email);
      formData.append('Date', new Date().toISOString());
      formData.append('Payment_slip', paymentSlip);

      const response = await axios.post('http://localhost:8070/preorders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccessMessage('Pre Order placed successfully!');
      setErrorMessage('');
      console.log('Pre Order placed successfully:', response.data);
    } catch (error) {
      setErrorMessage('Error placing pre order. Please try again.');
      setSuccessMessage('');
      console.error('Error placing pre order:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setPaymentSlip(file);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      paymentSlip: false,
    }));
  };

  function generateOrderID() {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `ORD-${timestamp}-${randomNumber}`;
  }

  const handleCancel = () => {
    navigate(-1);
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="buy-now-container-om">
      <div className="buy-now-card-om">
        <div className="buy-now-content-om">
          <h2 className="buy-now-heading-om">Pre Order</h2>
          <div className="order-details-om">
            <p>Bike ID: {bike.Bike_ID}</p>
            <p>Bike Name: {bike.Bike_Name}</p>
            <p>Bike Price: {bike.Price}</p>
            <p>Quantity: {quantity}</p>
            <p>Colour: {bike.Colour}</p>
          </div>

          <form onSubmit={handlePlaceOrder} className="order-form-om">
            <div className="form-group-om">
              <label htmlFor="customer-name" className="form-label-om">
                Customer Name:
              </label>
              <input
                type="text"
                id="customer-name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className={`form-input-om ${validationErrors.customerName ? 'error' : ''}`}
              />
              {validationErrors.customerName && (
                <div className="error-message-om">Please enter your name.</div>
              )}
            </div>
            <div className="form-group-om">
              <label htmlFor="email" className="form-label-om">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`form-input-om ${validationErrors.email ? 'error' : ''}`}
              />
              {validationErrors.email && (
                <div className="error-message-om">Please enter a valid email address.</div>
              )}
            </div>

            <div className="form-group-om">
              <label htmlFor="Payment-slip" className="form-label-om">
                Upload Payment Slip (Image):
              </label>
              <input
                type="file"
                id="Payment-slip"
                onChange={handleImageUpload}
                accept="image/*"
                required
                className={`form-input-om ${validationErrors.paymentSlip ? 'error' : ''}`}
              />
              {validationErrors.paymentSlip && (
                <div className="error-message-om">Please upload a payment slip.</div>
              )}
            </div>
            <div className="form-actions-om">
              <button type="submit" className="order-button-om">
                Place Order
              </button>
              <button type="button" onClick={handleCancel} className="cancel-button-om">
                Cancel
              </button>
            </div>
          </form>
          {successMessage && <div className="success-message-om">{successMessage}</div>}
          {errorMessage && <div className="error-message-om">{errorMessage}</div>}
        </div>

        <div className="popup-content-om">
          <div className="popup-header-om">
            <h2 className="popup-heading-om">
              Before placing the order, please make the adavace payment to the following account and
              upload the payment slip when you are placing the order:
            </h2>
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
                <h3 className="delivery-heading-om">Advance Payment Details</h3>
              </div>
              <div className="delivery-info-om">
                <p>LKR 10,000 per bike.</p>
                <p>
                  After a successful pre order placement, you will receive an email about delivery
                  dates of the bike.
                </p>
                <p>
                  Delivery Not Available For Motorcycles. You to come to the shop to fill necessary
                  forms and documents and collect it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreOrder;
