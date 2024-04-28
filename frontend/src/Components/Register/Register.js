import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Register() {
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    gmail: "",
    password: "",
    confirmPassword: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    // Check if passwords match
    if (user.password !== user.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Passwords do not match!",
      });
      return;
    }

    // Check if any field is empty
    for (const key in user) {
      if (user[key] === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill out all fields!",
        });
        return;
      }
    }

    try {
      await sendRequest();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registration Successful!",
      });
      history("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/api/v1/user/", {
        name: String(user.name),
        email: String(user.gmail),
        password: String(user.password),
        role: "Customer",
      })
      .then((res) => res.data);
  };

  return (
    <div>
      <Nav />
      <div style={{ marginTop: "50px" }}>
        {/* <Nav/> */}
        <div className="register-container">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" onChange={handleInputChange} name="name" />
            <br />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" onChange={handleInputChange} name="gmail" />
            <br />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              onChange={handleInputChange}
              name="password"
            />
            <br />
            <br />
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              onChange={handleInputChange}
              name="confirmPassword"
            />
            <br />
            <br />
            <input type="submit" value="Register" />
          </form>
          {/* Link to login page */}
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
