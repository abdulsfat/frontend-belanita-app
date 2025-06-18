'use client'

import AdminLayout from "@/app/_layout/AdminLayout";
import {ThemeProvider} from "@/app/_context/ThemeContext";
import {SidebarProvider} from "@/app/_context/SidebarContext";
import ProtectedRoute from "@/app/_middlewares/ProtectedRoute";
import React from "react";


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


