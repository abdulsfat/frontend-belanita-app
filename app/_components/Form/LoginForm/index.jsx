"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/app/_components/Input/InputField";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";
import { loginUser } from "@/app/_services/authService";

export default function LoginForm() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const { showToast } = useToastStore();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { user, access_token } = await loginUser(
                formData.email,
                formData.password
            );

            localStorage.setItem("token", access_token);
            localStorage.setItem("user", JSON.stringify(user));
            setAuth(user, access_token);

            showToast("Login berhasil!", "success");
            router.push(user.role === "admin" ? "/dashboard" : "/");
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("Email atau password salah.", "info");
            }  else {
                showToast("Terjadi kesalahan saat login.", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
                label="Email"
                type="email"
                name="email"
                placeholder="Masukkan email"
                value={formData.email}
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

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-lime-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
            >
                {loading ? "Sedang login..." : "Login"}
            </button>
        </form>
    );
}
