"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Label from "@/app/_components/Form/Label";
import InputField from "@/app/_components/Form/input/InputField";
import TextArea from "@/app/_components/Form/input/TextArea";
import DropZone from "@/app/_components/Form/form-elements/DropZone";
import Button from "@/app/_components/Admin/ui/button/Button";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import Select from "@/app/_components/Form/Select";
import useToastStore from "@/app/_stores/toastStore";
import useAuthStore from "@/app/_stores/authStore";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";
import useGoBack from "@/app/_hooks/useGoBack";

export default function MerchEditPage() {
    const params = useParams();
    const id = params?.id;
    const goBack = useGoBack();
    const router = useRouter();
    const { showToast } = useToastStore();
    const { token } = useAuthStore();
    const {
        merchandises,
        fetchMerchandises,
        updateMerchandise,
        fetchCategories,
        categories,
    } = useMerchandiseStore();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        merchandise_category_id: "",
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    const merchandise = merchandises.find((m) => String(m.id) === String(id));

    useEffect(() => {
        const loadData = async () => {
            await fetchMerchandises(); // fetch tanpa kondisi
            await fetchCategories();
            setFetching(false);
        };

        loadData();
    }, []);


    useEffect(() => {
        if (merchandise) {
            setForm({
                name: merchandise.name || "",
                description: merchandise.description || "",
                price: merchandise.price || "",
                stock: merchandise.stock || "",
                merchandise_category_id: merchandise.category?.id || "",
            });
        }
    }, [merchandise]);



    useEffect(() => {
        console.log("Semua merchandises:", merchandises);
        console.log("Param id:", id);
    }, [merchandises, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectCategory = (val) => {
        setForm((prev) => ({ ...prev, merchandise_category_id: val }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, description, price, stock, merchandise_category_id } = form;
        if (!name || !description || !price || !stock || !merchandise_category_id) {
            showToast("Semua field wajib diisi", "error");
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("merchandise_category_id", merchandise_category_id);
        if (image) formData.append("image", image);

        try {
            await updateMerchandise(id, token, formData);
            showToast("Merchandise berhasil diperbarui", "success");
            setTimeout(() => router.push("/dashboard/catalog"), 1500);
        } catch (error) {
            showToast(
                error?.response?.data?.message || "Gagal memperbarui merchandise",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="text-center py-20">Memuat data merchandise...</div>;
    if (!merchandise) return <div className="text-center py-20 text-red-500">Merchandise tidak ditemukan</div>;

    return (
        <div className="space-y-6">
            <ComponentCard title="Edit Merchandise" action="Kembali" onclick={goBack}>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Label htmlFor="name">Nama Product</Label>
                        <InputField name="name" value={form.name} onChange={handleChange} />
                    </div>

                    <div>
                        <Label htmlFor="category">Category</Label>
                        <Select
                            value={form.merchandise_category_id}
                            onChange={handleSelectCategory}
                            options={categories?.map((cat) => ({
                                label: cat.name,
                                value: cat.id,
                            }))}
                            placeholder="Pilih Kategori"
                        />
                    </div>

                    <div>
                        <Label htmlFor="description">Deskripsi Product</Label>
                        <TextArea
                            name="description"
                            rows={8}
                            value={form.description}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <Label>Gambar Product</Label>
                        <DropZone
                            onFileSelect={(file) => setImage(file)}
                            existingImage={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${merchandise.image}`}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="stock">Stock</Label>
                            <InputField
                                name="stock"
                                type="number"
                                value={form.stock}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="price">Price</Label>
                            <InputField
                                name="price"
                                type="number"
                                value={form.price}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="secondary" disabled={loading}>
                        {loading ? "Menyimpan..." : "Simpan Perubahan"}
                    </Button>
                </form>
            </ComponentCard>
        </div>
    );
}
