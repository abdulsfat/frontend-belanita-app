"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/_components/Input/InputField";
import ErrorMessage from "@/app/_components/Input/ErrorMessage";
import axios from "axios";

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        phone_number: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGlobalError("");

        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Password tidak cocok." });
            return;
        }

        setLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    phone_number: formData.phone_number,
                    address: formData.address
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                }
            );


            alert("Registrasi berhasil!");
            router.push("/login");
        } catch (error) {
            if (error.response?.status === 422) {
                const backendErrors = error.response.data;
                const formatted = {};
                for (let key in backendErrors) {
                    formatted[key] = backendErrors[key][0];
                }
                setErrors(formatted);
            } else if (error.response?.data?.message) {
                setGlobalError(error.response.data.message);
            } else {
                setGlobalError("Terjadi kesalahan saat mendaftar.");
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
            <ErrorMessage message={errors.name} />

            <InputField
                label="No Hp"
                type="number"
                name="phone_number"
                placeholder="Masukkan nomor"
                value={formData.phone_number}
                onChange={handleChange}
            />
            <ErrorMessage message={errors.phone_number} />

            <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="Masukkan email"
                value={formData.email}
                onChange={handleChange}
            />
            <ErrorMessage message={errors.email} />

            <InputField
                label="Alamat Lengkap"
                type="text"
                name="address"
                placeholder="Masukkan alamat"
                value={formData.address}
                onChange={handleChange}
            />
            <ErrorMessage message={errors.address} />

            <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
            />
            <ErrorMessage message={errors.password} />

            <InputField
                label="Konfirmasi Password"
                type="password"
                name="confirmPassword"
                placeholder="Ulangi password"
                value={formData.confirmPassword}
                onChange={handleChange}
            />
            <ErrorMessage message={errors.confirmPassword} />

            {globalError && <p className="text-red-600 text-sm text-center">{globalError}</p>}

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
