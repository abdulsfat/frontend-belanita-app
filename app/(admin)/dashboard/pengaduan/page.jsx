"use client";

import React from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import ComplaintTable from "@/app/_components/Admin/tables/complaint-tables/page";

export default function ListComplaint() {
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
