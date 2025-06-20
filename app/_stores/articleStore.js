import { create } from "zustand";

const useArticleStore = create((set) => ({
    articles: [],
    setArticles: (data) => set({ articles: data }),
    addArticle: (newArticle) =>
        set((state) => ({
            articles: [newArticle, ...state.articles],
        })),
    removeArticle: (id) =>
        set((state) => ({
            articles: state.articles.filter((a) => a.id !== id),
        })),
}));

export default useArticleStore;
