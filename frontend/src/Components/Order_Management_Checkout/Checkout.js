import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import HomeNavbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import { v4 as uuidv4 } from "uuid";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentSlip, setPaymentSlip] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state) {
      if (location.state.items) {
        setItems(location.state.items);
      } else if (location.state.item) {
        const item = location.state.item;
        item.quantity = location.state.quantity;
        setItems([item]);
      }
    }

    let total = 0;
    items.forEach((item) => {
      total += item.Item_Price * (item.quantity || 1);
    });
    setTotalAmount(total);
  }, [location.state, items]);

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("Cus_Name", customerName);
      formData.append("Email", email);
      formData.append("Address", address);
      formData.append("Date", new Date().toISOString());
      formData.append("Payment_slip", paymentSlip);

      items.forEach((item) => {
        formData.append("Order_ID", generateOrderID());
        formData.append("Item_Name", item.Item_Name);
        formData.append("Quantity", item.quantity || 1);
        formData.append(
          "Net_Amount",
          (item.Item_Price * (item.quantity || 1)).toFixed(2)
        );
      });

      const response = await axios.post(
        "http://localhost:8070/orders",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Call the webhook to remove the items from the cart
      const itemIds = items.map((item) => ({ id: item._id }));
      await axios.post("http://localhost:8070/webhook/order-create", {
        line_items: itemIds,
      });

      setSuccessMessage("Order placed successfully!");
      setErrorMessage("");
      console.log("Order placed successfully:", response.data);
    } catch (error) {
      setErrorMessage("Error placing order. Please try again.");
      setSuccessMessage("");
      console.error("Error placing order:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setPaymentSlip(file);
  };

  const generateOrderID = () => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 1000000);
    return `ORD-${timestamp}-${randomNumber}`;
  };

  const handleCancel = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const validateForm = () => {
    const errors = {};

    if (!customerName.trim()) {
      errors.customerName = "Customer Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }

    if (!address.trim()) {
      errors.address = "Address is required";
    }

    if (!paymentSlip) {
      errors.paymentSlip = "Payment slip is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return (
    <div>
      <HomeNavbar />
      <div className="full-page-container">
        
        <div className="checkout-container-om">
          <div className="checkout-card-om">
            <div className="checkout-left">
              <h2>Checkout</h2>
              {items.length > 1 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Item ID</th>
                      <th>Item Name</th>
                      <th>Item Price</th>
                      <th>Quantity</th>
                      <th>Net Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.Item_ID}</td>
                        <td>{item.Item_Name}</td>
                        <td>{item.Item_Price}</td>
                        <td>{item.quantity || 1}</td>
                        <td>{(item.Item_Price * (item.quantity || 1)).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                items.map((item, index) => (
                  <div key={index} className="order-details-om">
                    <p>Item ID: {item.Item_ID}</p>
                    <p>Item Name: {item.Item_Name}</p>
                    <p>Item Price: {item.Item_Price}</p>
                    <p>Quantity: {item.quantity || 1}</p>
                    <p>Net Amount: {(item.Item_Price * (item.quantity || 1)).toFixed(2)}</p>
                  </div>
                ))
              )}
              <div className="total-amount-om">
                <p>Total Amount: {totalAmount.toFixed(2)}</p>
              </div>
              <form onSubmit={handleCheckout} className="order-form-om">
                <div>
                  <label htmlFor="customer-name">Customer Name:</label>
                  <input
                    type="text"
                    id="customer-name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    className={errors.customerName ? "error" : ""}
                  />
                  {errors.customerName && <div className="error-message">{errors.customerName}</div>}
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={errors.email ? "error" : ""}
                  />
                  {errors.email && <div className="error-message">{errors.email}</div>}
                </div>
                <div>
                  <label htmlFor="address">Address:</label>
                  <input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    className={errors.address ? "error" : ""}
                  ></input>
                  {errors.address && <div className="error-message">{errors.address}</div>}
                </div>
                <div>
                  <label htmlFor="payment-slip">Upload Payment Slip (Image):</label>
                  <input
                    type="file"
                    id="payment-slip"
                    onChange={handleImageUpload}
                    accept="image/*"
                    required
                    className={errors.paymentSlip ? "error" : ""}
                  />
                  {errors.paymentSlip && <div className="error-message">{errors.paymentSlip}</div>}
                </div>
                <div className="form-actions">
                  <button type="submit">Place Order</button>
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
              {successMessage && (
                <div className="success-message-om">{successMessage}</div>
              )}
              {errorMessage && (
                <div className="error-message-om">{errorMessage}</div>
              )}
            </div>
            <div className="checkout-right">
              <div className="popup-content-om">
                <h2 className="popup-heading-om">
                  Before placing the order, please make the necessary payment to
                  the following account and upload the payment slip when you are
                  placing the order:
                </h2>
                <div className="account-details-om">
                  <h3 className="account-heading-om">Account Details:</h3>
                  <p>Account Number: 123456789</p>
                  <p>Account Holder: Jayawarna Auto (PVT) Limited</p>
                  <p>Bank: Commercial Bank</p>
                  <p>Branch: Aluthgama</p>
                </div>
                <div className="delivery-details-om">
                  <h3 className="delivery-heading-om">Delivery Details:</h3>
                  <p>Delivery Not Available.</p>
                  <p>
                    Delivery Can Be Arranged, If After Paying The Proper Transport
                    Charges. Otherwise, The Customer Has To Come To The Shop And
                    Collect It.
                  </p>
                  <p>Contact Us to arrange the delivery.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Home_footer />
    </div>
  );
}

export default Checkout;
