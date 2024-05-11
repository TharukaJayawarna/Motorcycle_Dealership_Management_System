import { create } from "zustand";
import { devtools } from "zustand/middleware";

const initialState = {
  services: [],
  selectedService: null,
  isAddServiceModalOpen: false,
  isEditServiceModalOpen: false,
};

const store = (set) => ({
  ...initialState,
  setServices: (services) => set({ services }),
  setSelectedService: (service) => set({ selectedService: service }),
  openAddServiceModal: () => set({ isAddServiceModalOpen: true }),
  closeAddServiceModal: () => set({ isAddServiceModalOpen: false }),
  openEditServiceModal: () => set({ isEditServiceModalOpen: true }),
  closeEditServiceModal: () => set({ isEditServiceModalOpen: false }),
});

export const useServiceStore = create(devtools(store, "serviceStore"));
