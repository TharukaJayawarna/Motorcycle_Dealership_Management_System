import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import "./reserve.css";

// Function to generate a unique Reserve ID
const generateReserveID = () => {
  return "RES" + Math.floor(Math.random() * 10000); // Example of generating a random Reserve ID
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

const Reserve = () => {
  const { state } = useLocation();
  const { bike, quantity } = state;
  const [reserveData, setReserveData] = useState({
    Reserve_ID: generateReserveID(), // Automatically generate Reserve ID
    Cus_Name: "",
    Email: "",
    Bike_Name: bike.Bike_Name,
    Bike_Color: bike.Colour,
    Date: getCurrentDate(), // Set current date for Reservation Date
  });
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setReserveData({ ...reserveData, [e.target.name]: e.target.value });
  };

  const handleReserve = async () => {
    try {
      await axios.post("http://localhost:8070/reserves", reserveData);
      setReservationSuccess(true); // Set reservation success to true
    } catch (error) {
      console.error("Error reserving bike:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
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
                className="form-control"
              />
              <label htmlFor="Email">Email:</label>
              <input
                type="email"
                id="Email"
                name="Email"
                value={reserveData.Email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="om-reserve-card-actions">
              <button className="btn btn-success" onClick={handleReserve}>
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

      <Home_footer />
    </div>
  );
};

export default Reserve;