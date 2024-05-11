import React, { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./NotificationForm.css"
import Nav from "../Nav/Nav";
import NavigationBar from "../ManagerNavigation/NavigationBar";

function NotificationForm() {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [notificationStatus, setNotificationStatus] = useState("");

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8070/mail/sendEmail",
        {
          name: inputs.name,
          email: inputs.email,
          message: inputs.message,
        }
      );
      if (response.status === 200) {
        setNotificationStatus("Notification sent successfully!");
        setInputs({
          name: "",
          email: "",
          message: "",
        });
      } else {
        console.error("Unexpected status code:", response.status);
        setNotificationStatus(
          "Failed to send notification. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setNotificationStatus(
        "Failed to send notification. Please try again later."
      );
    }
  };

  return (
    <div>
      <Nav />
      <NavigationBar /><br />
      <h1 className="unique-heading">Notify User</h1>
      {notificationStatus && <div>{notificationStatus}</div>}
      <br />
      <form className="unique-form" onSubmit={handleSubmit}>
        <div><br/>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
        <br/><br/>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
          />
        </div>
        <div><br/><br/>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={inputs.message}
            onChange={handleChange}
            required
          />
        </div>
        <br/>
        <button type="submit">Send</button>
      </form>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
     
      
    </div>
    
    

  );
}

export default NotificationForm;
