"use client";

import { NavbarList } from "./list";
import { NavbarAuthSec } from "./NavbarAuthSec";
import { NavbarBrandSec } from "./NavbarBrandSec";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="fixed inset-x-0 top-0 z-20 bg-white/70 backdrop-blur-md border-b border-gray-200">
            <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 relative">
                <div className="z-20">
                    <NavbarBrandSec />
                </div>

                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
                    <NavbarList />
                </div>

                <div className="hidden lg:flex items-center gap-4 z-20">
                    <NavbarAuthSec />
                </div>

                <button
                    className="lg:hidden text-secondary z-20"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {open && (
                <div className="lg:hidden px-6 pb-6 flex flex-col gap-4">
                    <NavbarList />
                    <NavbarAuthSec />
                </div>
            )}
        </nav>
    );
}
