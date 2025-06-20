"use client";

import useAuthStore from "@/app/_stores/authStore";
import { ButtonEmergency } from "@/app/_components";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/app/_services/authService";
import useToastStore from "@/app/_stores/toastStore";

export function NavbarAuthSec() {
    const { user, token, logout } = useAuthStore();
    const { showToast } = useToastStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        const success = await logoutUser(token);
        logout();
        router.push("/");

        if (success) {
            showToast("Logout berhasil!", "success");
        } else {
            showToast("Logout gagal!", "error");
        }
    };

    return (
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-center gap-4 w-full lg:w-auto">
            {user ? (
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center gap-2 focus:outline-none"
                    >
                        <span className="text-secondary font-medium capitalize">{user.name}</span>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${user.image}`}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
                            {user.role === "admin" && (
                                <Link
                                    href="/dashboard"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    Dashboard
                                </Link>
                            )}

                            <Link
                                href="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <Link href="/login">
                    <p className="text-secondary cursor-pointer font-medium capitalize hover:text-primary">
                        Login
                    </p>
                </Link>
            )}
            <ButtonEmergency />
        </div>
    );
}
