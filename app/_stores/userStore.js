import { create } from "zustand";
import {deleteUser, getAllUsers, updateProfile} from "@/app/_services/userService";

const useUsersStore = create((set, get) => ({
    users: [],
    isLoading: false,

    setUsers: (data) => set({ users: data || [] }),

    fetchUsers: async () => {
        set({ isLoading: true });
        try {
            const data = await getAllUsers();
            set({ users: data || [] });
        } catch (error) {
            console.error("Gagal fetch users:", error);
            set({ users: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    updateUser: async (token, formData) => {
        try {
            const response = await updateProfile(token, formData);
            return response;
        } catch (err) {
            console.error("Gagal update profile:", err);
            throw err;
        }
    },

    deleteuser: async (id) => {
        try {
            await deleteUser(id);
            set((state) => ({
                users: state.users.filter((c) => c.id !== id),
            }));
        } catch (error) {
            console.error("Gagal hapus users:", error);
            throw error;
        }
    },

    getArticleBySlug: (slug) => {
        return get().users.find((a) => a.slug === slug);
    },
}));

export default useUsersStore;
