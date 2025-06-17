"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/_stores/authStore";
import useHasHydrated from "@/app/_hooks/useHasHydrated";

export default function ProtectedRoute({ children }) {
    const { user, token, isLoggingOut, resetLogoutFlag } = useAuthStore();
    const router = useRouter();
    const hydrated = useHasHydrated();

    useEffect(() => {
        if (!hydrated) return;

        if (isLoggingOut) {
            resetLogoutFlag();
            return;
        }

        if (!token) {
            router.replace("/login");
        } else if (user?.role !== "admin") {
            router.replace("/not-found");
        }
    }, [hydrated, token, user, isLoggingOut]);

    if (!hydrated) return null;

    return children;
}
