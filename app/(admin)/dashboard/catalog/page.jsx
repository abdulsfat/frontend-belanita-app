"use client";

import React from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";


export default function ListUsers() {
    const { token } = useAuthStore();
    const { showToast } = useToastStore();

    return (
        <div>
            <PageBreadcrumb pageTitle="Catalog Dashboard" />
            <div className="space-y-6">
                <ComponentCard
                    title="List Catalog"
                >
                    {/*<MerchendiseTable />*/}
                </ComponentCard>
            </div>
        </div>
    );
}
