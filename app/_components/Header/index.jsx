import { NavbarList } from "./list";
import { NavbarAuthSec } from "./NavbarAuthSec";
import { NavbarBrandSec } from "./NavbarBrandSec";

export function Header() {
  return (
    <nav className=" fixed inset-x-0 top-0 z-10 bg-white/70 backdrop-blur-md">
      <div className="flex items-center justify-between px-8 py-4 text-background">
        <NavbarBrandSec />
        <NavbarList />
        <NavbarAuthSec />
      </div>
    </nav>
  );
}
