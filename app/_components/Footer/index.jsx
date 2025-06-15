"use client";

import Image from "next/image";
import Link from "next/link";
import { ButtonEmergency } from "@/components";

export default function Footer() {
    return (
        <footer className="border-t pt-10 pb-6 px-6 lg:px-12 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Kiri */}
                <div className="flex flex-col gap-4 col-span-1">
                    <div className="flex items-center gap-2">
                        <Image src="/logo.png" alt="Belanita" width={140} height={140} />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                        Championing Women's Rights: Empowering Voices,<br />
                        Ensuring Equality for a Just and Inclusive Future.
                    </p>
                    <p className="text-xs text-gray-500 mt-4">
                        © 2025 All rights reserved – Kelompok 14 NFA
                    </p>
                </div>

                {/* Tengah */}
                <div className="flex flex-col sm:flex-row justify-center lg:gap-40 col-span-1 md:col-span-1 lg:col-span-2">
                    <div className="flex flex-col gap-4 mb-4 sm:mb-0">
                        <Link href="/" className="text-md hover:underline">Home</Link>
                        <Link href="/article" className="text-md hover:underline">Article</Link>
                    </div>
                    <div className="flex flex-col gap-5">
                        <Link href="/complaints" className="text-md hover:underline">Complaint</Link>
                        <Link href="/merchendise" className="text-md font-medium hover:underline">Merch</Link>
                    </div>
                </div>

                {/* Kanan */}
                <div className="flex flex-col gap-4 items-start lg:items-end col-span-1">
                    <ButtonEmergency />
                    <div className="flex flex-col gap-1 text-sm">
                        <Link href="https://facebook.com" target="_blank" className="hover:underline">Facebook</Link>
                        <Link href="https://twitter.com" target="_blank" className="hover:underline">Twitter</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
