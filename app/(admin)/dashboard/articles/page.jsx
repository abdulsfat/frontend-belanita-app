"use client";

import React from "react";
import PageBreadcrumb from "@/app/_components/Admin/common/PageBreadCrumb";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import ArticleTable from "@/app/_components/Admin/tables/article-tables/page";
import { useModal } from "@/app/_hooks/useModal";
import CreateArticleModal from "@/app/_components/Admin/modal/create-article/page";
import useAuthStore from "@/app/_stores/authStore";
import {createArticles} from "@/app/_services/articleService";

export default function ArticleTables() {
    const { isOpen, openModal, closeModal } = useModal();
    const { token } = useAuthStore(); // ambil token login

    const openCreateModal = () => {
        openModal();
    };

    const handleSave = async (formData) => {
        try {
            const payload = new FormData();
            payload.append("title", formData.title);
            payload.append("content", formData.content);
            payload.append("status", formData.status);
            if (formData.image) {
                payload.append("image", formData.image);
            }

            await createArticles(token, payload);
            alert("Artikel berhasil dibuat!");
            closeModal();
        } catch (error) {
            console.error("Gagal menyimpan artikel:", error);
            alert("Terjadi kesalahan saat membuat artikel.");
        }
    };

    return (
        <div>
            <PageBreadcrumb pageTitle="Article" />
            <div className="space-y-6">
                <ComponentCard
                    title="List Articles"
                    create="Create Article"
                    onclick={openCreateModal}
                >
                    <ArticleTable />
                </ComponentCard>
            </div>
            <CreateArticleModal
                isOpen={isOpen}
                onClose={closeModal}
                onSave={handleSave}
            />
        </div>
    );
}
