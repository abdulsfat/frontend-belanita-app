import { create } from "zustand";
import {
    getUserEmergencies,
    createEmergencyRequest,
    deleteEmergencyRequest,
    updateEmergencyStatus
} from "@/app/_services/emergencyService";

const useEmergencyStore = create((set) => ({
    emergencies: [],
    setEmergencies: (data) => set({ emergencies: data }),

    fetchEmergencies: async () => {
        set({ isLoading: true });
        try {
            const data = await getUserEmergencies();
            set({ emergencies: data });
        } catch (error) {
            console.error("Gagal fetch emergencies:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    addEmergency: async (payload) => {
        try {
            const newData = await createEmergencyRequest(payload);
            set((state) => ({
                emergencies: [newData, ...state.emergencies],
            }));
        } catch (error) {
            throw error;
        }
    },

    updateStatus: async (token, id, status) => {
        try {
            const updated = await updateEmergencyStatus(token, id, status);

            set((state) => ({
                emergencies: state.emergencies.map((e) =>
                    e.id === id ? { ...e, status: updated.status } : e
                ),
            }));
        } catch (error) {
            console.error("Gagal update status:", error);
            throw error;
        }
    },



    deleteEmergency: async (id) => {
        try {
            await deleteEmergencyRequest(id);
            set((state) => ({
                emergencies: state.emergencies.filter((e) => e.id !== id),
            }));
        } catch (error) {
            throw error;
        }
    },
}));

export default useEmergencyStore;
