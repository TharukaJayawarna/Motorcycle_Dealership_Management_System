import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Home_navbar from "../../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../../Inventory_Management_Home_footer/Home_footer";

function AddComplaint() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    complaint: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.username || !inputs.email || !inputs.complaint) {
      alert("Please provide all required information.");
      return;
    }

    try {
      await sendRequest();
      showAlert();
      navigate("/validatedDetails");
    } catch (error) {
      console.error("Error adding complaint:", error);
      alert("Failed to add complaint. Please try again.");
    }
  };

  const sendRequest = async () => {
    await axios.post("http://localhost:8070/complaints", {
      username: inputs.username,
      email: inputs.email,
      complaint: inputs.complaint,
    });
  };

  const showAlert = () => {
    alert("Complaint added successfully!");
  };

  return (
    <div>
      <Home_navbar/>
      <div>
        <div className="rate-full-box">
          <div>

            <h1 className="rate_topic">
              Add <span className="rate-us">Complaint</span>{" "}
            </h1>
            <br></br>
            <button onClick={()=>(window.location.href='/validatedDetails')} className="add_rate">My Complaint</button>
            <form onSubmit={handleSubmit} className="rate-full-box-form">
              <label className="rate-full-box-label">Username</label>
              <input
                type="text"
                name="username"
                value={inputs.username}
                onChange={handleInputChange}
                className="rate-full-box-input"
                required
              />
              <br />
              <label className="rate-full-box-label">Email</label>
              <input
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
                className="rate-full-box-input"
                required
              />
              <br />
              <label className="rate-full-box-label">Complaint</label>
              <textarea
                className="rate-full-box-input rate-text"
                name="complaint"
                value={inputs.complaint}
                onChange={handleInputChange}
                required
              />
              <br />
              <button type="submit" className="centerbtn_rate">
                Add Complaint
              </button>
            </form>
          </div>
        </div>
      </div>
      <Home_footer/>
    </div>
  );
}

export default AddComplaint;
