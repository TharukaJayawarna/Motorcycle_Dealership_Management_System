import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AddUser from "./Components/AddUser/AddUser";
import Users from "./Components/UserDetails/Users";
import UpdateUser from "./Components/UpdateUser/UpdateUser";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import EmployeeDahsboard from "./Components/EmployeeDashboard/EmployeeDahsboard";
import ManagerDashboard from "./Components/ManagerDashboard/ManagerDashboard";
import Profile from "./Components/Profile/Profile";
import ResetPassword from "./Components/resetPassword/ResetPassword";
import OTP from "./Components/resetPassword/OTP";
import Admindashboard from "./Components/AdminDashboard/AdminDashboard"

function App() {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("jsonwebtoken") ? true : false;

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const AdminRoute = ({ children }) => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/adduser"
            element={
              <AdminRoute>
                <AddUser />
              </AdminRoute>
            }
          />
          <Route
            path="/userdetails"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />
          
          <Route path="/userdetails/:id" element={<UpdateUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/employeedashboard" element={<EmployeeDahsboard />} />
          <Route path="/managerdashboard" element={<ManagerDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otp-sent/:email" element={<OTP />} />
          <Route path="/AdminDashboard" element={<Admindashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
