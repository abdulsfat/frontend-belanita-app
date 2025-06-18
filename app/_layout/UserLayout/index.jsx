"use client";

import { Header } from "@/app/_components";
import React, { useEffect } from "react";
import useAuthStore from "@/app/_stores/authStore";
import Footer from "@/app/_components/Footer";
import CustomToast from "@/app/_components/Toast/CustomToast";
import useToastStore from "@/app/_stores/toastStore";

export const UserLayout = ({ children }) => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const { toast, hideToast } = useToastStore();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (token) setAuth(user, token);
    }, []);

    return (
        <div>
            <CustomToast
                isOpen={toast.isOpen}
                message={toast.message}
                status={toast.status}
                onClose={hideToast}
            />
            <Header />
            <main>{children}</main>
             <Footer />
        </div>
    );
};
