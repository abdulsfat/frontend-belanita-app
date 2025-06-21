"use client";

import React, {useEffect} from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import ComplaintTable from "@/app/_components/Admin/tables/complaint-tables/page";
import useComplaintStore from "@/app/_stores/complaintStore";

export default function ListComplaint() {
    const { fetchComplaints } = useComplaintStore();

    useEffect(() => {
        fetchComplaints()
    }, []);

    return (
        <div>
            <PageBreadcrumb pageTitle="Pengaduan Dashboard" />
            <div className="space-y-6">
                <ComponentCard
                    title="List Pengaduan"
                >
                    <ComplaintTable/>
                </ComponentCard>
            </div>
        </div>
    );
}
