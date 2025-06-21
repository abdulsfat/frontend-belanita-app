"use client";

import React, { useEffect } from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import ArticleTable from "@/app/_components/Admin/tables/article-tables/page";
import { useModal } from "@/app/_hooks/useModal";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";
import useArticleStore from "@/app/_stores/articleStore";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";
import CategoryTable from "@/app/_components/Admin/tables/CategoryTable";

export default function ListArticle() {
    const { fetchCategories } = useMerchandiseStore();
    const { token } = useAuthStore();
    const { showToast } = useToastStore();
    const { openModal } = useModal();

    useEffect(() => {
        fetchCategories()
    }, []);

    const openCreateModal = () => {
        openModal("CREATE_CATEGORY", {
            token,
            showToast,
        });
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Article Dashboard" />
            <div className="space-y-6">
                <ComponentCard
                    title="List Categories"
                    action="Create Categories"
                    onclick={openCreateModal}
                >
                    <CategoryTable />
                </ComponentCard>
            </div>
        </div>
    );
}
