import { create } from "zustand";

const useToastStore = create((set) => ({
    toast: {
        isOpen: false,
        message: "",
        status: "",
    },
    showToast: (message, status = "success") =>
        set({
            toast: {
                isOpen: true,
                message,
                status,
            },
        }),
    hideToast: () =>
        set({
            toast: {
                isOpen: false,
                message: "",
                status: "",
            },
        }),
}));

export default useToastStore;
