import React from "react";
import { useCustomerAppointmentData } from "../../../hooks/useAppointmentData";
import { Link } from "react-router-dom";

const Index = () => {
  // Get the data from the react-query hook
  const { data: appointmentData } = useCustomerAppointmentData(); //["pending", "confirmed", "rescheduled", "rejected"]
  //
  return (
    <div className="container mt-4">
      <div className="row">
        <h2 className="mb-3">Links</h2>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body" style={{ backgroundColor: "#b9f2ff" }}>
              <Link to="/appointments" className="btn btn-primary">
                <h5 className="card-title">📅 Appointments</h5>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body" style={{ backgroundColor: "#b9f2ff" }}>
              <Link to="/service-list" className="btn btn-primary">
                <h5 className="card-title">🛠️ Services</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h2 className="mb-3">Appointments</h2>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body" style={{ backgroundColor: "#b9f2ff" }}>
              <h5 className="card-title">🛠️ My Appointments</h5>
              <p className="card-text fs-4 fw-bold">
                {appointmentData && appointmentData.data.appointments.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

