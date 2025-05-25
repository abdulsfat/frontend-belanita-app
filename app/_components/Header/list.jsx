"use client";

import Link from "next/link";
import { navItems, NavItem } from "@/data";
import { randomId } from "@/utils";

export function NavbarList() {
  const items = navItems.map(({ href, title }, NavItem) => {
    const id = randomId();
    return (
      <li key={id} className="  text-purple-950 flex me-8">
        <Link href={href} passHref>
          <div>
            <span className="font-medium capitalize hover:text-primary">
              {title}
            </span>
          </div>
        </Link>
      </li>
    );
  });

  return <ul className="flex items-center max-lg:hidden">{items}</ul>;
}
