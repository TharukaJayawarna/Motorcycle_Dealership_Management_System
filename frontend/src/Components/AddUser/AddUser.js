import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import AddUsers from "./AddUsers.css";
import NavigationBar from "../AdminNavigation/NavigationBar";
import Nav from "../Nav/Nav";

function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // Added role field
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    history("/userdetails");
  };

  const sendRequest = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/user/", {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
        role: inputs.role, // Include role in the request
      });
      history("/userdetails"); // Redirect to the user details page
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Nav />
      <NavigationBar />
      <div className="form-card">
        <h1 className="header">Add User</h1>
        <form onSubmit={handleSubmit}>
          <label>name</label>
          <br />
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={inputs.name}
            required
          />
          <br />
          <br />
          <label>email</label>
          <br />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={inputs.email}
            required
          />
          <br />
          <br />
          <label>password</label>
          <br />
          <input
            type="text"
            name="password"
            onChange={handleChange}
            value={inputs.password}
            required
          />
          <br />
          <br />
          <label>Role</label> {/* New field for selecting role */}
          <br />
          <select
            name="role"
            onChange={handleChange}
            value={inputs.role}
            required
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
            <option value="Customer">Customer</option>
          </select>
          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
