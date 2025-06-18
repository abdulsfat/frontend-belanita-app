"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/_stores/authStore";

export default function ProtectedRoute({ children }) {
    const { token, user } = useAuthStore();
    const router = useRouter();
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        const waitHydration = async () => {
            if (useAuthStore.persist.hasHydrated()) {
                setHydrated(true);
            } else {
                const intv = setInterval(() => {
                    if (useAuthStore.persist.hasHydrated()) {
                        clearInterval(intv);
                        setHydrated(true);
                    }
                }, 50);
            }
        };

        waitHydration();
    }, []);

    useEffect(() => {
        if (!hydrated) return;

        if (!token) {
            router.replace("/login");
        } else if (user?.role !== "admin") {
            router.replace("/not-found");
        }
    }, [hydrated, token, user]);

    if (!hydrated) return null;

    return children;
}
