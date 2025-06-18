"use client";
import React, {useEffect} from "react";
import { useSidebar } from "@/app/_context/SidebarContext";
import AppSidebar from "@/app/_components/Admin/layout/AppSidebar";
import Backdrop from "@/app/_components/Admin/layout/Backdrop";
import AppHeader from "@/app/_components/Admin/layout/AppHeader";
import CustomToast from "@/app/_components/Toast/CustomToast";
import useToastStore from "@/app/_stores/toastStore";
import {restoreAuth} from "@/app/_services/authService";
import {getModalComponent} from "@/data";
import {useModal} from "@/app/_hooks/useModal";
import useAuthStore from "@/app/_stores/authStore";


export default function AdminLayout({ children }) {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();
    const {toast, hideToast} = useToastStore();
    const { isOpen, modalType, closeModal } = useModal();
    const { token } = useAuthStore();
    const { showToast } = useToastStore();
    const mainContentMargin = isMobileOpen
        ? "ml-0"
        : isExpanded || isHovered
            ? "lg:ml-[290px]"
            : "lg:ml-[90px]";

    useEffect(() => {
        restoreAuth();
    }, []);
    return (
        <div className="min-h-screen xl:flex dark:bg-gray-900">
            <CustomToast
                isOpen={toast.isOpen}
                message={toast.message}
                status={toast.status}
                onClose={hideToast}
            />
            <AppSidebar />
            <Backdrop />
            <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
                <AppHeader />
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
            </div>
            {isOpen &&
                getModalComponent(modalType, {
                    isOpen,
                    onClose: closeModal,
                    token,
                    showToast,
                })}
        </div>
    );
}
