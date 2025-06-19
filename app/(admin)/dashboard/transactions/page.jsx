"use client";

import React from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import TransactionTable from "@/app/_components/Admin/tables/transaction-tables/page";

export default function ListTransaction() {
    return (
        <div>
            <PageBreadcrumb pageTitle="Transactions Dashboard" />
            <div className="space-y-6">
                <ComponentCard
                    title="List Transactions"
                >
                    <TransactionTable />
                </ComponentCard>
            </div>
        </div>
    );
}
