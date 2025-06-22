"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import InputField from "@/app/_components/Input/InputField";
import useAuthStore from "@/app/_stores/authStore";
import useToastStore from "@/app/_stores/toastStore";
import { loginUser } from "@/app/_services/authService";
import axios from "axios";
import {Eye, EyeClosed} from "lucide-react";
import InputField from "@/app/_components/Form/input/InputField";

export default function LoginForm() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);
    const { showToast } = useToastStore();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const errors = {};
        if (!formData.email) {
            errors.email = "Email wajib diisi.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = "Format email tidak valid.";
        }
        if (!formData.password) {
            errors.password = "Password wajib diisi.";
        }
        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setLoading(true);
        try {
            const { user, access_token } = await loginUser(
                formData.email,
                formData.password
            );

            axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
            setAuth(user, access_token);

            showToast("Login berhasil!", "success");
            router.push(user.role === "admin" ? "/dashboard" : "/");
        } catch (error) {
            if (error.response?.status === 401) {
                showToast("Email atau password salah.", "info");
            } else {
                showToast("Terjadi kesalahan saat login.", "error");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Masukkan email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {formErrors.email && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>
                )}
            </div>

            <div>
                <div className="relative">
                    <InputField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Masukkan password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 bottom-[10px] text-sm text-gray-500 hover:text-gray-800"
                    >
                        {showPassword ?
                            <EyeClosed />
                            : <Eye />}
                    </button>
                </div>
                {formErrors.password && (
                    <p className="text-sm text-red-500 mt-1">{formErrors.password}</p>
                )}
            </div>

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
