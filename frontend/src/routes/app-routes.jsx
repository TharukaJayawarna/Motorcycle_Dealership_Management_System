import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Home,
  AdminDashboard,
  CustomerDashboard,
  Appointments,
  Services,
  ServiceListView,
} from "../pages";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-list" element={<ServiceListView />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
