"use client";

import React, { useEffect, useState } from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import ArticleTable from "@/app/_components/Admin/tables/article-tables/page";
import { useModal } from "@/app/_hooks/useModal";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";
import { getArticles } from "@/app/_services/articleService";
import useArticleStore from "@/app/_stores/articleStore";

export default function ListArticle() {
    const { articles, setArticles } = useArticleStore();
    const { token } = useAuthStore();
    const { showToast } = useToastStore();
    const { openModal } = useModal();

    useEffect(() => {
        const fetch = async () => {
            const data = await getArticles();
            setArticles(data);
        };
        fetch();
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
