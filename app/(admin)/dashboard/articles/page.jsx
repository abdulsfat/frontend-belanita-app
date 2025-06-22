"use client";

import React, { useEffect } from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import ArticleTable from "@/app/_components/Admin/tables/ArticleTable";
import { useModal } from "@/app/_hooks/useModal";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";
import useArticleStore from "@/app/_stores/articleStore";

export default function ListArticle() {
    const { fetchArticles } = useArticleStore();
    const { token } = useAuthStore();
    const { showToast } = useToastStore();
    const { openModal } = useModal();

    useEffect(() => {
        fetchArticles()
    }, []);

    const openCreateModal = () => {
        openModal("CREATE_ARTICLE", {
            token,
            showToast,
        });
    };

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
        </div>
    );
}
