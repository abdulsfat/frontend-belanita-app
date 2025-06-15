"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/_stores/authStore";

export default function ProtectedRoute({ children }) {
    const { user, token } = useAuthStore();
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!token) {
            router.replace("/login");
        } else if (user?.role !== "admin") {
            router.replace("/not-found");
        } else {
            setChecking(false);
        }
    }, [token, user]);

    if (checking) return null;

    return children;
}
