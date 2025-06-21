import { create } from "zustand";
import {
    getAllComplaints,
    deleteComplaintById,
    submitFeedback
} from "@/app/_services/complaintService";
import axios from "axios";
import * as complaintService from "@/app/_services/complaintService";

const useComplaintStore = create((set, get) => ({
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
            console.log("🔄 Update status:", { complaint_id: complaintId, status });
            const res = await complaintService.updateComplaintStatus(token, complaintId, status);
            console.log("✅ Status updated:", res);
            return res;
        } catch (error) {
            console.error("❌ Gagal update status:", error);
            throw error;
        }
    }


}));

export default useComplaintStore;
