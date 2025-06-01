"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/_stores/authStore";

export default function ProtectedRoute({ children }) {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);

    useEffect(() => {
        if (!token) {
            router.replace("/login");
        }
    }, [token]);

    return token ? children : null;
}
