"use client";

import { ButtonEmergency } from "@/app/_components";

export function NavbarAuthSec() {
  return (
    <>
      <div className="flex  items-center justify-center">
        <p className="text-secondary me-4 cursor-pointer">Login</p>

        {/* button emergency */}
        <ButtonEmergency />
      </div>
    </>
  );
}
