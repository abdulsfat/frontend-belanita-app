"use client";

import React, { useState } from "react";
import { Modal } from "@/app/_components/Admin/ui/modal";
import Label from "@/app/_components/Form/Label";
import Image from "next/image";
import Input from "@/app/_components/Form/input/InputField";
import Button from "@/app/_components/Admin/ui/button/Button";
import useUsersStore from "@/app/_stores/userStore";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";

export default function EditProfileModal({ isOpen, onClose, user }) {
    const { token } = useAuthStore();
    const { fetchUsers, updateUser } = useUsersStore();
    const { showToast } = useToastStore();



    const [form, setForm] = useState({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        address: user.address || "",
        image: null,
    });

    const [balance, setBalance] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setForm((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("email", form.email);
            formData.append("phone_number", form.phone_number);
            formData.append("address", form.address);
            formData.append("balance", balance); // ✅ tambahkan saldo
            if (form.image) formData.append("image", form.image); // ✅ ganti gambar kalau ada

            const updatedUser = await updateUser(token, formData);

            console.log("data:", updatedUser);
            useAuthStore.getState().setAuth(updatedUser, token);

            // await useAuthStore.getState().refreshUserProfile();


            console.log("🔄 Updated User:", updatedUser);
            console.log("🔥 Current Store User:", useAuthStore.getState().user);

            showToast("Berhasil memperbarui profil", "success");
            onClose();
        } catch (error) {
            console.error("Gagal simpan:", error);
            showToast("Gagal memperbarui profil", "error");
        } finally {
            setLoading(false);
        }
    };



    if (!isOpen || !user) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-[700px] m-4">
            <div className="no-scrollbar relative w-full overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">Edit Profil</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Perbarui informasi akun Anda.</p>

                <form onSubmit={handleSave} className="space-y-6">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border dark:border-gray-700">
                            <Image
                                width={80}
                                height={80}
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.image}`}
                                alt={user.name}
                            />
                        </div>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <div>
                            <Label>Nama</Label>
                            <Input name="name" value={form.name} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input name="email" value={form.email} disabled />
                        </div>
                        <div>
                            <Label>Nomor HP</Label>
                            <Input name="phone_number" value={form.phone_number} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Alamat</Label>
                            <Input name="address" value={form.address} onChange={handleChange} />
                        </div>
                        <div>
                            <Label>Top Up Saldo</Label>
                            <Input
                                type="number"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                placeholder="Masukkan nominal"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
