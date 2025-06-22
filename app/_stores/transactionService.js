import { create } from "zustand";

import {deleteTransaction, getAllTransaction, updateTransactionStatus} from "@/app/_services/transactionService";

const useTransactionStore = create((set) => ({
    transactions: [],
    setTransaction: (data) => set({ transactions: data }),

    fetchTransaction: async () => {
        set({ isLoading: true });
        try {
            const data = await getAllTransaction();
            set({ transactions: data });
        } catch (error) {
            console.error("Gagal fetch transactions:", error);
        } finally {
            set({ isLoading: false });
        }
    },


    updateStatus: async (token, id, status) => {
        try {
            const updated = await updateTransactionStatus(token, id, status);

            set((state) => ({
                transactions: state.transactions.map((e) =>
                    e.id === id ? { ...e, status: updated.status } : e
                ),
            }));
        } catch (error) {
            console.error("Gagal update status:", error);
            throw error;
        }
    },

    deleteTransaction: async (id) => {
        try {
            await deleteTransaction(id);
            set((state) => ({
                transactions: state.transactions.filter((e) => e.id !== id),
            }));
        } catch (error) {
            throw error;
        }
    },

}));

export default useTransactionStore;
