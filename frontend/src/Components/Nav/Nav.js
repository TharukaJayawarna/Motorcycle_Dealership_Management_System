import React, { useEffect, useState } from "react";
import "./nav.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Nav = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkLocal = () => {
      if (localStorage.getItem("jsonwebtoken")) {
        setAuthenticated(true);
      }
    };
    checkLocal();
  }, [isAuthenticated]);

  const logout = async () => {
    try {
      await axios.get("http://localhost:8070/api/v1/auth/logout");
      localStorage.removeItem("jsonwebtoken");
      localStorage.removeItem("role");
      Swal.fire({
        icon: "success",
        title: "",
        text: "Successfully Logged Out!!",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      setAuthenticated(false); // Update local state on logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred while logging out. Please try again.",
      });
    }
  };

  return (
    <div className="authentication-nav-container">
      {isAuthenticated ? (
        <nav class="authentication-navbar">
          <div class="authentication-navbar-right">
            <Link to={"/profile"}>
              <span style={{ marginRight: "20px" }} className="span-btn">
                Profile
              </span>
            </Link>
            <span className="span-btn" onClick={logout}>
              Logout
            </span>
          </div>
        </nav>
      ) : (
        <nav class="authentication-navbar">
          <div class="authentication-navbar-right">
            <li className="home-ll">
              <Link to="/login" className="">
                <h1>Login</h1>
              </Link>
            </li>
            <li className="home-ll">
              <Link to="/register" className="">
                <h1>Register</h1>
              </Link>
            </li>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Nav;
