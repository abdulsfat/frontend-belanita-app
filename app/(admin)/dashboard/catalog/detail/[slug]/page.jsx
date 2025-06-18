"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDetailMerch, getMerchCategoriesId } from "@/app/_services/merchService";
import Label from "@/app/_components/Form/Label";
import CustomToast from "@/app/_components/Toast/CustomToast";
import Image from "next/image";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import { formatDate } from "@/app/_utils/dateFormatter";

export default function MerchandiseDetailViewOnly() {
  const [categories, setCategories] = useState([]);
  const { slug } = useParams();
  const [merchandise, setMerchandise] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const [categoriesData] = await Promise.all([getMerchCategoriesId()]);

      setCategories(categoriesData);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchMerchandise() {
      try {
        const result = await getDetailMerch(slug);
        setMerchandise(result);
      } catch (error) {
        CustomToast.error("Gagal memuat merchandise");
      }
    }

    if (slug) fetchMerchandise();
  }, [slug]);
  
  const getCategoryName = (id) => {
    const category = categories.find((category) => category.id === id);
    return category ? category.name : "Unknown category";
  };

  if (!merchandise) return <div className="py-20 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <ComponentCard action="Edit Merchandise" onclick={() => router.push(`/dashboard/catalog/edit/${merchandise.slug}`)} title="Detail Merchandise">
        <div className="mb-6">
          <div className="relative w-full max-w-sm overflow-hidden border rounded-lg aspect-video">
            <Image src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${merchandise.image}`} alt="Gambar Merchandise" layout="fill" objectFit="cover" />
          </div>
        </div>

        <div className="mb-4">
          <Label>Nama Produk</Label>
          <p className="mt-1 text-gray-800 dark:text-white">{merchandise.name}</p>
        </div>
        <div className="mb-4">
          <Label>Stok</Label>
          <p className="mt-1 text-gray-800 dark:text-white">{merchandise.stock}</p>
        </div>
        <div className="mb-4">
          <Label>Harga</Label>
          <p className="mt-1 text-gray-800 dark:text-white">{merchandise.price}</p>
        </div>
        <div className="mb-4">
          <Label>Kategori</Label>
          <p className="mt-1 text-gray-800 dark:text-white">{getCategoryName(merchandise.merchandise_categories_id)}</p>
        </div>
        <div className="mb-4">
          <Label>Deskripsi</Label>
          <p className="mt-1 text-gray-800 whitespace-pre-line dark:text-white">{merchandise.description}</p>
        </div>

        <div>
          <Label>Terakhir Diperbarui</Label>
          <p className="mt-1 text-gray-800 dark:text-white">{formatDate(merchandise.updated_at)}</p>
        </div>
      </ComponentCard>
    </div>
  );
}
