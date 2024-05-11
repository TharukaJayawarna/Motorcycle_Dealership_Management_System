import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Components/pages/Home';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login';
import Profile from './Components/pages/Profile';
import Dashboard from './Components/pages/Dashboard';
import Suppliers from './Components/pages/Suppliers';
import Notification from './Components/pages/Notification';
import Report from './Components/pages/Report';
import Logout from './Components/pages/Logout';
import Avalibility from './Components/pages/Avalibility/Avalibilitylist'; // Import the Availability page



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/notification" element={<Notification />} />
       <Route path="/report" element={<Report />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/availability" element={<Avalibility />} /> 

    </Routes>
  );
}

