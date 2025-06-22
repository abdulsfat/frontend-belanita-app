"use client";

import Image from "next/image";

export function NavbarBrandSec() {
  return (
      <>
          <div className="group flex cursor-pointer items-center">
              <Image
                  src="/logo.png"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-auto"
              />
          </div>
      </>
  );
}
