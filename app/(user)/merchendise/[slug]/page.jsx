"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, TextSlide } from "@/components";
import useAuthStore from "@/app/_stores/authStore";
import Button from "@/app/_components/Admin/ui/button/Button";
import CustomToast from "@/app/_components/Toast/CustomToast";
import { useModal } from "@/app/_hooks/useModal";
import useToastStore from "@/app/_stores/toastStore";
import useMerchandiseStore from "@/app/_stores/merchandiseStore";


export default function DetailMerchandisePage() {
    const { slug } = useParams();
    const { token, user } = useAuthStore();
    const { isOpen, openModal, closeModal } = useModal();
    const { toast, showToast, hideToast } = useToastStore();

    const { merchandises, fetchMerchandises, getMerchBySlug } = useMerchandiseStore()

    const [localMerch, setLocalMerch] = useState(null);

    useEffect(() => {
        if (!slug) return;

        const merch = getMerchBySlug(slug);
        if (merch) {
            setLocalMerch(merch);
        } else {
            fetchMerchandises().then(() => {
                const refreshed = useMerchandiseStore.getState().getMerchBySlug(slug);
                if (refreshed) {
                    setLocalMerch(refreshed);
                } else {
                    showToast("Merchandise tidak ditemukan", "error");
                }
            }).catch(() => {
                showToast("Gagal mengambil data merch", "error");
            });
        }
    }, [slug]);

    if (!localMerch) return <div className="text-center py-20">Loading...</div>;

    return (
        <div className="py-20 mt-5">
            <div className="px-4 mt-5 sm:px-6 lg:px-12 lg:flex gap-6">
                {/* Gambar utama */}
                <div className="lg:w-[50%]">
                    <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${localMerch.image}`}
                        alt={localMerch.name}
                        className="rounded-3xl shadow-lg lg:h-[32rem] w-full object-cover mb-10"
                    />
                </div>

                {/* Detail */}
                <div className="flex-1">
                    <h2 className="lg:text-6xl mb-2 text-2xl font-normal text-gray-900 leading-tight">
                        {localMerch.name}
                    </h2>
                    <p className="text-xl font-semibold text-secondary mb-1">
                        Rp {Number(localMerch.price).toLocaleString("id-ID")}
                    </p>
                    <p className="text-gray-800 font-medium mb-4">Stok: {localMerch.stock} </p>
                    <div className="mb-4">
                        <p className="text-md text-gray-500 whitespace-pre-line leading-6">
                            {localMerch.description}
                        </p>
                    </div>
                    <Button
                        startIcon="+"
                        variant="secondary"
                        className="rounded-full"
                        size="sm"
                        onClick={() => {
                            if (!token) {
                                showToast("Anda harus login terlebih dahulu", "error");
                                return;
                            }

                            openModal("CHECKOUT", {
                                merch: localMerch,
                                user,
                                refetchMerch: fetchMerchandises,
                            });
                        }}
                    >
                        Checkout
                    </Button>
                </div>
            </div>

            {/* Rekomendasi */}
            <TextSlide text={"You might also like"} style="text-[max(2em,3vw)]" />
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 px-12">
                {merchandises.filter((m) => m.slug !== slug).slice(0, 3).map((item) => (
                    <Card
                        key={item.id}
                        image={item.image}
                        title={item.name}
                        price={item.price}
                        stock={item.stock}
                        slug={`merchendise/${item.slug}`}
                    />
                ))}
            </section>

            <CustomToast
                message={toast.message}
                isOpen={toast.isOpen}
                status={toast.status}
                onClose={hideToast}
            />
        </div>
    );
}
