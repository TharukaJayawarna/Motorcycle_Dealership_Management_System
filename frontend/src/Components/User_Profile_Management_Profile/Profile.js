import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./profile.css";
import { Link, useNavigate } from "react-router-dom";
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import Nav from "../Nav/Nav";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("jsonwebtoken");
        const response = await axios.get(
          "http://localhost:8070/api/v1/auth/current-user",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data.data);
        setUserData(response.data.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
        });
      }
    };

    fetchUserProfile();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jsonwebtoken");
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmation.isConfirmed) {
        await axios.delete(`http://localhost:8070/api/v1/user/${userData._id}`);
        await axios.get("http://localhost:8070/api/v1/auth/logout");
        localStorage.removeItem("jsonwebtoken");
        localStorage.removeItem("role");
        Swal.fire(
          "Deleted!",
          "Your profile has been deleted.Please Login!",
          "success"
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        navigate("/login");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
      });
    }
  };

  return (
    <div>
      {userData.role === "Customer" && (
        <div>
          <Home_navbar />
        </div>
      )}
      {userData.role === "Admin" && (
        <div>
          <Nav />
        </div>
      )}
      <div className="user-profile-container">
        <h1>User Profile</h1>
        <div className="profile-image">
          <img
            src={
              userData.image ||
              "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt="avatar"
            className="rounded-full"
          />
        </div>
        <div className="profile-details">
          <p>
            <b>ID:</b> {userData._id}
          </p>
          <p>
            <b>Name:</b> {userData.name}
          </p>
          <p>
            <b>Email:</b> {userData.email}
          </p>
          {/* Consider hiding password information */}
          <p>
            <b>Role:</b> {userData.role}
          </p>
        </div>
        <div className="profile-buttons">
          <button
            onClick={() => handleDelete(userData._id)}
            className="btn btn-delete"
          >
            Delete Profile
          </button>
          <Link to={`/userdetails/${userData._id}`}>
            <button className="btn btn-update">Update</button>
          </Link>
        </div>
      </div>
      {userData.role === "Customer" && (
        <div>
          <Home_footer />
        </div>
      )}
    </div>
  );
};

export default Profile;
