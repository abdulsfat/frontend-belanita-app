"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/_components/Input/InputField";
import useToastStore from "@/app/_stores/toastStore";
import { registerUser } from "@/app/_services/authService";

export default function RegisterForm() {
    const router = useRouter();
    const { showToast } = useToastStore();

    const [formData, setFormData] = useState({
        name: "",
        phone_number: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            showToast("Password tidak cocok.", "error");
            return;
        }

        setLoading(true);
        try {
            await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone_number: formData.phone_number,
                address: formData.address,
            });

            showToast("Registrasi berhasil!", "success");
            router.push("/login");
        } catch (error) {
            if (error.response?.status === 422) {
                const backendErrors = error.response.data;
                for (let key in backendErrors) {
                    showToast(backendErrors[key][0], "error");
                }
            } else if (error.response?.data?.message) {
                showToast(error.response.data.message, "error");
            } else {
                showToast("Terjadi kesalahan saat mendaftar.", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
                label="Nama Lengkap"
                type="text"
                name="name"
                placeholder="Masukkan nama lengkap"
                value={formData.name}
                onChange={handleChange}
            />

            <InputField
                label="No Hp"
                type="number"
                name="phone_number"
                placeholder="Masukkan nomor"
                value={formData.phone_number}
                onChange={handleChange}
            />

            <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={handleChange}
            />

            <InputField
                label="Alamat Lengkap"
                type="text"
                name="address"
                placeholder="Masukkan alamat"
                value={formData.address}
                onChange={handleChange}
            />

            <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
            />

            <InputField
                label="Konfirmasi Password"
                type="password"
                name="confirmPassword"
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-tertiary text-secondary hover:text-tertiary py-2 rounded-lg hover:bg-secondary transition"
            >
                {loading ? "Mendaftar..." : "Register"}
            </button>
        </form>
    );
}
