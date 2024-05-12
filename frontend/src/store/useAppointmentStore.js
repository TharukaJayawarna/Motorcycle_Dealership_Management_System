import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  appointments: [],
  selectedAppointment: null,
  isAddAppointmentModalOpen: false,
  isEditAppointmentModalOpen: false,
  isViewAppointmentModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setAppointments: (appointments) => set({ appointments }),
  setSelectedAppointment: (appointment) =>
    set({ selectedAppointment: appointment }),
  openAddAppointmentModal: () => set({ isAddAppointmentModalOpen: true }),
  closeAddAppointmentModal: () => set({ isAddAppointmentModalOpen: false }),
  openEditAppointmentModal: () => set({ isEditAppointmentModalOpen: true }),
  closeEditAppointmentModal: () => set({ isEditAppointmentModalOpen: false }),
  openViewAppointmentModal: () => set({ isViewAppointmentModalOpen: true }),
  closeViewAppointmentModal: () => set({ isViewAppointmentModalOpen: false }),
});

export const useAppointmentStore = create(devtools(store, "appointmentStore"));
