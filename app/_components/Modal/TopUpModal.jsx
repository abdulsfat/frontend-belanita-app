"use client";

import { useState } from "react";
import { Modal } from "@/app/_components/Admin/ui/modal";
import Label from "@/app/_components/Form/Label";
import Input from "@/app/_components/Form/input/InputField";
import Button from "@/app/_components/Admin/ui/button/Button";
import useAuthStore from "@/app/_stores/authStore";
import { updateProfile } from "@/app/_services/userService";
import Image from "next/image";

export default function TopUpModal({ isOpen, onClose, showToast }) {
    const { user, refreshUserProfile, token } = useAuthStore();

    const [formData, setFormData] = useState({ balance: "" });
    const [isProcessing, setIsProcessing] = useState(false);

    const nominal = parseInt(formData.balance || "0");
    const currentBalance = parseInt(user?.balance || 0);
    const finalBalance = currentBalance + (nominal > 0 ? nominal : 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nominal || nominal <= 0) {
            showToast("Nominal tidak valid", "error");
            return;
        }

        setIsProcessing(true);

        setTimeout(async () => {
            try {
                await updateProfile(token, { balance: nominal });
                await refreshUserProfile();
                showToast("Saldo berhasil ditambahkan!", "success");
                onClose();
                handleReset();
            } catch (error) {
                showToast("Gagal menambahkan saldo.", "error");
            } finally {
                setIsProcessing(false);
            }
        }, 5000);
    };

    const handleReset = () => {
        setFormData({ balance: "" });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <div className="px-2 pr-14">
                    <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                        Tambah Saldo
                    </h4>
                    <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
                        Masukkan jumlah saldo yang ingin ditambahkan.
                    </p>
                </div>

                {isProcessing ? (
                    <div className="flex flex-col items-center justify-center py-10 space-y-4">
                        <Image
                            src="/barcode-dummy.png"
                            alt="QR Code"
                            width={200}
                            height={200}
                            className="rounded-lg border dark:border-gray-700"
                        />
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                            Menunggu konfirmasi pembayaran...
                        </p>
                        <p className="text-xs text-gray-400">(Saldo akan otomatis masuk dalam 5 detik)</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="custom-scrollbar h-[300px] overflow-y-auto px-2 pb-3 space-y-6">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 space-y-2 text-sm">
                                <div className="text-gray-600 dark:text-gray-300">
                                    <strong>Saldo saat ini:</strong> Rp {currentBalance.toLocaleString("id-ID")}
                                </div>
                                <div className="text-gray-800 dark:text-white font-semibold">
                                    <strong>Total setelah top up:</strong> Rp {finalBalance.toLocaleString("id-ID")}
                                </div>
                            </div>

                            <div>
                                <Label>Jumlah Top Up (Rp)</Label>
                                <Input
                                    name="balance"
                                    type="number"
                                    min="1"
                                    value={formData.balance}
                                    onChange={handleChange}
                                    placeholder="contoh: 100000"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
                            <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleReset();
                                }}
                            >
                                Reset
                            </Button>
                            <Button type="submit" size="sm">
                                Tambah Saldo
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </Modal>
    );
}
