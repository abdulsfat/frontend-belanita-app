import { create } from "zustand";
import {getAllComplaints, deleteComplaintById} from "@/app/_services/complaintService";
import axios from "axios";

const useComplaintStore = create((set) => ({
    complaints: [],
    isLoading: false,

    setComplaints: (data) => set({ complaints: data || [] }),

    fetchComplaints: async () => {
        set({ isLoading: true });
        try {
            console.log("AXIOS DEFAULT HEADERS:", axios.defaults.headers.common);
            const data = await getAllComplaints();
            set({ complaints: data || [] });
        } catch (error) {
            console.error("Gagal fetch complaints:", error);
            set({ complaints: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteComplaint: async (id) => {
        try {
            await deleteComplaintById(id);
            set((state) => ({
                complaints: state.complaints.filter((c) => c.id !== id),
            }));
        } catch (error) {
            console.error("Gagal hapus complaint:", error);
            throw error;
        }
    },
}));

export default useComplaintStore;
