"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/app/_stores/authStore";

export default function GuestOnlyRoute({ children }) {
    const { token } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (token) {
            router.replace("/");
        }
    }, [token]);

    return token ? null : children;
}
