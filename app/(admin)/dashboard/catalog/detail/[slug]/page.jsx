"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Label from "@/app/_components/Form/Label";
import Image from "next/image";
import ComponentCard from "@/app/_components/Admin/common/ComponentCard";
import { formatDate } from "@/app/_utils/dateFormatter";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";

export default function MerchandiseDetail() {
  const router = useRouter();
  const { slug } = useParams();
  const {
    merchandises,
    fetchCategories,
    fetchMerchandises,
    getMerchBySlug,
  } = useMerchandiseStore();

  const merchandise = getMerchBySlug(slug);

  useEffect(() => {
    fetchCategories();
    if (!merchandises.length) {
      fetchMerchandises();
    }
  }, []);

  if (!merchandise) {
    return (
        <div className="py-20 text-center text-gray-600 dark:text-gray-300">
          Merchandise tidak ditemukan atau masih dimuat...
        </div>
    );
  }

  return (
      <div className="space-y-6">
        <ComponentCard
            title="Detail Merchandise"
            action="Edit Merchandise"
            onclick={() => router.push(`/dashboard/catalog/edit/${merchandise.id}`)}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Gambar */}
            <div className="w-full relative aspect-video border rounded-xl overflow-hidden">
              <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${merchandise.image}`}
                  alt="Gambar Merchandise"
                  fill
                  className="object-cover"
              />
            </div>

            {/* Info Singkat */}
            <div className="grid gap-4">
              <div>
                <Label>Nama Produk</Label>
                <p className="mt-1 text-gray-800 dark:text-white">{merchandise.name}</p>
              </div>
              <div>
                <Label>Stok</Label>
                <p className="mt-1 text-gray-800 dark:text-white">{merchandise.stock}</p>
              </div>
              <div>
                <Label>Harga</Label>
                <p className="mt-1 text-gray-800 dark:text-white">
                  Rp {Number(merchandise.price).toLocaleString("id-ID")}
                </p>
              </div>
              <div>
                <Label>Kategori</Label>
                <p className="mt-1 text-gray-800 dark:text-white">
                  {merchandise.category?.name || "Tidak diketahui"}
                </p>
              </div>
              <div>
                <Label>Terakhir Diperbarui</Label>
                <p className="mt-1 text-gray-800 dark:text-white">
                  {formatDate(merchandise.updated_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Deskripsi */}
          <div className="mt-8">
            <Label>Deskripsi Produk</Label>
            <p className="mt-2 text-gray-800 whitespace-pre-line dark:text-white">
              {merchandise.description}
            </p>
          </div>
        </ComponentCard>
      </div>
  );
}
