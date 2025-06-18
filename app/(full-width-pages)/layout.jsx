'use client'

import useToastStore from "@/app/_stores/toastStore";
import CustomToast from "@/app/_components/Toast/CustomToast";
import React from "react";

export default function FullWidthPageLayout({ children }) {
    const {toast, hideToast} = useToastStore();
    return (
        <div>
            <CustomToast
                isOpen={toast.isOpen}
                message={toast.message}
                status={toast.status}
                onClose={hideToast}
            />
            {children}
        </div>)
}
