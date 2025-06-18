"use client";

import { useEffect } from "react";
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

export default function CustomToast({ message, isOpen, onClose, status }) {
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(onClose, 2000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const statusColors = {
        success: "bg-green-600",
        error: "bg-red-700",
        warning: "bg-yellow-600",
        info: "bg-blue-600",
    };

    const statusIcons = {
        success: <CheckCircle className="w-5 h-5 shrink-0" />,
        error: <XCircle className="w-5 h-5 shrink-0" />,
        warning: <AlertTriangle className="w-5 h-5 shrink-0" />,
        info: <Info className="w-5 h-5 shrink-0" />,
    };

    const bgColor = statusColors[status] || "bg-gray-800";
    const Icon = statusIcons[status] || <Info className="w-5 h-5 shrink-0" />;

    return (
        <div
            className={`fixed top-6 left-1/2 z-[99999] transform -translate-x-1/2 transition-all duration-300 ${
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
            }`}
        >
            <div className={`relative ${bgColor} text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3`}>
                {Icon}
                <span className="text-sm font-medium pe-5">{message}</span>

                <button
                    onClick={onClose}
                    className="absolute right-5 text-white hover:text-gray-300 transition"
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
