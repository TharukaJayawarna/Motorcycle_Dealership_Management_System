import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Components/pages/Home12';
// import Register12 from './Components/pages/Register12';
// import Login12 from './Components/pages/Login12';
import Profile12 from './Components/pages/Profile12';
import Dashboard from './Components/pages/Dashboard';
import Suppliers from './Components/pages/Suppliers';
import Notification from './Components/pages/Notification';
import Report from './Components/pages/Report';
// import Logout from './Components/pages/Logout12';
import Avalibility from './Components/pages/Avalibility/Avalibilitylist';  
import Register12 from './Components/pages/Register12';
import Login12 from './Components/pages/Login12';
import Logout12 from './Components/pages/Logout12';


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register12" element={<Register12 />} />
      <Route path="/login12" element={<Login12 />} />
      <Route path="/profile12" element={<Profile12 />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/notification" element={<Notification />} />
       <Route path="/report" element={<Report />} />
      <Route path="/logout12" element={<Logout12 />} />
      <Route path="/availability" element={<Avalibility />} /> 

    </Routes>
  );
}

