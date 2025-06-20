import { create } from "zustand";

export const useModal = create((set) => ({
  isOpen: false,
  modalType: null,
  modalData: null,

  openModal: (type, data = null) =>
      set({ isOpen: true, modalType: type, modalData: data }),

  closeModal: () =>
      set({ isOpen: false, modalType: null, modalData: null }),
}));