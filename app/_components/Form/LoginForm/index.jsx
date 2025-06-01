"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputField from "@/app/_components/Input/InputField";
import ErrorMessage from "@/app/_components/Input/ErrorMessage";
import useAuthStore from "@/app/_stores/authStore";


export default function LoginForm() {
    const router = useRouter();
    const setAuth = useAuthStore((state) => state.setAuth);


    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [globalError, setGlobalError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setGlobalError("");
        setLoading(true);

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/login`,
                {
                    email: formData.email,
                    password: formData.password
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json"
                    }
                }
            );

            localStorage.setItem("token", res.data.access_token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setAuth(res.data.user, res.data.access_token);


            alert("Login berhasil!");
            router.push("/");

        } catch (error) {
            if (error.response?.status === 401) {
                setGlobalError("Email atau password salah.");
            } else if (error.response?.data?.errors) {
                const backendErrors = error.response.data.errors;
                const formatted = {};
                for (let key in backendErrors) {
                    formatted[key] = backendErrors[key][0];
                }
                setErrors(formatted);
            } else {
                setGlobalError("Terjadi kesalahan saat login.");
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
            <ErrorMessage message={errors.email} />

            <InputField
                label="Password"
                type="password"
                name="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={handleChange}
            />
            <ErrorMessage message={errors.password} />

            {globalError && <p className="text-red-600 text-sm text-center">{globalError}</p>}

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
