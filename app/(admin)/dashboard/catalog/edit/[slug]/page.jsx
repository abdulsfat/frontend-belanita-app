"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDetailMerch, getMerchCategoriesId, updateMerch } from "@/app/_services/merchService";
import Label from "@/app/_components/Form/Label";
import InputField from "@/app/_components/Form/input/InputField";
import TextArea from "@/app/_components/Form/input/TextArea";
import DropZone from "@/app/_components/Form/form-elements/DropZone";
import Button from "@/app/_components/Admin/ui/button/Button";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import useToastStore from "@/app/_stores/toastStore";

export default function MerchandiseEditPage() {
  const { slug } = useParams();
  const router = useRouter();

  const { showToast } = useToastStore();
  const [merch, setMerch] = useState(null);
  const [form, setForm] = useState({ name: "", stock: 0, price: 0, description: "", merchandise_categories_id: 0 });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchMerch() {
      try {
        const result = await getDetailMerch(slug);
        setMerch(result);
        setForm({
          name: result.name || "",
          stock: result.stock || 0,
          price: result.price || 0,
          description: result.description || "",
          merchandise_categories_id: result.merchandise_categories_id || 0,
        });
      } catch {
        showToast("Gagal memuat merchandise", "error");
      }
    }

    if (slug) fetchMerch();
  }, [slug, showToast]);

  useEffect(() => {
    const fetchCategories = async () => {
      const [categoriesData] = await Promise.all([getMerchCategoriesId()]);

      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.stock.trim() || !form.price.trim() || !form.description.trim() || !form.merchandise_categories_id.trim()) {
      showToast("Nama produk tidak boleh kosong", "error");
      return;
    }

    setLoading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("stock", form.stock.trim());
    formData.append("price", form.price.trim());
    formData.append("description", form.description.trim());
    formData.append("merchandise_categories_id", form.merchandise_categories_id.trim());
    if (image) formData.append("image", image);

    try {
      await updateMerch(slug, token, formData);
      showToast("Merchandise berhasil diperbarui", "success");
      setTimeout(() => {
        router.push("/dashboard/catalog");
        console.log("Slug yang dikirim:", slug);
        console.log("Data yang dikirim:", Object.fromEntries(formData));
      }, 1500);
    } catch (error) {
      showToast(error?.response?.data?.message || "Gagal memperbarui merchandise", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!merch) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <ComponentCard title="Edit Merchandise">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Nama Produk</Label>
            <InputField name="name" defaultValue={form.name} onChange={handleChange} placeholder="Masukkan nama produk" />
          </div>
          <div>
            <Label htmlFor="stock">Stok</Label>
            <InputField name="stock" defaultValue={form.stock} onChange={handleChange} placeholder="Masukkan stok" />
          </div>
          <div>
            <Label htmlFor="price">Harga</Label>
            <InputField name="price" defaultValue={form.price} onChange={handleChange} placeholder="Masukkan harga" />
          </div>
          <div>
            <Label htmlFor="category">Kategori</Label>
            <select
              name="category"
              defaultValue={form.merchandise_categories_id}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              {categories.map((category) => {
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>;
              })}
            </select>
          </div>
          <div>
            <Label htmlFor="description">Deskripsi</Label>
            <TextArea name="description" rows={8} value={form.description} onChange={handleChange} placeholder="Masukkan deskripsi produk" />
          </div>
          <div>
            <Label>Gambar Produk</Label>
            <DropZone onFileSelect={(file) => setImage(file)} existingImage={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${merchandise.image}`} />
          </div>

          <Button type="submit" variant="secondary" disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan Perubahan"}
          </Button>
        </form>
      </ComponentCard>
    </div>
  );
}
