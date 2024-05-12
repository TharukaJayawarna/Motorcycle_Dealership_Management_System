import api from "./api";

class AppointmentAPI {
  // Create Appointment
  static create(values) {
    return api.post("/api/appointments", values);
  }

  // Get all Appointments
  static getAll() {
    return api.get("/api/appointments");
  }

  // Get Appointment by id
  static getById(id) {
    return api.get(`/api/appointments/${id}`);
  }

  // Update Appointment
  static update(values) {
    const { id, data } = values;
    return api.patch(`/api/appointments/${id}`, data);
  }

  // Delete Appointment
  static delete(id) {
    return api.delete(`/api/appointments/${id}`);
  }

  // Get Customer Appointments
  static getCustomerAppointments() {
    return api.get("/api/appointments/customer");
  }

  // Get Total Earnings
  static getTotalEarnings() {
    return api.get("/api/appointments/earnings");
  }

  // Get Appointments Count by Status
  static getAppointmentsCountByStatus() {
    return api.get("/api/appointments/count");
  }
}

export default AppointmentAPI;
