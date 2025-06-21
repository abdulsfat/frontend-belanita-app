"use client";

import React, {useEffect} from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import useEmergencyStore from "@/app/_stores/emergencyStore";
import EmergencyTable from "@/app/_components/Admin/tables/emergency";

export default function ListComplaint() {
    const { fetchEmergencies } = useEmergencyStore();

    useEffect(() => {
        fetchEmergencies()
    }, []);

    return (
        <div>
            <PageBreadcrumb pageTitle="Pengaduan Dashboard" />
            <div className="space-y-6">
                <ComponentCard
                    title="List Emergency Calls"
                >
                    <EmergencyTable />
                </ComponentCard>
            </div>
        </div>
    );
}
