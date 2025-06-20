"use client";

import React from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import { useModal } from "@/app/_hooks/useModal";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";
import MerchandiseTable from "@/app/_components/Admin/tables/merchandise-tables/page";
import CreateMerchandiseModal from "@/app/_components/modal/create-merchandise/page";

export default function ListMerchandise() {
    const { isOpen, openModal, closeModal } = useModal();
    const { token } = useAuthStore();
    const { showToast } = useToastStore();

    const openCreateModal = () => openModal();

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
            <CreateMerchandiseModal
                isOpen={isOpen}
                onClose={closeModal}
                token={token}
                showToast={showToast}
            />
        </div>
    );
}