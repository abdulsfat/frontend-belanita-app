"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, TextSlide } from "@/components";
import { getDetailMerch, getRandomMerchExceptSlug, orderMerchandise } from "@/app/_services/merchService";
import useAuthStore from "@/app/_stores/authStore";
import Button from "@/app/_components/Admin/ui/button/Button";
import CheckoutModal from "@/app/_components/Modal/CheckoutModal";
import CustomToast from "@/app/_components/Toast/CustomToast";

export default function DetailMerchandisePage() {
    const { slug } = useParams();
    const { token, user } = useAuthStore();

    const [merch, setMerch] = useState(null);
    const [relatedMerch, setRelatedMerch] = useState([]);
    const [loading, setLoading] = useState(true);

    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const detail = await getDetailMerch(slug);
                setMerch(detail);

                const others = await getRandomMerchExceptSlug(slug);
                setRelatedMerch(others);
            } catch (error) {
                console.error("Gagal mengambil data merch:", error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };

        if (slug) fetchData();
    }, [slug]);

    const handleOrderConfirm = async () => {
        try {
            if (!token) {
                alert("Silakan login terlebih dahulu.");
                return;
            }

            if (quantity < 1 || quantity > merch.stock) {
                alert("Jumlah pesanan tidak valid.");
                return;
            }

            const payload = {
                quantity,
                merchandise_id: merch.id,
            };

            await orderMerchandise(token, payload);
            alert("Pesanan berhasil dibuat!");
            setIsModalOpen(false);
        } catch (error) {
            console.error("Gagal order:", error.response?.data || error.message);
            alert("Gagal melakukan pesanan.");
        }
    };

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (!merch) return <div className="text-center py-20 text-red-500">Merchandise tidak ditemukan.</div>;

    return (
        <div className="py-20 mt-5">
            <div className="px-4 mt-5 sm:px-6 lg:px-12 lg:flex gap-6">
                {/* Gambar utama */}
                <div className="lg:w-[50%]">
                    <img
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${merch.image}`}
                        alt={merch.name}
                        className="rounded-3xl shadow-lg lg:h-[32rem] w-full object-cover mb-10"
                    />
                </div>

                {/* Detail */}
                <div className="flex-1">
                    <h2 className="lg:text-6xl mb-2 text-2xl font-normal text-gray-900 leading-tight">
                        {merch.name}
                    </h2>
                    <p className="text-xl font-semibold text-secondary mb-1">
                        Rp {Number(merch.price).toLocaleString("id-ID")}
                    </p>
                        <p className="text-gray-800 font-medium mb-4">Stok: {merch.stock} </p>
                    <div className="mb-4">
                        <p className="text-md text-gray-500 whitespace-pre-line leading-6">
                            {merch.description}
                        </p>
                    </div>
                    <Button
                        startIcon="+"
                        variant="secondary"
                        className="rounded-full"
                        size="sm"
                        onClick={() => {
                            if (!token) {
                                setToastOpen(true);
                                return;
                            }
                            setIsModalOpen(true);
                        }}
                    >
                        Checkout
                    </Button>
                </div>
            </div>

            {/* Rekomendasi */}
            <TextSlide text={"You might also like"} style="text-[max(2em,3vw)]" />
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8 px-12">
                {relatedMerch.map((item) => (
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

            {/* Modal Checkout */}
            <CheckoutModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleOrderConfirm}
                merch={merch}
                user={user}
                quantity={quantity}
                setQuantity={setQuantity}
            />

            <CustomToast
                message="Anda harus login terlebih dahulu"
                isOpen={toastOpen}
                onClose={() => setToastOpen(false)}
            />
        </div>
    );
}
