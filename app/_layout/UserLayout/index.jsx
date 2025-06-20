"use client";

import { Header } from "@/app/_components";
import React, { useEffect } from "react";
import useAuthStore from "@/app/_stores/authStore";
import Footer from "@/app/_components/Footer";
import CustomToast from "@/app/_components/Toast/CustomToast";
import useToastStore from "@/app/_stores/toastStore";
import {useModal} from "@/app/_hooks/useModal";
import {getModalComponent} from "@/data";

export const UserLayout = ({ children }) => {
    const { toast, hideToast } = useToastStore();
    const { isOpen, modalType, modalData, closeModal } = useModal();
    const { token } = useAuthStore();
    const { showToast } = useToastStore();

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
            {isOpen &&
                getModalComponent(modalType, {
                    isOpen,
                    onClose: closeModal,
                    ...modalData,
                    token,
                    showToast,
                })}
        </div>
    );
};
