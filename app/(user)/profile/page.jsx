"use client";

import React, {useEffect} from "react";
import UserMetaCard from "@/app/_components/Admin/user-profile/UserMetaCard";
import useAuthStore from "@/app/_stores/authStore";
import ComplaintTable from "@/app/_components/Admin/tables/ComplaintTable";
import useComplaintStore from "@/app/_stores/complaintStore";
import useEmergencyStore from "@/app/_stores/emergencyStore";
import EmergencyTable from "@/app/_components/Admin/tables/EmergencyTable";
import TransactionTable from "@/app/_components/Admin/tables/TransactionTable";
import useTransactionStore from "@/app/_stores/transactionService";
import UserAmountCard from "@/app/_components/Admin/user-profile/UserAmountCard";

export default function Profile() {
    const { user } = useAuthStore();
    const { fetchComplaints } = useComplaintStore();
    const { fetchEmergencies } = useEmergencyStore();
    const { fetchTransaction } = useTransactionStore();

    useEffect(() => {
        fetchComplaints()
        fetchEmergencies()
        fetchTransaction()
    }, []);


    if (!user) {
        return (
            <div className="text-center text-red-600 py-10">
                Anda harus login terlebih dahulu untuk melihat profil.
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="mt-20 p-6">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                {/* Profile */}
                <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-5">
                        Your Profile
                    </h3>
                    <div className="space-y-6">
                        <UserMetaCard
                        />
                    </div>
                </div>

                <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-5">
                        Your Amount
                    </h3>
                    <div className="space-y-6">
                        <UserAmountCard
                        />
                    </div>
                </div>

                {/* Complaint */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-5">
                        Your Complaint
                    </h3>
                    <div className="space-y-6">
                        <ComplaintTable />
                    </div>
                </div>

                {/* Emergency */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-5">
                        Your Emergency call History
                    </h3>
                    <div className="space-y-6">
                        <EmergencyTable />
                    </div>
                </div>

                {/* Emergency */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                    <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-5">
                        Your Transaction History
                    </h3>
                    <div className="space-y-6">
                        <TransactionTable />
                    </div>
                </div>
            </div>
        </div>
    );
}
