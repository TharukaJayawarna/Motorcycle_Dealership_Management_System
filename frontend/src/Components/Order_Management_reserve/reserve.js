import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import "./reserve.css";

const Reserve = () => {
  const { state } = useLocation();
  const { bike, quantity } = state;
  const [reserveData, setReserveData] = useState({
    Reserve_ID: generateReserveID(),
    Cus_Name: "",
    Email: "",
    Bike_Name: bike.Bike_Name,
    Bike_Color: bike.Colour,
    Date: getCurrentDate(),
    Quantity: 0,
  });
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Quantity" && (isNaN(value) || value <= 0)) {
      setErrors({ ...errors, Quantity: "Quantity must be a positive number." });
    } else if (name === "Email" && !/\S+@\S+\.\S+/.test(value)) {
      setErrors({ ...errors, Email: "Please enter a valid email address." });
    } else {
      setErrors({ ...errors, [name]: "" });
    }

    setReserveData({ ...reserveData, [name]: value });
  };

  const handleReserve = async () => {
    if (!reserveData.Cus_Name || !reserveData.Email || reserveData.Quantity <= 0 || isNaN(reserveData.Quantity)) {
      setErrors({
        ...errors,
        Cus_Name: reserveData.Cus_Name ? "" : "Customer Name is required.",
        Email: reserveData.Email ? "" : "Email is required.",
        Quantity: reserveData.Quantity > 0 && !isNaN(reserveData.Quantity) ? "" : "Quantity must be a positive number.",
      });
      return;
    }

    try {
      await axios.post("http://localhost:8070/reserves", reserveData);
      setReservationSuccess(true);
    } catch (error) {
      console.error("Error reserving bike:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
   <div>
     <div className="full-page-container">
     <div>
      <Home_navbar />
      <div className="container">
        <div className="om-reserve-card">
          <div className="om-reserve-card-body">
            <h3 className="om-reserve-card-title">Reservation</h3>
            <div className="om-reserve-card-info">
              <p>Bike Name: {bike.Bike_Name}</p>
              <p>Bike Color: {bike.Colour}</p>
              <p>Quantity: {quantity}</p>
            </div>
            <div className="om-reserve-card-form">
              <label htmlFor="Cus_Name">Customer Name:</label>
              <input
                type="text"
                id="Cus_Name"
                name="Cus_Name"
                value={reserveData.Cus_Name}
                onChange={handleInputChange}
                className={`form-control ${errors.Cus_Name ? "is-invalid" : ""}`}
                required
              />
              {errors.Cus_Name && <div className="invalid-feedback">{errors.Cus_Name}</div>}
              <label htmlFor="Email">Email:</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={reserveData.Email}
                onChange={handleInputChange}
                className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                required
              />
              {errors.Email && <div className="invalid-feedback">{errors.Email}</div>}
              <label htmlFor="Quantity">Quantity:</label>
              <input
                type="number"
                id="Quantity"
                name="Quantity"
                value={reserveData.Quantity}
                onChange={handleInputChange}
                className={`form-control ${errors.Quantity ? "is-invalid" : ""}`}
                required
              />
              {errors.Quantity && <div className="invalid-feedback">{errors.Quantity}</div>}
            </div>
            <div className="om-reserve-card-actions">
              <button
                className="btn btn-success"
                onClick={handleReserve}
                disabled={!reserveData.Cus_Name || !reserveData.Email || reserveData.Quantity <= 0 || isNaN(reserveData.Quantity) || !/\S+@\S+\.\S+/.test(reserveData.Email)}
              >
                Reserve
              </button>
              <button className="btn btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
            {reservationSuccess && <p className="success-message">Reservation successful!</p>}
          </div>
        </div>
      </div>
      </div>
    </div>
      <Home_footer />
    </div>
  );
};

export default Reserve;

// Function to generate a unique Reserve ID
const generateReserveID = () => {
  return "RES" + Math.floor(Math.random() * 10000);
};

// Function to get the current date in the format YYYY-MM-DD
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
};
