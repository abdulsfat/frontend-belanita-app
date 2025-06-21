"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Label from "@/app/_components/Form/Label";
import InputField from "@/app/_components/Form/input/InputField";
import TextArea from "@/app/_components/Form/input/TextArea";
import DropZone from "@/app/_components/Form/form-elements/DropZone";
import Button from "@/app/_components/Admin/ui/button/Button";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import useToastStore from "@/app/_stores/toastStore";
import useArticleStore from "@/app/_stores/articleStore";
import useAuthStore from "@/app/_stores/authStore";

export default function ArticleEditPage() {
    const { slug } = useParams();
    const router = useRouter();
    const { showToast } = useToastStore();
    const { token } = useAuthStore();
    const {
        articles,
        fetchArticles,
        updateArticle: updateArticleStore,
    } = useArticleStore();

    const [form, setForm] = useState({ title: "", content: "", status: "draft" });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const article = articles.find((a) => a.slug === slug);

    useEffect(() => {
        if (!article) {
            fetchArticles();
        } else {
            setForm({
                title: article.title || "",
                content: article.content || "",
                status: article.status || "draft",
            });
        }
    }, [article, fetchArticles]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title.trim() || !form.content.trim()) {
            showToast("Judul dan konten tidak boleh kosong", "error");
            return;
        }

        setLoading(true);

        const data = new FormData();
        data.append("title", form.title.trim());
        data.append("content", form.content.trim());
        data.append("status", form.status);
        if (image) data.append("image", image);

        try {
            await updateArticleStore(slug, token, data);
            showToast("Artikel berhasil diperbarui", "success");
            setTimeout(() => router.push("/dashboard/articles"), 1500);
        } catch (error) {
            showToast(
                error?.response?.data?.message || "Gagal memperbarui artikel",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    if (!article) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="space-y-6">
            <ComponentCard title="Edit Artikel">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="title">Judul Artikel</Label>
                        <InputField
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Masukkan judul"
                        />
                    </div>

                    <div>
                        <Label htmlFor="status">Status</Label>
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    <div>
                        <Label htmlFor="content">Konten</Label>
                        <TextArea
                            name="content"
                            rows={8}
                            value={form.content}
                            onChange={handleChange}
                            placeholder="Masukkan isi artikel"
                        />
                    </div>

                    <div>
                        <Label>Gambar Artikel</Label>
                        <DropZone
                            onFileSelect={(file) => setImage(file)}
                            existingImage={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${article.image}`}
                        />
                    </div>

                    <Button type="submit" variant="secondary" disabled={loading}>
                        {loading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                </form>
            </ComponentCard>
        </div>
    );
}
