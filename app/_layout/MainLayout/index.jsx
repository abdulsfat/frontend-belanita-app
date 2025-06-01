"use client";

import { Header } from "@/app/_components";
import React, { useEffect } from "react";
import useAuthStore from "@/app/_stores/authStore";

export const MainLayout = ({ children }) => {
    const setAuth = useAuthStore((state) => state.setAuth);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));
        if (token) setAuth(user, token);
    }, []);

    return (
        <div>
            <Header />
            <main>{children}</main>
            {/* <Footer /> */}
        </div>
    );
};
