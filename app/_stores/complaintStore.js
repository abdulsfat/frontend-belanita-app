import { create } from "zustand";
import {
    getAllComplaints,
    deleteComplaintById,
    submitFeedback, createComplaint
} from "@/app/_services/complaintService";
import * as complaintService from "@/app/_services/complaintService";

const useComplaintStore = create((set, get) => ({
    complaints: [],
    isLoading: false,

    setComplaints: (data) => set({ complaints: data || [] }),

    fetchComplaints: async () => {
        set({ isLoading: true });
        try {
            const data = await getAllComplaints();
            set({ complaints: data || [] });
        } catch (error) {
            console.error("Gagal fetch complaints:", error);
            set({ complaints: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    createComplaint: async (token, formData) => {
        try {
            const newComplaint = await createComplaint(token, formData);
            set((state) => ({
                complaints: [...state.complaints, newComplaint],
            }));
        } catch (error) {
            console.error("Gagal membuat complaint:", error);
            throw error;
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

    getComplaintById: (id) => {
        return get().complaints.find((c) => c.id === parseInt(id));
    },

    submitFeedback: async (complaintId, token, message) => {
        try {
            const feedback = await submitFeedback(token, {
                complaint_id: complaintId,
                message,
            });

            set((state) => ({
                complaints: state.complaints.map((c) =>
                    c.id === complaintId
                        ? { ...c, feedbacks: [...(c.feedbacks || []), feedback] }
                        : c
                ),
            }));

            return feedback;
        } catch (error) {
            console.error("Gagal mengirim feedback:", error);
            throw error;
        }
    },

    updateStatus: async (token, complaintId, status) => {
        try {
            const res = await complaintService.updateComplaintStatus(token, complaintId, status);
            return res;
        } catch (error) {
            console.error("Gagal update status:", error);
            throw error;
        }
    }


}));

export default useComplaintStore;
