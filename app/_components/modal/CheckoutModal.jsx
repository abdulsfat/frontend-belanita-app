"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/app/_components/Admin/ui/button/Button";

export default function CheckoutModal({
                                          isOpen,
                                          onClose,
                                          onConfirm,
                                          merch,
                                          user,
                                          quantity,
                                          setQuantity,
                                      }) {
    const [error, setError] = useState("");

    useEffect(() => {
        // Reset error saat modal dibuka ulang
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

    const totalPrice = quantity * merch.price;

    if (!isOpen || !merch) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl animate-fade-in">
                <h2 className="text-xl font-semibold mb-4 text-center">Konfirmasi Pesanan</h2>

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
                            className="border px-4 py-2 w-full rounded-xl"
                        />
                        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
                    </div>

                    {/* Total */}
                    <div className="w-full mt-2 border-t pt-4">
                        <p className="text-right text-md font-medium">
                            Total: <span className="text-secondary">Rp {Number(totalPrice).toLocaleString("id-ID")}</span>
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
                        onClick={onConfirm}
                        disabled={!!error || quantity === 0}
                    >
                        Konfirmasi
                    </Button>
                </div>
            </div>
        </div>
    );
}
