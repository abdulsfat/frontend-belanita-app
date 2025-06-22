import { create } from "zustand";

const useConfirmStore = create((set) => ({
    isOpen: false,
    message: '',
    title: 'Konfirmasi',
    icon: null,
    onConfirm: null,
    onCancel: null,

    showConfirm: ({ message, title = 'Konfirmasi', icon = null, onConfirm, onCancel }) =>
        set({ isOpen: true, message, title, icon, onConfirm, onCancel }),

    closeConfirm: () => set({ isOpen: false }),
}));

export default useConfirmStore;
