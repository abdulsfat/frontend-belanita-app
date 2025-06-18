"use client";

import React from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import ArticleTable from "@/app/_components/Admin/tables/article-tables/page";
import { useModal } from "@/app/_hooks/useModal";
import CreateArticleModal from "@/app/_components/modal/create-article/page";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";
import UsersTable from "@/app/_components/Admin/tables/article-tables/page";

export default function ListUsers() {
    const { token } = useAuthStore();
    const { showToast } = useToastStore();

    return (
        <div>
            <PageBreadcrumb pageTitle="Emergency Dashboard" />
            <div className="space-y-6">
                <ComponentCard
                    title="List Emergency"
                >
                    <UsersTable />
                </ComponentCard>
            </div>
        </div>
    );
}
