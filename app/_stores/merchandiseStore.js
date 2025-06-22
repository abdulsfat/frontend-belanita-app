import { create } from "zustand";
import axios from "axios";
import {
    createCategory,
    createMerch,
    deleteCategoryById,
    deleteMerchById,
    getAllMerch,
    getCategories, updateCategory,
    updateMerch
} from "@/app/_services/merchService";

const useMerchandiseStore
    = create((set, get) => ({
    merchandises: [],
    categories: [],
    isLoading: false,

    setMerchandises: (data) => set({ merchandises: data || [] }),

    fetchMerchandises: async () => {
        set({ isLoading: true });
        try {
            const data = await getAllMerch();
            set({ merchandises: data || [] });
        } catch (error) {
            console.error("Gagal fetch merchandises:", error);
            set({ merchandises: [] });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchCategories: async () => {
        try {
            const data = await getCategories();
            set({ categories: data || [] });
        } catch (error) {
            console.error("Gagal fetch kategori:", error);
            set({ categories: [] });
        }
    },

    createMerchandise: async (formData) => {
        try {
            const newMerch = await createMerch(formData);
            set((state) => ({
                merchandises: [...state.merchandises, newMerch],
            }));
        } catch (error) {
            console.error("Gagal membuat merchandise:", error);
            throw error;
        }
    },

    createCategory: async (formData) => {
        try {
            const newCategory = await createCategory(formData);
            set((state) => ({
                categories: [...state.categories, newCategory],
            }));
        } catch (error) {
            console.error("Gagal membuat merchandise:", error);
            throw error;
        }
    },

    updateMerchandise: async (id, data) => {
        try {
            const response = await updateMerch(id, data);
            set((state) => ({
                merchandises: state.merchandises.map((a) =>
                    a.id === id ? response : a
                ),
            }));
        } catch (err) {
            console.error("Gagal update merchandise:", err);
            throw err;
        }
    },

    updateCategory: async (id, token, data) => {
        try {
            const response = await updateCategory(id, token, data); // Panggil service

            set((state) => ({
                categories: state.categories.map((a) =>
                    a.id === id ? response : a
                ),
            }));
        } catch (err) {
            console.error("Gagal update categories:", err);
            throw err;
        }
    },

    deleteMerchandise: async (id) => {
        try {
            await deleteMerchById(id);
            set((state) => ({
                merchandises: state.merchandises.filter((c) => c.id !== id),
            }));
        } catch (error) {
            console.error("Gagal hapus merchandises:", error);
            throw error;
        }
    },

    deleteCategories: async (id) => {
        try {
            await deleteCategoryById(id);
            set((state) => ({
                merchandises: state.merchandises.filter((c) => c.id !== id),
            }));
        } catch (error) {
            console.error("Gagal hapus merchandises:", error);
            throw error;
        }
    },

    getMerchBySlug: (slug) => {
        return get().merchandises.find((a) => a.slug === slug);
    },
}));

export default useMerchandiseStore;
