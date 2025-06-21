"use client";

import React, {useEffect} from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import { useModal } from "@/app/_hooks/useModal";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";
import MerchandiseTable from "@/app/_components/Admin/tables/MerchandiseTabel";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";

export default function ListMerchandise() {
    const { fetchMerchandises } = useMerchandiseStore();
    const { token } = useAuthStore();
    const { showToast } = useToastStore();
    const { openModal } = useModal();

    useEffect(() => {
        fetchMerchandises()
    }, []);

    const openCreateModal = () => {
        openModal("CREATE_MERCH", {
            token,
            showToast,
        });
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Merchandise Dashboard" />
            <div className="space-y-6">
                <ComponentCard
                    title="List Merchandise"
                    action="Create Merchandise"
                    onclick={openCreateModal}
                >
                    <MerchandiseTable />
                </ComponentCard>
            </div>
        </div>
    );
}