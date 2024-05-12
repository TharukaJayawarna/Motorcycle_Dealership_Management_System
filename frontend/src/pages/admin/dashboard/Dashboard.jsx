import React from "react";
import {
  useAppointmentsCountByStatusData,
  useTotalEarningsData,
} from "../../../hooks/useAppointmentData";
import { useServiceData } from "../../../hooks/useServiceData";
import { Link } from "react-router-dom";

const Index = () => {
  // Get the data from the react-query hook
  const { data: appointmentData } = useAppointmentsCountByStatusData(); //["pending", "confirmed", "rescheduled", "rejected"]
  const { data: services } = useServiceData();
  const { data: earnings } = useTotalEarningsData();
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
              <Link to="/services" className="btn btn-primary">
                <h5 className="card-title">🛠️ Services</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h2 className="mb-3">Earnings</h2>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body" style={{ backgroundColor: "#b9f2ff" }}>
              <h5 className="card-title">💰 Total Earnings</h5>
              <p className="card-text fs-4 fw-bold">
                Rs.{(earnings && earnings?.data?.totalEarnings[0]?.total) || 0}
                /=
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <h2 className="mb-3">Appointments</h2>
        {appointmentData &&
          appointmentData.data.appointmentsCount.map((appointment) => (
            <div key={appointment._id} className="col-md-3 mb-4">
              <div className="card text-center h-100">
                <div className="card-body" style={{ backgroundColor: "#b9f2ff" }}>
                  <h5 className="card-title">
                    {appointment._id.charAt(0).toUpperCase() +
                      appointment._id.slice(1)}{" "}
                  </h5>
                  <p className="card-text fs-4 fw-bold">{appointment.count}</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="row">
        <h2 className="mb-3">Services</h2>
        <div className="col-md-3 mb-4">
          <div className="card text-center h-100">
            <div className="card-body" style={{ backgroundColor: "#b9f2ff" }}>
              <h5 className="card-title">🛠️ Total Services</h5>
              <p className="card-text fs-4 fw-bold">
                {services && services.data.services.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

