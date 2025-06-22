import AdminLayout from "@/app/_layout/AdminLayout";
import {ThemeProvider} from "@/app/_context/ThemeContext";
import {SidebarProvider} from "@/app/_context/SidebarContext";
import React from "react";

export const metadata = {
    title: "Belanita • Championing Women’s Rights",
    description: "Empowering Voices, Ensuring Equality for a Just and Inclusive Future.",
};

export default function Layout({children}) {
    return (
            <ThemeProvider>
                <SidebarProvider>
                    <AdminLayout>{children}</AdminLayout>
                </SidebarProvider>
            </ThemeProvider>
    );
}


