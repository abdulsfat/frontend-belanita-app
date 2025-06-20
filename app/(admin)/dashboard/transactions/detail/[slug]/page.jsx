"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDetailArticles } from "@/app/_services/articleService";
import Label from "@/app/_components/Form/Label";
import CustomToast from "@/app/_components/Toast/CustomToast";
import Image from "next/image";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import {formatDate} from "@/app/_utils/dateFormatter";


export default function TransactionDetailViewOnly() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchArticle() {
            try {
                const result = await getDetailArticles(slug);
                setArticle(result);
            } catch (error) {
                CustomToast.error("Gagal memuat artikel");
            }
        }

        if (slug) fetchArticle();
    }, [slug]);

    if (!article) return <div className="py-20 text-center">Loading...</div>;

    return (
        <div className="space-y-6">
            <ComponentCard
                action="Edit Article"
                onclick={() => router.push(`/dashboard/articles/edit/${article.slug}`)}
                title="Detail Artikel"
            >
                {/* Gambar */}
                <div className="mb-6">
                    <div className="relative w-full max-w-sm overflow-hidden border rounded-lg aspect-video">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${article.image}`}
                            alt="Gambar Artikel"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>

                {/* Judul */}
                <div className="mb-4">
                    <Label>Judul Artikel</Label>
                    <p className="mt-1 text-gray-800 dark:text-white">{article.title}</p>
                </div>

                {/* Status */}
                <div className="mb-4">
                    <Label>Status</Label>
                    <p className="mt-1 text-gray-800 capitalize dark:text-white">{article.status}</p>
                </div>

                {/* Konten */}
                <div className="mb-4">
                    <Label>Konten</Label>
                    <p className="mt-1 text-gray-800 whitespace-pre-line dark:text-white">{article.content}</p>
                </div>

                {/* Author */}
                <div className="mb-4">
                    <Label>Penulis</Label>
                    <p className="mt-1 text-gray-800 dark:text-white">
                        {article.user?.name || `ID ${article.user_id}`}
                    </p>
                </div>

                {/* Tanggal terakhir diupdate */}
                <div>
                    <Label>Terakhir Diperbarui</Label>
                    <p className="mt-1 text-gray-800 dark:text-white">
                        {formatDate(article.updated_at)}
                    </p>
                </div>
            </ComponentCard>
        </div>
    );
}
