"use client";

import React, {useEffect} from "react";
import UserMetaCard from "@/app/_components/Admin/user-profile/UserMetaCard";
import useAuthStore from "@/app/_stores/authStore";
import ComplaintTable from "@/app/_components/Admin/tables/complaint-tables/page";
import useComplaintStore from "@/app/_stores/complaintStore";

export default function Profile() {
    const { user, hydrated } = useAuthStore(); // ✅ cek hydrated
    const { fetchComplaints } = useComplaintStore();

    useEffect(() => {
        fetchComplaints()
    }, []);

    if (!hydrated) {
        return <div className="p-6">Loading...</div>;
    }

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
                            name={user.name}
                            address={user.address}
                            image={user.image}
                            role={user.role}
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
                {/*<div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">*/}
                {/*    <h3 className="mb-3 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-5">*/}
                {/*        Your Emergency call History*/}
                {/*    </h3>*/}
                {/*    <div className="space-y-6">*/}
                {/*        <EmergencyTable />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
