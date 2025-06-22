"use client";

import { motion, AnimatePresence } from "framer-motion";
import useConfirmStore from "@/app/_stores/confirmStore";
import { XCircle } from "lucide-react"; // bisa ganti icon

export default function ConfirmDialog() {
    const { isOpen, title, message, icon: Icon, onConfirm, onCancel, closeConfirm } =
        useConfirmStore();

    const handleYes = () => {
        onConfirm?.();
        closeConfirm();
    };

    const handleNo = () => {
        onCancel?.();
        closeConfirm();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-[90%] max-w-sm text-center shadow-xl"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                    >
                        {Icon ? (
                            <div className="flex justify-center text-red-500 mb-2">
                                <Icon size={40} />
                            </div>
                        ) : (
                            <div className="flex justify-center text-red-500 mb-2">
                                <XCircle size={40} />
                            </div>
                        )}
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                            {title}
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">{message}</p>
                        <div className="mt-5 flex justify-center gap-3">
                            <button
                                onClick={handleNo}
                                className="px-4 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white rounded-md"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleYes}
                                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md"
                            >
                                Hapus
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
