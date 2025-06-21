"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useArticleStore from "@/app/_stores/articleStore";
import Label from "@/app/_components/Form/Label";
import CustomToast from "@/app/_components/Toast/CustomToast";
import Image from "next/image";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import { formatDate } from "@/app/_utils/dateFormatter";

export default function ArticleDetailViewOnly() {
    const { slug } = useParams();
    const router = useRouter();
    const { getArticleBySlug, fetchArticles } = useArticleStore();

    const [localArticle, setLocalArticle] = useState(null);

    useEffect(() => {
        const article = getArticleBySlug(slug);

        if (article) {
            setLocalArticle(article);
        } else {
            fetchArticles()
                .then(() => {
                    const refreshed = useArticleStore.getState().getArticleBySlug(slug);
                    if (refreshed) {
                        setLocalArticle(refreshed);
                    } else {
                        CustomToast.error("Artikel tidak ditemukan");
                    }
                })
                .catch(() => {
                    CustomToast.error("Gagal memuat artikel");
                });
        }
    }, [slug, getArticleBySlug, fetchArticles]);

    if (!localArticle) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="space-y-6">
            <ComponentCard
                action="Edit Article"
                onclick={() => router.push(`/dashboard/articles/edit/${localArticle.slug}`)}
                title="Detail Artikel"
            >
                <div className="mb-6">
                    <div className="relative w-full max-w-sm aspect-video rounded-lg overflow-hidden border">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${localArticle.image}`}
                            alt="Gambar Artikel"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <Label>Judul Artikel</Label>
                    <p className="mt-1 text-gray-800 dark:text-white">{localArticle.title}</p>
                </div>

                <div className="mb-4">
                    <Label>Status</Label>
                    <p className="mt-1 text-gray-800 dark:text-white capitalize">{localArticle.status}</p>
                </div>

                <div className="mb-4">
                    <Label>Konten</Label>
                    <p className="mt-1 text-gray-800 dark:text-white whitespace-pre-line">{localArticle.content}</p>
                </div>

                <div className="mb-4">
                    <Label>Penulis</Label>
                    <p className="mt-1 text-gray-800 dark:text-white">
                        {localArticle.user?.name || `ID ${localArticle.user_id}`}
                    </p>
                </div>

                <div>
                    <Label>Terakhir Diperbarui</Label>
                    <p className="mt-1 text-gray-800 dark:text-white">
                        {formatDate(localArticle.updated_at)}
                    </p>
                </div>
            </ComponentCard>
        </div>
    );
}
