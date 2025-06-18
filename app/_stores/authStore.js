import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_BACKEND_URL;

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            setAuth: (user, token) => {
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                set({ user, token });
            },
            logout: () => {
                delete axios.defaults.headers.common["Authorization"];
                set({ user: null, token: null });
            },
            refreshUserProfile: async () => {
                try {
                    const token = get().token;
                    if (!token) return;

                    const res = await axios.get(`${API_URL}/me`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    set({ user: res.data.data });
                    console.log("User profile fetched:", res.data.data);
                } catch (error) {
                    console.error("Failed to refresh user profile", error);
                }
            },
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
