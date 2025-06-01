"use client";

import useAuthStore from "@/app/_stores/authStore";
import {ButtonEmergency} from "@/app/_components";
import Link from "next/link";
import {useState, useRef, useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export function NavbarAuthSec() {
    const {user, setAuth, logout} = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [hasHydrated, setHasHydrated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const savedToken = localStorage.getItem("token");

        if (savedUser && savedToken) {
            setAuth(JSON.parse(savedUser), savedToken);
        }

        setHasHydrated(true);
    }, [setAuth]);

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
        const token = localStorage.getItem("token");

        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (err) {
            console.warn("Logout gagal/tidak valid:", err);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        logout();
        router.push("/login");
    };


    if (!hasHydrated) return null;

    return (
        <div className="relative flex items-center justify-center gap-4">
            {user ? (
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center gap-2 focus:outline-none"
                    >
                        <span className="text-secondary font-medium capitalize">{user.name}</span>
                        <img
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}storage/${user.image}`}
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover"
                        />
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-50">
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

            <ButtonEmergency/>
        </div>
    );
}
