"use client";

import React from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";
import UsersTable from "@/app/_components/Admin/tables/users-tables/page";

export default function ListUsers() {
    const { token } = useAuthStore();
    const { showToast } = useToastStore();

    return (
        <div>
            <PageBreadcrumb pageTitle="Users Dashboard" />
            <div className="space-y-6">
                <ComponentCard
                    title="List Users"
                >
                    <UsersTable />
                </ComponentCard>
            </div>
        </div>
    );
}
