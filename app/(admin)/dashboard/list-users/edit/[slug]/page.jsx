"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    getDetailArticles,
    updateArticle,
} from "@/app/_services/articleService";
import Label from "@/app/_components/Form/Label";
import InputField from "@/app/_components/Form/input/InputField";
import TextArea from "@/app/_components/Form/input/TextArea";
import DropZone from "@/app/_components/Form/form-elements/DropZone";
import Button from "@/app/_components/Admin/ui/button/Button";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import useToastStore from "@/app/_stores/toastStore";

export default function ArticleEditPage() {
    const { slug } = useParams();
    const router = useRouter();

    const { showToast } = useToastStore();
    const [article, setArticle] = useState(null);
    const [form, setForm] = useState({ title: "", content: "", status: "" });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchArticle() {
            try {
                const result = await getDetailArticles(slug);
                setArticle(result);
                setForm({
                    title: result.title || "",
                    content: result.content || "",
                    status: result.status || "",
                });
            } catch {
                showToast("Gagal memuat artikel", "error");
            }
        }

        if (slug) fetchArticle();
    }, [slug, showToast]);

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

        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("title", form.title.trim());
        formData.append("content", form.content.trim());
        formData.append("status", form.status);
        if (image) formData.append("image", image);

        try {
            await updateArticle(slug, token, formData);
            showToast("Artikel berhasil diperbarui", "success");
            setTimeout(() => {
                router.push("/dashboard/articles");
                console.log("Slug yang dikirim:", slug);
                console.log("Data yang dikirim:", Object.fromEntries(formData));
            }, 1500);
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
                            defaultValue={form.title}
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
