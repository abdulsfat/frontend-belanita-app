"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/_stores/authStore";

export default function GuestOnlyRoute({ children }) {
    const { token } = useAuthStore();
    const router = useRouter();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (token) {
            const storedUser = localStorage.getItem("user");
            const user = storedUser ? JSON.parse(storedUser) : null;
            const role = user?.role;

            router.replace(role === "admin" ? "/dashboard" : "/");
        } else {
            setChecking(false);
        }
    }, [token]);

    if (checking) return null;

    return children;
}
