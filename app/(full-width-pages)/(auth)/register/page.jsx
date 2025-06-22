"use client";

import RegisterForm from "@/app/_components/Form/RegisterForm";
import useToastStore from "@/app/_stores/toastStore";

export default function RegisterPage() {
    const { showToast } = useToastStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        showToast("Registrasi berhasil!", "success");
    };

    return (
            <div className="flex items-center justify-center min-h-screen pt-12 bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md">
                    <div className="flex justify-center">
                        <img
                            src="/logo.png"
                            alt="Logo"
                            className="h-16 w-16 object-contain"
                        />
                    </div>
                    <h2 className="text-2xl font-bold text-center mb-4 text-purple-800">Register</h2>
                    <RegisterForm handleSubmit={handleSubmit}/>
                    <p className="mt-4 text-center text-sm text-secondary">
                        Sudah punya akun?{' '}
                        <a href="/login"
                           className="text-secondary/60 hover:text-secondary hover:underline font-semibold">
                            Login di sini
                        </a>
                    </p>
                </div>
            </div>
    );
}