"use client";

import Image from "next/image";

export function NavbarBrandSec() {
  return (
    <>
      <div className="group flex cursor-pointer">
        <Image width={120} height={0} src="/logo.png" alt="" />
      </div>
    </>
  );
}
