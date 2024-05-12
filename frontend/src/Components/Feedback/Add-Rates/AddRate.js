import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import "./AddRate.css";
import Home_navbar from "../../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../../Inventory_Management_Home_footer/Home_footer";


function AddRate() {
  const navigate = useNavigate();  // Initialize navigation function
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    rating: null,
    comment: "",
  });

  // Function to update the rating value on change
  const handleChange = (event, newValue) => {
    setInputs((prevState) => ({
      ...prevState,
      rating: newValue,
    }));
  };

  // Function to handle changes in username, email, and comment fields
  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate if all inputs are filled
    if (
      !inputs.rating ||
      !inputs.comment ||
      !inputs.username ||
      !inputs.email
    ) {
      alert("Please provide all required information.");
      return;
    }
    console.log(inputs);
    await sendRequest();
    showAlert();
    navigate("/ratedetails");
  };

  // Function to send the user input data to server
  const sendRequest = async () => {
    await axios.post("http://localhost:8070/rates", {
      username: inputs.username,
      email: inputs.email,
      rates: inputs.rating,
      comment: inputs.comment,
    });
  };

  // Function to show an alert upon successful submission
  const showAlert = () => {
    alert("Rate added successfully!");
  };

  // JSX to render the component UI
  return (
    <div>
      <Home_navbar/>
      
      <div>
        <div className="rate-full-box">
          <div className="">
            <h1 className="rate_topic">
              Add <span className="rate-us">Rate</span>{" "}
            </h1>
            <form onSubmit={handleSubmit} className="rate-full-box-form">
              <label className="rate-full-box-label">Username</label>
              <br></br>
              <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleCommentChange}
                className="rate-full-box-input"
                required
              />
              <br />
              <label className="rate-full-box-label">Email</label>
              <br></br>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleCommentChange}
                className="rate-full-box-input"
                required
              />
              <br />
              <label className="rate-full-box-label">Rating</label>
              <br></br>
              <Rating
                name="rating"
                size="large"
                value={inputs.rating}
                onChange={handleChange}
                precision={1}
                icon={<StarIcon fontSize="inherit" />}
                required
              />
              <br />
              <label className="rate-full-box-label">Comment</label>
              <br></br>
              <textarea
                className="rate-full-box-input rate-text"
                name="comment"
                value={inputs.comment}
                onChange={handleCommentChange}
                required
              />
              <br />
              <button type="submit" className="centerbtn_rate">
                Add Rate
              </button>
            </form>
          </div>
        </div>
      </div>
      <Home_footer/>
     
    </div>
  );
}

export default AddRate;
