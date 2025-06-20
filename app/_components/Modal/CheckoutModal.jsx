"use client";

import {useEffect, useState} from "react";
import Image from "next/image";
import Button from "@/app/_components/Admin/ui/button/Button";
import {orderMerchandise} from "@/app/_services/merchService";
import useAuthStore from "@/app/_stores/authStore";
import {Modal} from "@/app/_components/Admin/ui/modal";

export default function CheckoutModal({
                                          isOpen,
                                          onClose,
                                          merch,
                                          user,
                                          refetchMerch,
                                      }) {
    const [quantity, setQuantity] = useState(1)
    const [error, setError] = useState("");
    const {token} = useAuthStore();
    const refreshUserProfile = useAuthStore((state) => state.refreshUserProfile);

    useEffect(() => {
        if (isOpen) setError("");
    }, [isOpen]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        setQuantity(value);

        if (value === 0) {
            setError("Pesanan tidak boleh kosong");
        } else if (value > merch.stock) {
            setError("Jumlah melebihi stok yang tersedia");
        } else {
            setError("");
        }
    };

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
            await refreshUserProfile();

            if (typeof refetchMerch === "function") {
                await refetchMerch();
            }

            alert("Pesanan berhasil dibuat!");
            onClose();
        } catch (error) {
            console.error("Gagal order:", error.response?.data || error.message);
            alert("Gagal melakukan pesanan.");
        }
    };

    console.log("duittt", user.balance)
    const totalPrice = quantity * merch.price;

    if (!isOpen || !merch) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div
                className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Create Article
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Create your article
                    </p>
                </div>
                <div className="flex flex-col items-center gap-3 text-sm">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${merch.image}`}
                        alt={merch.name}
                        width={160}
                        height={160}
                        className="rounded-xl object-cover"
                    />
                    <p className="font-medium">{merch.name}</p>
                    <p>Harga: Rp {Number(merch.price).toLocaleString("id-ID")}</p>
                    <p>Stok tersedia: {merch.stock}</p>
                    <p>
                        Nama pemesan: <span className="font-medium">{user.name}</span>
                    </p>

                    <div className="w-full mt-4">
                        <label className="block text-sm mb-1">Jumlah Pesanan</label>
                        <input
                            type="number"
                            min={1}
                            max={merch.stock}
                            value={quantity}
                            onChange={handleQuantityChange}
                            onKeyDown={(e) => {
                                if (e.key === "-" || e.key === "e") e.preventDefault();
                            }}
                            className="border px-4 py-2 w-full rounded-xl"
                        />
                        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
                    </div>

                    {/* Total */}
                    <div className="w-full flex justify-between items-center mt-2 border-t pt-4">
                        <p>Total Saldo Anda: <span
                            className="text-secondary font-semibold">Rp {Number(user.balance).toLocaleString("id-ID")}</span>
                        </p>
                        <p className="text-right text-md font-medium">
                            Total:{" "}
                            <span className="text-secondary font-semibold">
                Rp {Number(totalPrice).toLocaleString("id-ID")}
              </span>
                        </p>
                    </div>
                </div>
                <div className="mt-6 flex justify-between gap-4">
                    <Button variant="outline" className="w-full" onClick={onClose}>
                        Batal
                    </Button>
                    <Button
                        variant="secondary"
                        className="w-full"
                        onClick={handleOrderConfirm}
                        disabled={!!error || quantity === 0}
                    >
                        Konfirmasi
                    </Button>
                </div>
            </div>

        </Modal>
    );
}
