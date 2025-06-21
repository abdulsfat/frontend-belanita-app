"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Label from "@/app/_components/Form/Label";
import InputField from "@/app/_components/Form/input/InputField";
import Button from "@/app/_components/Admin/ui/button/Button";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import useToastStore from "@/app/_stores/toastStore";
import useAuthStore from "@/app/_stores/authStore";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";
import useGoBack from "@/app/_hooks/useGoBack";

export default function CategoryEditPage() {
    const { id } = useParams();
    const goBack = useGoBack();
    const router = useRouter();
    const { showToast } = useToastStore();
    const { token } = useAuthStore();
    const {
        categories,
        fetchCategories,
        updateCategory,
    } = useMerchandiseStore();

    const [form, setForm] = useState({ name: "" });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const selectedCategory = categories.find((cat) => String(cat.id) === String(id));

    useEffect(() => {
        const loadData = async () => {
            await fetchCategories();
            setFetching(false);
        };
        loadData();
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setForm({ name: selectedCategory.name || "" });
        }
    }, [selectedCategory]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name } = form;
        if (!name.trim()) {
            showToast("Nama kategori wajib diisi", "error");
            return;
        }

        setLoading(true);
        const data = { name: form.name };

        try {
            await updateCategory(id, data);
            showToast("Kategori berhasil diperbarui", "success");
            router.push("/dashboard/category")
        } catch (error) {
            showToast("Gagal memperbarui kategori", "error");
        } finally {
            setLoading(false);
        }
    };



    if (fetching) {
        return <div className="text-center py-20">Memuat data kategori...</div>;
    }

    if (!selectedCategory) {
        return <div className="text-center py-20 text-red-500">Kategori tidak ditemukan</div>;
    }

    return (
        <div className="space-y-6">
            <ComponentCard title="Edit Kategori" action="Kembali" onclick={goBack}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Nama Kategori</Label>
                        <InputField
                            name="name"
                            value={form.name}
                            onChange={handleChange}
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
