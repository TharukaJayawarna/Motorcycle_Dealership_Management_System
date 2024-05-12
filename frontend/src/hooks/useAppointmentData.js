import { useQuery } from "@tanstack/react-query";
import AppointmentAPI from "../api/AppointmentAPI";

export const useAppointmentData = () => {
  return useQuery(["appointments"], () => AppointmentAPI.getAll());
};

export const useCustomerAppointmentData = () => {
  return useQuery(["customerAppointments"], () =>
    AppointmentAPI.getCustomerAppointments()
  );
};

export const useTotalEarningsData = () => {
  return useQuery(["totalEarnings"], () => AppointmentAPI.getTotalEarnings());
};

export const useAppointmentsCountByStatusData = () => {
  return useQuery(["appointmentsCountByStatus"], () =>
    AppointmentAPI.getAppointmentsCountByStatus()
  );
};