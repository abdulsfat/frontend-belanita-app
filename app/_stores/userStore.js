import { create } from "zustand";
import { updateArticle} from "@/app/_services/articleService";
import {deleteUser, getAllUsers, updateProfile} from "@/app/_services/userService";
import useAuthStore from "@/app/_stores/authStore";

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


    // createUsers: async (formData) => {
    //     try {
    //         const newArticle = await createUsers(formData);
    //         set((state) => ({
    //             users: [...state.users, newArticle],
    //         }));
    //     } catch (error) {
    //         console.error("Gagal membuat users:", error);
    //         throw error;
    //     }
    // },

    updateUser: async (token, formData) => {
        try {
            const response = await updateProfile(token, formData);
            return response; // langsung return user updated (bukan update array `users`)
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
