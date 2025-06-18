"use client";

import Link from "next/link";
import { navItems } from "@/data";
import { randomId } from "@/utils";

export function NavbarList() {
  return (
      <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-8">
        {navItems.map(({ href, title }) => {
          const id = randomId();
          return (
              <li key={id} className="text-purple-950">
                <Link href={href}>
              <span className="font-medium capitalize hover:text-primary">
                {title}
              </span>
                </Link>
              </li>
          );
        })}
      </ul>
  );
}
