import { create } from "zustand";
import { persist } from "zustand/middleware";


const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            setAuth: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: "auth-storage",
            getStorage: () => localStorage,
        }
    )
);
useAuthStore.persist = {
    ...useAuthStore.persist,
    hasHydrated: () => {
        try {
            return !!localStorage.getItem("auth-storage");
        } catch {
            return false;
        }
    },
};


export default useAuthStore;
