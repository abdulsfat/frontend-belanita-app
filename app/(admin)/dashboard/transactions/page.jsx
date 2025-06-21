"use client";

import React, {useEffect} from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import TransactionTable from "@/app/_components/Admin/tables/transaction-tables/page";
import useTransactionStore from "@/app/_stores/transactionService";


export default function ListTransaction() {
    const { fetchTransaction } = useTransactionStore();

    useEffect(() => {
        fetchTransaction()
    }, []);

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
