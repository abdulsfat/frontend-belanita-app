import { create } from "zustand";
import axios from "axios";
import {createArticles, deleteArticleById, getAllArticles, updateArticle} from "@/app/_services/articleService";

const useArticleStore = create((set, get) => ({
    articles: [],
    isLoading: false,

    setArticles: (data) => set({ articles: data || [] }),

    fetchArticles: async () => {
        set({ isLoading: true });
        try {
            console.log("AXIOS DEFAULT HEADERS:", axios.defaults.headers.common);
            const data = await getAllArticles();
            set({ articles: data || [] });
        } catch (error) {
            console.error("Gagal fetch articles:", error);
            set({ articles: [] });
        } finally {
            set({ isLoading: false });
        }
    },


    createArticle: async (formData) => {
        try {
            const newArticle = await createArticles(formData);
            set((state) => ({
                articles: [...state.articles, newArticle],
            }));
        } catch (error) {
            console.error("Gagal membuat articles:", error);
            throw error;
        }
    },

    updateArticle: async (slug, token, formData) => {
        try {
            const response = await updateArticle(slug, token, formData);
            set((state) => ({
                articles: state.articles.map((a) =>
                    a.slug === slug ? response : a
                ),
            }));
        } catch (err) {
            console.error("Gagal update artikel:", err);
            throw err;
        }
    },

    deleteArticle: async (id) => {
        try {
            await deleteArticleById(id);
            set((state) => ({
                articles: state.articles.filter((c) => c.id !== id),
            }));
        } catch (error) {
            console.error("Gagal hapus articles:", error);
            throw error;
        }
    },

    getArticleBySlug: (slug) => {
        return get().articles.find((a) => a.slug === slug);
    },
}));

export default useArticleStore;
