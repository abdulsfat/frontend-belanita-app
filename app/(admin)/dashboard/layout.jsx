'use client'

import AdminLayout from "@/app/_layout/AdminLayout";
import {ThemeProvider} from "@/app/_context/ThemeContext";
import {SidebarProvider} from "@/app/_context/SidebarContext";
import React from "react";


export default function Layout({children}) {
    return (
            <ThemeProvider>
                <SidebarProvider>
                    <AdminLayout>{children}</AdminLayout>
                </SidebarProvider>
            </ThemeProvider>
    );
}


