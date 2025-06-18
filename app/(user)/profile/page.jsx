"use client";

import React, { useEffect, useState } from "react";
import UserMetaCard from "@/app/_components/Admin/user-profile/UserMetaCard";
import useAuthStore from "@/app/_stores/authStore";
import ComplaintTable from "@/app/_components/Admin/tables/complaint-tables/page";
import {
    getAllComplaints,
    getUserComplaints
} from "@/app/_services/complaintService";

export default function Profile() {
    const { user, token } = useAuthStore();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComplaints = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const data =
                user?.role === "admin"
                    ? await getAllComplaints(token)
                    : await getUserComplaints(token);

            setComplaints(data || []);
        } catch (error) {
            console.error("Failed fetching complaints:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComplaints();
    }, [token]);

    if (!user) {
        return (
            <div className="text-center text-red-600 py-10">
                Anda harus login terlebih dahulu untuk melihat profil.
            </div>
        );
    }

    return (
        <div className="mt-16">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
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
            {loading ? (
                <p className="text-center text-gray-500 mt-6">Memuat data pengaduan...</p>
            ) : (
                <ComplaintTable complaints={complaints} />
            )}
        </div>
    );
}
