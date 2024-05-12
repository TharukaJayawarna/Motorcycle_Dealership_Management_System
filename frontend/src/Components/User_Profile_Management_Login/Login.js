import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Nav from "../Nav/Nav";
import ReCAPTCHA from "react-google-recaptcha";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "Customer", // Default role
  });
  const [captchaValue, setCaptchaValue] = useState(null); // State to store CAPTCHA value

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate CAPTCHA here
    if (!captchaValue) {
      // If CAPTCHA is not solved, prompt the user to solve it
      Swal.fire({
        icon: "error",
        title: "CAPTCHA Validation",
        text: "Please solve the CAPTCHA.",
      });
      return; // Exit the function
    }

    // If CAPTCHA is solved, proceed with login
    try {
      const res = await sendRequest();
      if (res.data.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You have been successfully logged in.",
        });
        const role = localStorage.getItem("role");
        if (role === "Admin") {
          navigate("/userdetails");
        }
        if (role === "Customer") {
          navigate("/home-main");
        }
        if (role === "Employee") {
          navigate("/employeedashboard");
        }
        if (role === "Manager") {
          navigate("/managerdashboard");
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response.data.message,
      });
    }
  };

  const sendRequest = async () => {
    const res = await axios.post("http://localhost:8070/api/v1/auth/login", {
      email: user.email,
      password: user.password,
      role: user.role,
    });

    if (res.data.status === "success") {
      console.log(res.data);
      const token = res.data.data.token;
      const role = res.data.data.role;
      localStorage.setItem("jsonwebtoken", token);
      localStorage.setItem("role", role);
    }
    return res;
  };

  const onChange = (value) => {
    // Set the CAPTCHA value in state
    setCaptchaValue(value);
  };

  return (
    <div>
      {/* <Nav /> */}
      <div style={{ marginTop: "50px" }}>
        <div className="register-container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={user.email}
              onChange={handleInputChange}
              name="email"
              required
            />
            <br />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              value={user.password}
              onChange={handleInputChange}
              name="password"
              required
            />
            <p style={{ textAlign: "right" }}>
              <Link to="/reset-password">Forgot Password?</Link>
            </p>
            <br />
            <br />
            <label htmlFor="role">Role:</label>
            <select
              name="role"
              value={user.role}
              onChange={handleInputChange}
            >
              <option value="Customer">Customer</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
            <br />
            <br />
            <ReCAPTCHA
              sitekey="6Lf_sMgpAAAAAAz3fBvaAoWZOhrxBOX-yC3cnWec"
              onChange={onChange}
            />
            <br />
            <input type="submit" value="Login" />
          </form>
          {/* Link to register page */}
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
      <Home_footer /> 
    </div>
  );
}

export default Login;
