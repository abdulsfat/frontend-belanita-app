'use client'

import AdminLayout from "@/app/_layout/AdminLayout";
import {ThemeProvider} from "@/app/_context/ThemeContext";
import {SidebarProvider} from "@/app/_context/SidebarContext";
import ProtectedRoute from "@/app/_middlewares/ProtectedRoute";
import CustomToast from "@/app/_components/Toast/CustomToast";
import React from "react";
import useToastStore from "@/app/_stores/toastStore";


export default function Layout({children}) {
    return (
        <ProtectedRoute>
            <ThemeProvider>
                <SidebarProvider>
                    <AdminLayout>{children}</AdminLayout>
                </SidebarProvider>
            </ThemeProvider>
        </ProtectedRoute>
    );
}


