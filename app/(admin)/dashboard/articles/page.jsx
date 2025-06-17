"use client";

import React from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import ArticleTable from "@/app/_components/Admin/tables/article-tables/page";
import { useModal } from "@/app/_hooks/useModal";
import CreateArticleModal from "@/app/_components/modal/create-article/page";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";

export default function ListArticle() {
    const { isOpen, openModal, closeModal } = useModal();
    const { token } = useAuthStore();
    const { showToast } = useToastStore();

    const openCreateModal = () => openModal();

    return (
        <div>
            <PageBreadcrumb pageTitle="Article Dashboard" />
            <div className="space-y-6">
                <ComponentCard
                    title="List Articles"
                    action="Create Article"
                    onclick={openCreateModal}
                >
                    <ArticleTable />
                </ComponentCard>
            </div>
            <CreateArticleModal
                isOpen={isOpen}
                onClose={closeModal}
                token={token}
                showToast={showToast}
            />
        </div>
    );
}
