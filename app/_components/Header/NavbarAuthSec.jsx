"use client";

import { ButtonEmergency } from "@/app/_components";
import Link from "next/link";

export function NavbarAuthSec() {
  return (
    <>
      <div className="flex  items-center justify-center">
          <Link href="/login">
              <p className="text-secondary me-4 cursor-pointer">Login</p>
          </Link>

        {/* button emergency */}
        <ButtonEmergency />
      </div>
    </>
  );
}
